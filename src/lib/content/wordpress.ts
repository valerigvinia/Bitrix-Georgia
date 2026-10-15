import "server-only";
import { cache } from "react";
import { plainText, safeArticleHtml } from "./sanitize";

export const newsCategories = [
  { key: "all", name: "ყველა სტატია", slugs: [] },
  {
    key: "guides",
    name: "პრაქტიკული გზამკვლევები",
    slugs: ["uncategorized", "guides"],
  },
  { key: "news", name: "Bitrix24-ის სიახლეები", slugs: ["bitrix24-news"] },
  { key: "company", name: "კომპანიის ამბები", slugs: ["company-news"] },
];
const excludedPosts = [23202, 6200]; // Old unrelated English theme-demo posts; not deleted from WordPress.
const apiBase =
  process.env.WORDPRESS_API_BASE_URL ||
  "https://bitrixgeorgia.ge/wp-json/wp/v2/";
const base = new URL(apiBase.endsWith("/") ? apiBase : `${apiBase}/`);
if (base.protocol !== "https:")
  throw new Error("WORDPRESS_API_BASE_URL must use HTTPS");

type WpPost = {
  id: number;
  slug: string;
  date_gmt: string;
  modified_gmt: string;
  status: string;
  title: { rendered: string };
  content: { rendered: string; protected?: boolean };
  excerpt: { rendered: string };
  categories: number[];
  _embedded?: {
    "wp:featuredmedia"?: { source_url?: string; alt_text?: string }[];
    author?: { name?: string }[];
  };
};
type WpCategory = { id: number; name: string; slug: string };
export type Article = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  html: string;
  date: string;
  updated: string;
  category: string;
  author?: string;
  image?: string;
  imageAlt: string;
  readMinutes: number;
};

async function wpRequest(path: string, params: Record<string, string>) {
  const url = new URL(path, base);
  for (const [key, value] of Object.entries(params))
    url.searchParams.set(key, value);
  const response = await fetch(url, {
    next: { revalidate: 300, tags: ["wordpress"] },
    signal: AbortSignal.timeout(10000),
  });
  if (!response.ok) {
    if (response.status === 400 && params.page) {
      const error = await response.json().catch(() => null);
      if (error?.code === "rest_post_invalid_page_number")
        return { data: [], total: 0, pages: 0 };
    }
    throw new Error(`WordPress request failed (${response.status})`);
  }
  const data: unknown = await response.json();
  if (!Array.isArray(data)) throw new Error("Unexpected WordPress response");
  return {
    data,
    total: Number(response.headers.get("x-wp-total") || data.length),
    pages: Number(response.headers.get("x-wp-totalpages") || 1),
  };
}

const getCategories = cache(async (): Promise<WpCategory[]> => {
  const result = await wpRequest("categories", {
    per_page: "100",
    _fields: "id,name,slug",
  });
  return result.data.filter(
    (item): item is WpCategory =>
      typeof item?.id === "number" &&
      typeof item?.name === "string" &&
      typeof item?.slug === "string",
  );
});

function toArticle(value: unknown, categories: WpCategory[]): Article | null {
  const post = value as WpPost;
  if (
    !post ||
    typeof post.id !== "number" ||
    typeof post.slug !== "string" ||
    typeof post.title?.rendered !== "string" ||
    typeof post.content?.rendered !== "string" ||
    typeof post.excerpt?.rendered !== "string" ||
    post.status !== "publish" ||
    post.content.protected ||
    excludedPosts.includes(post.id)
  )
    return null;
  const date = `${post.date_gmt}Z`;
  if (!Number.isFinite(Date.parse(date)) || Date.parse(date) > Date.now())
    return null;
  const postCategories = categories.filter((category) =>
    post.categories?.includes(category.id),
  );
  const category =
    newsCategories
      .slice(1)
      .find((group) =>
        postCategories.some((item) => group.slugs.includes(item.slug)),
      )?.name || "სტატიები";
  const author = post._embedded?.author?.[0]?.name;
  const media = post._embedded?.["wp:featuredmedia"]?.[0];
  let image: string | undefined;
  if (media?.source_url) {
    try {
      const url = new URL(media.source_url);
      if (
        url.protocol === "https:" &&
        [base.hostname, "bitrixgeorgia.ge"].includes(url.hostname)
      )
        image = url.href;
    } catch {
      /* Ignore invalid media. */
    }
  }
  const html = safeArticleHtml(post.content.rendered, base.hostname);
  const excerpt = plainText(post.excerpt.rendered).replace(/\s*\[?…\]?$/, "");
  return {
    id: post.id,
    slug: post.slug,
    title: plainText(post.title.rendered),
    excerpt: excerpt.length > 180 ? `${excerpt.slice(0, 177)}…` : excerpt,
    html,
    date,
    updated: `${post.modified_gmt}Z`,
    category,
    author: author && !author.includes("@") ? plainText(author) : undefined,
    image,
    imageAlt: plainText(media?.alt_text || ""),
    readMinutes: Math.max(
      1,
      Math.ceil(plainText(html).split(/\s+/).length / 160),
    ),
  };
}

export async function getArticles({
  search = "",
  category = "all",
  page = 1,
  perPage = 6,
}: {
  search?: string;
  category?: string;
  page?: number;
  perPage?: number;
} = {}) {
  const categories = await getCategories();
  const params: Record<string, string> = {
    _embed: "1",
    status: "publish",
    per_page: String(perPage),
    page: String(page),
    exclude: excludedPosts.join(","),
    orderby: "date",
    order: "desc",
  };
  if (search) params.search = search.slice(0, 160);
  if (category !== "all") {
    const group = newsCategories.find((item) => item.key === category);
    const ids = categories
      .filter((item) => group?.slugs.includes(item.slug))
      .map((item) => item.id);
    if (!ids.length) return { articles: [] as Article[], total: 0, pages: 0 };
    params.categories = ids.join(",");
  }
  const result = await wpRequest("posts", params);
  return {
    articles: result.data
      .map((post) => toArticle(post, categories))
      .filter((post): post is Article => post !== null),
    total: result.total,
    pages: result.pages,
  };
}

export const getArticle = cache(
  async (slug: string): Promise<Article | null> => {
    const [result, categories] = await Promise.all([
      wpRequest("posts", {
        slug,
        status: "publish",
        _embed: "1",
        exclude: excludedPosts.join(","),
      }),
      getCategories(),
    ]);
    return result.data.length ? toArticle(result.data[0], categories) : null;
  },
);

export function articleDate(date: string) {
  return new Intl.DateTimeFormat("ka-GE", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "Asia/Tbilisi",
  }).format(new Date(date));
}
