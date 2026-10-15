import { PageHero } from "@/components/ui/common";
import { Icon } from "@/components/ui/icon";
import { RequestForm } from "@/components/contact/request-form";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { planNames } from "@/content/plans";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "კონტაქტი",
  "დაუკავშირდით Bitrix Georgia-ს: info@bitrixgeorgia.ge, +995 555 10 20 35. მოითხოვეთ კონსულტაცია ან შეთავაზება.",
  "/contact",
);
export default async function Contact({
  searchParams,
}: {
  searchParams: Promise<{ service?: string; plan?: string; period?: string }>;
}) {
  const params = await searchParams;
  const service =
    services.find((item) => item.slug === params.service)?.title || "";
  const plan =
    typeof params.plan === "string" && planNames.includes(params.plan)
      ? params.plan
      : "";
  const period = params.period === "monthly" ? "monthly" : "annual";
  return (
    <>
      <PageHero
        label="კონტაქტი"
        title="დავიწყოთ თქვენი ბიზნესის გაცნობით."
        description="მოგვწერეთ, რა ამოცანის გადაწყვეტა გსურთ. ერთად შევარჩევთ შესაფერის მიმართულებას და შემდეგ ნაბიჯებს."
      />
      <section className="section shell contact-layout">
        <div className="contact-info">
          <p className="eyebrow">მოდით, ვისაუბროთ</p>
          <h2>
            ერთი საუბარი.
            <br />
            უფრო მკაფიო გეგმა.
          </h2>
          <p>
            დანერგვა, არსებული სისტემის განვითარება თუ ტარიფის შერჩევა —
            მოგვმართეთ თქვენთვის მოსახერხებელი გზით.
          </p>
          <div className="contact-method">
            <span className="icon-tile">
              <Icon name="mail" />
            </span>
            <div>
              <small>მოგვწერეთ</small>
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </div>
          </div>
          <div className="contact-method">
            <span className="icon-tile">
              <Icon name="phone" />
            </span>
            <div>
              <small>დაგვირეკეთ</small>
              <a href={`tel:${site.phone}`}>{site.phoneLabel}</a>
            </div>
          </div>
          <div className="contact-note">
            <p>
              პირველ წერილში გამოგვადგება გუნდის ზომა, გამოყენებული პროგრამები
              და მთავარი გამოწვევა.
            </p>
            <p>
              სამუშაოს მოცულობასა და ღირებულებას საჭიროებების განხილვის შემდეგ
              შევათანხმებთ.
            </p>
          </div>
        </div>
        <RequestForm
          key={`${service}-${plan}-${period}`}
          initialService={service}
          initialPlan={plan}
          initialPeriod={period}
        />
      </section>
    </>
  );
}
