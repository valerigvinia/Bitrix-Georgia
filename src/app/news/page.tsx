import Link from "next/link";
import { PageHero } from "@/components/ui/common";
import { Icon } from "@/components/ui/icon";
import { ArticleCard } from "@/components/news/article-card";
import { getArticles, newsCategories } from "@/lib/content/wordpress";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "სიახლეები და სტატიები",
  "Bitrix24-ის სიახლეები, CRM-ის პრაქტიკული გზამკვლევები და ბიზნესპროცესების მართვის იდეები ქართულად.",
  "/news",
);
type Query = { q?: string; category?: string; page?: string };
export default async function News({
  searchParams,
}: {
  searchParams: Promise<Query>;
}) {
  const query = await searchParams;
  const search =
    typeof query.q === "string" ? query.q.slice(0, 160).trim() : "";
  const category = newsCategories.some((item) => item.key === query.category)
    ? query.category!
    : "all";
  const page =
    typeof query.page === "string" && /^\d+$/.test(query.page)
      ? Math.min(500, Math.max(1, Number(query.page)))
      : 1;
  const href = (nextCategory: string, nextPage = 1) => {
    const params = new URLSearchParams();
    if (search) params.set("q", search);
    if (nextCategory !== "all") params.set("category", nextCategory);
    if (nextPage !== 1) params.set("page", String(nextPage));
    return `/news${params.size ? `?${params}` : ""}`;
  };
  let result;
  let unavailable = false;
  try {
    result = await getArticles({ search, category, page });
  } catch {
    unavailable = true;
  }
  return (
    <>
      <PageHero
        label="სიახლეები და სტატიები"
        title="ცოდნა, რომელიც საქმეში გამოგადგებათ."
        description="CRM-ის პრაქტიკული გზამკვლევები, პროდუქტის სიახლეები და იდეები თქვენი ბიზნესის განვითარებისთვის."
      />
      <section className="section shell">
        <div className="news-toolbar">
          <nav className="category-tabs" aria-label="სტატიების კატეგორიები">
            {newsCategories.map((item) => (
              <Link
                key={item.key}
                href={href(item.key)}
                aria-current={category === item.key ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <form action="/news" className="search-form">
            <label className="sr-only" htmlFor="news-search">
              სტატიის ძიება
            </label>
            <input
              type="search"
              id="news-search"
              name="q"
              defaultValue={search}
              maxLength={160}
              placeholder="მოძებნეთ სტატია…"
            />
            {category !== "all" ? (
              <input type="hidden" name="category" value={category} />
            ) : null}
            <button type="submit" aria-label="ძიება">
              <Icon name="search" size={19} />
            </button>
          </form>
        </div>
        {unavailable ? (
          <div className="empty-state" role="status">
            <Icon name="web" size={32} />
            <h2>სტატიების ჩატვირთვა დროებით ვერ მოხერხდა.</h2>
            <p>გთხოვთ, სცადოთ ხელახლა ცოტა ხანში.</p>
            <a href={href(category, page)} className="text-link">
              ხელახლა ცდა
              <Icon name="right" size={17} />
            </a>
          </div>
        ) : result?.articles.length ? (
          <>
            <p className="results-label">
              {search ? `ძიება: „${search}“ · ` : ""}
              {result.total} სტატია
            </p>
            <div className="news-grid">
              {result.articles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
            {result.pages > 1 ? (
              <nav className="pagination" aria-label="სტატიების გვერდები">
                {page > 1 ? (
                  <Link href={href(category, page - 1)}>წინა</Link>
                ) : null}
                <span>
                  გვერდი {page} / {result.pages}
                </span>
                {page < result.pages ? (
                  <Link href={href(category, page + 1)}>შემდეგი</Link>
                ) : null}
              </nav>
            ) : null}
          </>
        ) : (
          <div className="empty-state">
            <Icon name="search" size={32} />
            <h2>სტატია ვერ მოიძებნა.</h2>
            <p>შეცვალეთ საძიებო სიტყვა ან ნახეთ ყველა გამოქვეყნებული სტატია.</p>
            <Link className="text-link" href="/news">
              ყველა სტატია
              <Icon name="right" size={17} />
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
