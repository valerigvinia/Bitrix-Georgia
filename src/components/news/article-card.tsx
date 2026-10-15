import Link from "next/link";
import type { Article } from "@/lib/content/wordpress";
import { articleDate } from "@/lib/content/wordpress";
import { Icon } from "@/components/ui/icon";

export function ArticleCover({ article }: { article: Article }) {
  return article.image ? (
    <div className="article-cover photo-cover">
      <img src={article.image} alt={article.imageAlt} loading="lazy" />
    </div>
  ) : (
    <div className="article-cover graphic-cover" aria-hidden="true">
      <div className="cover-orbit" />
      <span className="cover-label">BITRIX GEORGIA / გზამკვლევი</span>
      <div className="cover-crm">
        <Icon name="crm" size={36} />
        <span>CRM</span>
      </div>
      <span className="cover-pill">
        <Icon name="check" size={14} /> ყველაფერი ერთ სივრცეში
      </span>
    </div>
  );
}
export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="article-card">
      <Link
        href={`/news/${article.slug}`}
        className="cover-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ArticleCover article={article} />
      </Link>
      <div className="article-card-content">
        <div className="article-meta">
          <span>{article.category}</span>
          <time dateTime={article.date}>{articleDate(article.date)}</time>
        </div>
        <h3>
          <Link href={`/news/${article.slug}`}>{article.title}</Link>
        </h3>
        <p>{article.excerpt}</p>
        <Link
          className="text-link"
          href={`/news/${article.slug}`}
          aria-label={`${article.title} — წაკითხვა`}
        >
          წაიკითხეთ სტატია
          <Icon name="arrow" size={18} />
        </Link>
      </div>
    </article>
  );
}
