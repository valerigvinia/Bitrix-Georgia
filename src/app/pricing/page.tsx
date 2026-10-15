import {
  ContactBand,
  FaqList,
  PageHero,
  SectionHeading,
} from "@/components/ui/common";
import { Plans } from "@/components/pricing/plans";
import { getPricing } from "@/lib/pricing/source";
import { pageMetadata } from "@/lib/metadata";
import { faqs } from "@/content/site";
export const metadata = pageMetadata(
  "Bitrix24-ის ტარიფები",
  "Bitrix24-ის გეგმები, ყოველთვიური და წლიური გადახდა. შეარჩიეთ ლიცენზია და მოითხოვეთ შეთავაზება ქართულად.",
  "/pricing",
);
export const dynamic = "force-dynamic";
export default async function Pricing() {
  const snapshot = await getPricing();
  return (
    <>
      <PageHero
        label="ტარიფები"
        title="გეგმა, რომელიც თქვენს გუნდს ერგება."
        description="შეადარეთ ლიცენზიის ვარიანტები, აირჩიეთ გადახდის პერიოდი და მოგვწერეთ თქვენი საჭიროების შესახებ."
      />
      <section className="section shell">
        <Plans
          prices={snapshot?.plans || null}
          verifiedAt={snapshot?.verifiedAt}
        />
      </section>
      <section className="section pale-section">
        <div className="shell">
          <SectionHeading
            label="ორი დამოუკიდებელი ნაწილი"
            title="ლიცენზია და ჩვენი მომსახურება."
          />
          <div className="comparison-wrap">
            <table className="comparison-table">
              <caption className="sr-only">
                ლიცენზიისა და დანერგვის მომსახურების შედარება
              </caption>
              <thead>
                <tr>
                  <th scope="col">საკითხი</th>
                  <th scope="col">Bitrix24-ის ლიცენზია</th>
                  <th scope="col">Bitrix Georgia-ს მომსახურება</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>რას მოიცავს</td>
                  <td>არჩეული გეგმის პროგრამულ შესაძლებლობებს</td>
                  <td>
                    შეთანხმებულ დანერგვას, მორგებას, ტრენინგსა თუ მხარდაჭერას
                  </td>
                </tr>
                <tr>
                  <td>რა განსაზღვრავს ფასს</td>
                  <td>გეგმა, მომხმარებლები და გადახდის პერიოდი</td>
                  <td>პროცესები, ინტეგრაციები და სამუშაოს მოცულობა</td>
                </tr>
                <tr>
                  <td>როგორ ვარჩევთ</td>
                  <td>ოფიციალური პირობებისა და თქვენი საჭიროებების მიხედვით</td>
                  <td>მოთხოვნების განხილვისა და შეფასების შემდეგ</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <section className="section shell faq-section">
        <div>
          <p className="eyebrow">ხშირი კითხვები</p>
          <h2>ტარიფის არჩევამდე.</h2>
        </div>
        <FaqList
          items={faqs.filter(
            (item) => item.group === "ტარიფები" || item.group === "დაწყება",
          )}
        />
      </section>
      <ContactBand />
    </>
  );
}
