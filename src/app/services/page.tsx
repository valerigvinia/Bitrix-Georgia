import { PageHero, ContactBand, SectionHeading } from "@/components/ui/common";
import { ServiceGrid } from "@/components/sections/service-grid";
import { steps } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "სერვისები",
  "Bitrix24-ის დანერგვა, ავტომატიზაცია, ინტეგრაციები, მიგრაცია, ტრენინგი და მხარდაჭერა ქართულად.",
  "/services",
);
export default function Services() {
  return (
    <>
      <PageHero
        label="სერვისები"
        title="თქვენს პროცესებს მორგებული მხარდაჭერა."
        description="მიზნის განსაზღვრიდან ყოველდღიურ გამოყენებამდე — ვაერთიანებთ ტექნიკურ სამუშაოს და თქვენი ბიზნესის საჭიროებებს."
      />
      <section className="section shell">
        <SectionHeading
          label="როგორ შეგვიძლია დაგეხმაროთ"
          title="აირჩიეთ თქვენი შემდეგი ნაბიჯი."
        />
        <ServiceGrid />
      </section>
      <section className="section pale-section">
        <div className="shell">
          <SectionHeading
            label="სამუშაო მიდგომა"
            title="ჯერ ვარკვევთ საჭიროებას. შემდეგ ვაწყობთ სისტემას."
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
        </div>
      </section>
      <ContactBand />
    </>
  );
}
