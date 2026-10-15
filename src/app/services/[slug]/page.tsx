import Link from "next/link";
import { notFound } from "next/navigation";
import { services } from "@/content/services";
import { Button, ContactBand, FaqList, PageHero } from "@/components/ui/common";
import { Icon } from "@/components/ui/icon";
import { pageMetadata } from "@/lib/metadata";
export function generateStaticParams() {
  return services.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  return service
    ? pageMetadata(service.title, service.text, `/services/${slug}`)
    : {};
}
export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((item) => item.slug === slug);
  if (!service) notFound();
  return (
    <>
      <PageHero
        label={service.title}
        title={service.short}
        description={service.intro}
      >
        <Button href={`/contact?service=${service.slug}`}>
          მოითხოვეთ კონსულტაცია
        </Button>
      </PageHero>
      <section className="section shell detail-layout">
        <div>
          <p className="eyebrow">ვისთვის არის</p>
          <h2>{service.title}</h2>
          <p className="large-copy">{service.audience}</p>
          <h3 className="spaced-title">რას მოიცავს სამუშაო</h3>
          <ol className="deliverable-list">
            {service.items.map((item, i) => (
              <li key={item}>
                <span>0{i + 1}</span>
                {item}
              </li>
            ))}
          </ol>
          <div className="outcome-panel">
            <Icon name="check" size={25} />
            <div>
              <h3>შეთანხმებული შედეგი</h3>
              <p>{service.outcome}</p>
            </div>
          </div>
          <h3 className="spaced-title">სანამ დავიწყებთ</h3>
          <FaqList items={[{ q: service.question, a: service.answer }]} />
        </div>
        <aside className="service-sidebar">
          <span className="icon-tile">
            <Icon name={service.icon} size={32} />
          </span>
          <h3>მოგვიყევით თქვენს ამოცანაზე.</h3>
          <p>
            სამუშაოს მოცულობას, ვადასა და ღირებულებას საჭიროებების გაცნობის
            შემდეგ განვსაზღვრავთ.
          </p>
          <Button href={`/contact?service=${slug}`}>
            მოითხოვეთ შეთავაზება
          </Button>
          <div className="sidebar-links">
            <h4>სხვა სერვისები</h4>
            {services
              .filter((item) => item.slug !== slug)
              .map((item) => (
                <Link href={`/services/${item.slug}`} key={item.slug}>
                  {item.title}
                  <Icon name="arrow" size={16} />
                </Link>
              ))}
          </div>
        </aside>
      </section>
      <ContactBand />
    </>
  );
}
