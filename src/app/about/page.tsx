import {
  Button,
  ContactBand,
  PageHero,
  SectionHeading,
} from "@/components/ui/common";
import { Icon } from "@/components/ui/icon";
import { steps } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "ჩვენ შესახებ",
  "Bitrix Georgia — Bitrix24-ის დანერგვა და მხარდაჭერა ქართულად. გაეცანით ჩვენს სამუშაო მიდგომას.",
  "/about",
);
export default function About() {
  return (
    <>
      <PageHero
        label="ჩვენ შესახებ"
        title="ტექნოლოგია ბიზნესის გასამარტივებლად."
        description="Bitrix Georgia-ს საქმიანობის ცენტრში თქვენი ყოველდღიური პროცესებია — როგორ მუშაობს გუნდი, როგორ ემსახურება კლიენტს და რა სჭირდება განვითარებისთვის."
      />
      <section className="section shell about-layout">
        <div className="about-statement">
          <span className="eyebrow">BITRIX GEORGIA</span>
          <h2>
            ჯერ თქვენი საქმე.
            <br />
            შემდეგ —<br />
            <em>მისი სისტემა.</em>
          </h2>
          <div className="about-mark" aria-hidden="true">
            <Icon name="integrations" size={110} />
          </div>
        </div>
        <div>
          <p className="eyebrow">ჩვენი მიდგომა</p>
          <h2>
            გასაგები პროცესები,
            <br />
            პრაქტიკული გადაწყვეტილებები.
          </h2>
          <p className="large-copy">
            ვმუშაობთ Bitrix24-ის დანერგვაზე, მორგებაზე, ინტეგრაციებსა და გუნდის
            მომზადებაზე. საწყისი ამოცანაა გავიგოთ, რა უნდა შეიცვალოს თქვენს
            მუშაობაში.
          </p>
          <p>
            ვაზუსტებთ სამუშაოს მოცულობას და მოსალოდნელ შედეგს. ტექნიკურ
            ცვლილებას ვაკავშირებთ რეალურ სცენართან, რათა სისტემის დანიშნულება
            გუნდისთვის გასაგები იყოს.
          </p>
          <Button href="/contact">გაგვაცანით თქვენი ბიზნესი</Button>
        </div>
      </section>
      <section className="section pale-section">
        <div className="shell">
          <SectionHeading
            label="თანამშრომლობის პრინციპები"
            title="მკაფიო შეთანხმებით დაწყებული საქმე."
          />
          <div className="values-grid">
            {[
              {
                icon: "messages",
                title: "გასაგები კომუნიკაცია",
                text: "საჭიროებებსა და გადაწყვეტილებებს ქართულად, კონკრეტული მაგალითებით განვიხილავთ.",
              },
              {
                icon: "tasks",
                title: "შეთანხმებული მოცულობა",
                text: "წინასწარ ვაზუსტებთ, რა კეთდება, რას მიიღებთ და როგორ შემოწმდება შედეგი.",
              },
              {
                icon: "integrations",
                title: "მორგება თქვენს პროცესზე",
                text: "კონფიგურაციას რეალურ სამუშაოზე ვაშენებთ, გუნდის როლებისა და ამოცანების მიხედვით.",
              },
            ].map((item) => (
              <article key={item.title}>
                <Icon name={item.icon} size={30} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell">
        <SectionHeading
          label="სამუშაო გზა"
          title="დაგეგმვიდან ყოველდღიურ გამოყენებამდე."
        />
        <div className="steps-grid">
          {steps.map((step, i) => (
            <article key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
      </section>
      <ContactBand />
    </>
  );
}
