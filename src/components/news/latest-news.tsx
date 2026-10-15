import Link from "next/link";
import { getArticles } from "@/lib/content/wordpress";
import { ArticleCard } from "./article-card";
import { Icon } from "@/components/ui/icon";
export async function LatestNews() {
  let result;
  try {
    result = await getArticles({ perPage: 3 });
  } catch {
    return (
      <div className="empty-state">
        <p>სტატიების ჩატვირთვა დროებით ვერ მოხერხდა.</p>
        <Link className="text-link" href="/news">
          სცადეთ სიახლეების გვერდზე <Icon name="right" size={18} />
        </Link>
      </div>
    );
  }
  if (!result.articles.length)
    return <p className="empty-state">ახალი სტატიები მალე გამოჩნდება.</p>;
  return (
    <div
      className={`news-grid ${result.articles.length === 1 ? "news-featured" : ""}`}
    >
      {result.articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
      {result.articles.length === 1 ? (
        <div className="editorial-aside">
          <span className="icon-tile">
            <Icon name="training" size={28} />
          </span>
          <p className="eyebrow">იდეიდან პრაქტიკამდე</p>
          <h3>
            თქვენი შემდეგი ნაბიჯი
            <br />
            იწყება ცოდნით.
          </h3>
          <p>
            გაეცანით CRM-ის გამოყენებას და იპოვეთ თქვენი ბიზნესისთვის საინტერესო
            მიდგომები.
          </p>
          <Link className="text-link" href="/news">
            ყველა სტატია <Icon name="right" size={18} />
          </Link>
        </div>
      ) : null}
    </div>
  );
}
