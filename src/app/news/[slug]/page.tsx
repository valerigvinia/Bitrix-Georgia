import Link from "next/link";
import { notFound } from "next/navigation";
import { getArticle, getArticles, articleDate } from "@/lib/content/wordpress";
import { ArticleCard, ArticleCover } from "@/components/news/article-card";
import { Button, SectionHeading } from "@/components/ui/common";
import { Icon } from "@/components/ui/icon";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/content/site";
export const revalidate = 300;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  return article
    ? {
        ...pageMetadata(
          article.title,
          article.excerpt,
          `/news/${article.slug}`,
        ),
        openGraph: {
          type: "article" as const,
          title: article.title,
          description: article.excerpt,
          publishedTime: article.date,
          modifiedTime: article.updated,
          ...(article.image ? { images: [article.image] } : {}),
        },
      }
    : {};
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticle(slug);
  if (!article) notFound();
  const others = await getArticles({ perPage: 4 })
    .then((result) =>
      result.articles.filter((item) => item.id !== article.id).slice(0, 3),
    )
    .catch(() => []);
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    ...(Number.isFinite(Date.parse(article.updated))
      ? { dateModified: article.updated }
      : {}),
    mainEntityOfPage: `${site.url}/news/${article.slug}`,
    ...(article.image ? { image: article.image } : {}),
    ...(article.author
      ? { author: { "@type": "Person", name: article.author } }
      : {}),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
      <header className="article-header">
        <nav className="breadcrumb" aria-label="გვერდის მდებარეობა">
          <Link href="/">მთავარი</Link>
          <span>/</span>
          <Link href="/news">სიახლეები და სტატიები</Link>
        </nav>
        <div className="article-meta">
          <span>{article.category}</span>
          <time dateTime={article.date}>{articleDate(article.date)}</time>
          <span>{article.readMinutes} წუთის საკითხავი</span>
        </div>
        <h1>{article.title}</h1>
        {article.author ? <p>{article.author}</p> : null}
      </header>
      <div className="shell article-layout">
        <article className="article-main">
          <ArticleCover article={article} />
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
          <div className="article-source">
            <Link href="/news">← ყველა სტატია</Link>
          </div>
        </article>
        <aside className="article-sidebar">
          <span className="icon-tile">
            <Icon name="crm" size={27} />
          </span>
          <h2>ცოდნიდან მოქმედებამდე.</h2>
          <p>
            გსურთ CRM-ის მორგება თქვენს ბიზნესზე? ერთად განვიხილოთ საჭიროებები.
          </p>
          <Button href="/services/implementation">CRM-ის დანერგვა</Button>
        </aside>
      </div>
      {others.length ? (
        <section className="section pale-section">
          <div className="shell">
            <SectionHeading label="წაიკითხეთ ასევე" title="სხვა სტატიები" />
            <div className="news-grid">
              {others.map((item) => (
                <ArticleCard key={item.id} article={item} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
