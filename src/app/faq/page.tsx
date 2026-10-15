import { ContactBand, FaqList, PageHero } from "@/components/ui/common";
import { faqs } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "ხშირად დასმული კითხვები",
  "პასუხები Bitrix24-ის დანერგვის, ტარიფების, მიგრაციის, ინტეგრაციებისა და მხარდაჭერის შესახებ.",
  "/faq",
);
export default function Faq() {
  const groups = [...new Set(faqs.map((item) => item.group))];
  return (
    <>
      <PageHero
        label="ხშირად დასმული კითხვები"
        title="გავარკვიოთ მნიშვნელოვანი საკითხები."
        description="დაწყება, ტარიფის შერჩევა და სისტემის გამოყენება — შეკრებილი პასუხები ერთ გვერდზე."
      />
      <section className="section shell faq-page">
        <nav className="faq-categories" aria-label="კითხვების კატეგორიები">
          {groups.map((group, index) => (
            <a href={`#group-${index}`} key={group}>
              {group}
            </a>
          ))}
        </nav>
        <div>
          {groups.map((group, index) => (
            <section id={`group-${index}`} key={group} className="faq-group">
              <h2>{group}</h2>
              <FaqList items={faqs.filter((item) => item.group === group)} />
            </section>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
