"use client";
import { useState } from "react";
import { georgianTimestamp } from "@/lib/date";
import Link from "next/link";
import type { PricePlan } from "@/lib/pricing/parse";
import { plans } from "@/content/plans";
import { Icon } from "@/components/ui/icon";
export function Plans({
  prices,
  verifiedAt,
}: {
  prices: PricePlan[] | null;
  verifiedAt?: string;
}) {
  const [period, setPeriod] = useState("annual");
  const money = (value: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
  return (
    <>
      <div className="pricing-controls">
        <div
          className="period-switch"
          role="group"
          aria-label="გადახდის პერიოდი"
        >
          <button
            aria-pressed={period === "monthly"}
            onClick={() => setPeriod("monthly")}
          >
            ყოველთვიური
          </button>
          <button
            aria-pressed={period === "annual"}
            onClick={() => setPeriod("annual")}
          >
            წლიური
          </button>
        </div>
        <p>
          Essentials გეგმები • ფასი ორგანიზაციაზე.
          <br />
          ლიცენზია და დანერგვა ცალ-ცალკე განისაზღვრება.
        </p>
      </div>
      <div className="plans-grid">
        <article className="plan-card">
          <h2>Free</h2>
          <p className="plan-summary">პლატფორმის გაცნობისთვის</p>
          <p className="plan-price">უფასო გეგმა</p>
          <p className="plan-period">მიმდინარე ლიმიტები იხილეთ წყაროში</p>
          <ul>
            <li>
              <Icon name="check" size={14} /> შესაძლებლობების საწყისი გაცნობა
            </li>
            <li>
              <Icon name="check" size={14} /> საჭიროებების შეფასება
            </li>
          </ul>
          <Link
            href={`/contact?plan=Free&period=${period}`}
            className="button button-secondary"
          >
            მოითხოვეთ კონსულტაცია
            <Icon name="arrow" size={15} />
          </Link>
        </article>
        {plans.map((plan) => {
          const price = prices?.find((item) => item.code === plan.code);
          return (
            <article
              className={`plan-card ${plan.code === "STANDARD" ? "featured-plan" : ""}`}
              key={plan.code}
            >
              <h2>{plan.name}</h2>
              <p className="plan-summary">{plan.summary}</p>
              <div aria-live="polite">
                <p className="plan-price">
                  {price
                    ? `US$ ${money(period === "annual" ? price.annualMonthly : price.monthly)}`
                    : "ფასი შეთავაზებით"}
                </p>
                <p className="plan-period">
                  {price
                    ? period === "annual"
                      ? `თვეში · US$ ${money(price.annualTotal)} წლიურად`
                      : "თვეში · ყოველთვიური გადახდით"
                    : period === "annual"
                      ? "წლიური გადახდის პირობებით"
                      : "ყოველთვიური გადახდის პირობებით"}
                </p>
              </div>
              <ul>
                {price ? (
                  <li>
                    <Icon name="check" size={14} /> {price.users} მომხმარებელი
                  </li>
                ) : null}
                {plan.features
                  .filter((_, index) => index !== 1 || !price)
                  .map((feature) => (
                    <li key={feature}>
                      <Icon name="check" size={14} />
                      {feature}
                    </li>
                  ))}
              </ul>
              <Link
                href={`/contact?plan=${plan.name}&period=${period}`}
                className="button"
              >
                მოითხოვეთ შეთავაზება
                <Icon name="arrow" size={15} />
              </Link>
            </article>
          );
        })}
      </div>
      <div className="enterprise-banner">
        <div>
          <h3>Enterprise და სპეციალური მოთხოვნები</h3>
          <p>
            გჭირდებათ დიდი გუნდისთვის განკუთვნილი გეგმა, Vibe+ ან On-Premise?
            ერთად გადავამოწმოთ თქვენი მოთხოვნები და შესაბამისი პირობები.
          </p>
        </div>
        <Link
          className="text-link"
          href={`/contact?plan=Enterprise&period=${period}`}
        >
          მოვითხოვოთ შეთავაზება
          <Icon name="arrow" size={18} />
        </Link>
      </div>
      <p className="pricing-source">
        {verifiedAt
          ? `წყაროს შემოწმება: ${georgianTimestamp(verifiedAt)} (თბილისი). `
          : "ოფიციალური ფასების გადამოწმება ამჟამად ვერ მოხერხდა. თანხას შეთავაზებაში დაგიზუსტებთ. "}
        ვალუტა: USD. აქციები, გადასახადები და საბოლოო ანგარიშსწორების პირობები
        გადაამოწმეთ შეთავაზების მიღებისას.{" "}
        <a
          href="https://www.bitrix24.ae/en/prices/"
          target="_blank"
          rel="noopener noreferrer"
        >
          ოფიციალური წყარო ↗
        </a>
      </p>
    </>
  );
}
