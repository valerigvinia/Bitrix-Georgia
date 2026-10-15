import Link from "next/link";
import { Suspense } from "react";
import {
  Button,
  ContactBand,
  FaqList,
  SectionHeading,
} from "@/components/ui/common";
import { Icon } from "@/components/ui/icon";
import { Workspace } from "@/components/sections/workspace";
import { ServiceGrid } from "@/components/sections/service-grid";
import { LatestNews } from "@/components/news/latest-news";
import { capabilities, steps } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "CRM და ბიზნესის ავტომატიზაცია",
  "Bitrix24-ის დანერგვა, ინტეგრაცია, ტრენინგი და მხარდაჭერა ქართულად. მოვარგოთ სისტემა თქვენს ბიზნესს.",
  "/",
);
export const revalidate = 300;
export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="shell hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">
              <span /> BITRIX24 • თქვენი ბიზნესისთვის
            </p>
            <h1>
              მეტი წესრიგი.
              <br /> ძლიერი გუნდი.
              <br /> <em>ახალი შესაძლებლობები.</em>
            </h1>
            <p className="lead">
              გაყიდვები, კომუნიკაცია და ყოველდღიური საქმე — ერთ სისტემაში. ჩვენ
              დაგეხმარებით, Bitrix24 თქვენს ბიზნესს მოარგოთ.
            </p>
            <div className="hero-actions">
              <Button href="/contact">მოითხოვეთ კონსულტაცია</Button>
              <Link className="text-link" href="/bitrix24">
                გაეცანით Bitrix24-ს
                <Icon name="right" size={18} />
              </Link>
            </div>
            <div className="hero-trust">
              <span>
                <Icon name="check" size={15} /> თქვენს პროცესებზე მორგებული
              </span>
              <span>
                <Icon name="check" size={15} /> მხარდაჭერა ქართულად
              </span>
            </div>
          </div>
          <Workspace />
        </div>
        <div className="shell hero-bottom">
          <span>ერთი პლატფორმა თქვენი ყოველდღიური საქმისთვის</span>
          <div>
            <span>
              <Icon name="crm" size={17} /> CRM
            </span>
            <span>
              <Icon name="tasks" size={17} /> პროექტები
            </span>
            <span>
              <Icon name="messages" size={17} /> კომუნიკაცია
            </span>
            <span>
              <Icon name="automation" size={17} /> ავტომატიზაცია
            </span>
          </div>
        </div>
      </section>
      <section className="section shell">
        <SectionHeading
          label="01 / სისტემური მუშაობა"
          title="ბიზნესი იზრდება. პროცესებიც უნდა მიჰყვეს."
          description="როდესაც ინფორმაცია სხვადასხვა სივრცეშია, გუნდს საერთო სურათის დანახვა უჭირს. დავიწყოთ იმით, რაც ყოველდღიურად გაწუხებთ."
        />
        <div className="problem-grid">
          {[
            {
              icon: "messages",
              title: "მოთხოვნები სხვადასხვა არხშია?",
              text: "გააერთიანეთ კლიენტთან ურთიერთობის ისტორია და განსაზღვრეთ, ვინ აგრძელებს კომუნიკაციას.",
              href: "/services/integrations",
            },
            {
              icon: "chart",
              title: "გაყიდვების სურათი არ ჩანს?",
              text: "შექმენით მკაფიო ეტაპები და იცოდეთ, სად არის თითოეული გარიგება.",
              href: "/services/implementation",
            },
            {
              icon: "automation",
              title: "რუტინა დროს გართმევთ?",
              text: "გადაეცით სისტემას შეთანხმებული შეხსენებები და განმეორებადი მოქმედებები.",
              href: "/services/automation",
            },
          ].map((item) => (
            <article key={item.title}>
              <span className="line-icon">
                <Icon name={item.icon} size={29} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <Link className="text-link" href={item.href}>
                იპოვეთ გადაწყვეტა
                <Icon name="right" size={17} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="capabilities-section">
        <div className="shell capability-layout">
          <div className="capability-intro">
            <p className="eyebrow">02 / შესაძლებლობები</p>
            <h2>
              ყველაფერი,
              <br /> რაც გუნდს
              <br /> <em>აკავშირებს.</em>
            </h2>
            <p>
              ერთი სამუშაო სივრცე კლიენტებისთვის, პროექტებისთვის და
              ადამიანებისთვის.
            </p>
            <Button href="/bitrix24" secondary>
              Bitrix24-ის შესაძლებლობები
            </Button>
            <div className="connection-art" aria-hidden="true">
              <span className="connection-center">b24</span>
              <span>
                <Icon name="crm" />
              </span>
              <span>
                <Icon name="tasks" />
              </span>
              <span>
                <Icon name="messages" />
              </span>
            </div>
          </div>
          <div className="capability-grid">
            {capabilities.map((item) => (
              <Link
                href="/bitrix24"
                key={item.title}
                className="capability-card"
              >
                <Icon name={item.icon} size={26} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <Icon name="arrow" size={18} className="capability-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell">
        <SectionHeading
          label="03 / ჩვენი სერვისები"
          title="ტექნოლოგიიდან — რეალურ სამუშაო პროცესამდე."
          description="გეხმარებით როგორც პირველი ნაბიჯის გადადგმაში, ისე უკვე დანერგილი სისტემის განვითარებაში."
          href="/services"
          linkText="ყველა სერვისი"
        />
        <ServiceGrid />
      </section>
      <section className="process-section">
        <div className="shell">
          <SectionHeading
            label="04 / ერთად მუშაობა"
            title="გასაგები გზა. შეთანხმებული ნაბიჯები."
          />
          <div className="steps-grid">
            {steps.map((step, index) => (
              <article key={step.title}>
                <span className="step-number">0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="section shell">
        <div className="pricing-teaser">
          <div>
            <p className="eyebrow">05 / ტარიფები</p>
            <h2>
              აირჩიეთ შესაძლებლობები,
              <br /> რომლებიც გჭირდებათ.
            </h2>
            <p>
              Bitrix24-ის ლიცენზია შეირჩევა გუნდის ზომის, ფუნქციებისა და
              გადახდის პერიოდის მიხედვით. დანერგვის მომსახურება ცალკე
              განისაზღვრება.
            </p>
            <Button href="/pricing">გაეცანით ტარიფებს</Button>
          </div>
          <div className="plan-stack" aria-hidden="true">
            <div>
              <span>Basic</span>
              <Icon name="right" />
            </div>
            <div>
              <span>Standard</span>
              <Icon name="right" />
            </div>
            <div>
              <span>Professional</span>
              <Icon name="right" />
            </div>
            <small>თქვენს საჭიროებებზე მორგებული არჩევანი</small>
          </div>
        </div>
      </section>
      <section className="section shell news-section">
        <SectionHeading
          label="06 / სიახლეები და ცოდნა"
          title="იდეები თქვენი ბიზნესის განვითარებისთვის."
          href="/news"
          linkText="ყველა სტატია"
        />
        <Suspense
          fallback={
            <div className="news-skeleton" aria-busy="true">
              იტვირთება სტატიები…
            </div>
          }
        >
          <LatestNews />
        </Suspense>
      </section>
      <section className="section shell faq-section">
        <div>
          <p className="eyebrow">07 / კითხვები</p>
          <h2>
            პასუხები
            <br /> დაწყებამდე.
          </h2>
          <p>
            კიდევ გაქვთ კითხვა?
            <br /> მოგვწერეთ — ერთად გავარკვიოთ.
          </p>
          <Link href="/faq" className="text-link">
            ყველა კითხვა
            <Icon name="right" size={18} />
          </Link>
        </div>
        <FaqList />
      </section>
      <ContactBand />
    </>
  );
}
