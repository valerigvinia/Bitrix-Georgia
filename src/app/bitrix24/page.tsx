import {
  Button,
  ContactBand,
  PageHero,
  SectionHeading,
} from "@/components/ui/common";
import { Icon } from "@/components/ui/icon";
import { capabilities } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "რა არის Bitrix24",
  "გაეცანით Bitrix24-ის CRM-ს, ამოცანებს, კომუნიკაციასა და ავტომატიზაციას — კონკრეტული ბიზნესსცენარებით.",
  "/bitrix24",
);
export default function Bitrix24() {
  return (
    <>
      <PageHero
        label="Bitrix24"
        title="ერთი სამუშაო სივრცე. დაკავშირებული გუნდი."
        description="Bitrix24 აერთიანებს გაყიდვების, თანამშრომლობისა და ბიზნესპროცესების ინსტრუმენტებს. შესაძლებლობებს ვარჩევთ თქვენი გუნდის სამუშაოს მიხედვით."
      >
        <Button href="/pricing">ტარიფების შერჩევა</Button>
      </PageHero>
      <section className="section shell">
        <SectionHeading
          label="შესაძლებლობები პრაქტიკაში"
          title="როგორ ეხმარება სისტემა ყოველდღიურ საქმეს."
        />
        <div className="product-grid">
          {capabilities.map((item) => (
            <article key={item.title}>
              <span className="icon-tile">
                <Icon name={item.icon} size={28} />
              </span>
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <div className="example-box">
                <span>მაგალითად</span>
                <p>{item.example}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="fine-print">
          ფუნქციების ხელმისაწვდომობა დამოკიდებულია Bitrix24-ის ვერსიასა და
          ტარიფზე. ცალკეულ არხებს შეიძლება დამატებითი ინტეგრაცია ან მომსახურება
          სჭირდებოდეს.{" "}
          <a
            href="https://www.bitrix24.ae/en/prices/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ოფიციალური პირობები ↗
          </a>
        </p>
      </section>
      <section className="section pale-section">
        <div className="shell two-column">
          <div>
            <p className="eyebrow">არჩევანი და დანერგვა</p>
            <h2>
              პლატფორმა მზადაა.
              <br />
              პროცესი — თქვენს ბიზნესს ერგება.
            </h2>
          </div>
          <div>
            <p className="large-copy">
              ინსტრუმენტების არჩევას მოჰყვება მათი სწორად აწყობა: ეტაპები,
              პასუხისმგებლობები, მონაცემები და გუნდის გამოყენების წესები.
            </p>
            <Button href="/services/implementation">
              გაეცანით დანერგვის სერვისს
            </Button>
          </div>
        </div>
      </section>
      <ContactBand />
    </>
  );
}
