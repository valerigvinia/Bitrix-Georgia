import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { getArticles } from "@/lib/content/wordpress";
export const revalidate = 300;
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const paths = [
    "",
    "/bitrix24",
    "/services",
    "/pricing",
    "/about",
    "/news",
    "/faq",
    "/contact",
    "/privacy",
    "/terms",
    ...services.map((item) => `/services/${item.slug}`),
  ];
  const posts: MetadataRoute.Sitemap = [];
  // API pages are bounded; extend to a sitemap index if the archive grows beyond 1,000 articles.
  for (let page = 1; page <= 10; page++) {
    try {
      const data = await getArticles({ perPage: 100, page });
      posts.push(
        ...data.articles.map((article) => ({
          url: `${site.url}/news/${article.slug}`,
          lastModified: Number.isFinite(Date.parse(article.updated))
            ? article.updated
            : article.date,
        })),
      );
      if (page >= data.pages) break;
    } catch {
      break;
    }
  }
  return [...paths.map((path) => ({ url: `${site.url}${path}` })), ...posts];
}
