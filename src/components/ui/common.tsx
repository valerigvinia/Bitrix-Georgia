import Link from "next/link";
import { Icon } from "./icon";
import { faqs } from "@/content/site";
export function Button({
  href,
  children,
  secondary = false,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  secondary?: boolean;
  className?: string;
}) {
  return (
    <Link
      className={`button ${secondary ? "button-secondary" : ""} ${className}`}
      href={href}
    >
      {children}
      <Icon name="arrow" size={18} />
    </Link>
  );
}
export function PageHero({
  label,
  title,
  description,
  children,
}: {
  label: string;
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="shell">
        <nav className="breadcrumb" aria-label="გვერდის მდებარეობა">
          <Link href="/">მთავარი</Link>
          <span aria-hidden="true">/</span>
          <span>{label}</span>
        </nav>
        <p className="eyebrow">
          <span />
          {label}
        </p>
        <h1>{title}</h1>
        <p className="lead">{description}</p>
        {children}
      </div>
      <div className="hero-orbit" aria-hidden="true" />
    </section>
  );
}
export function SectionHeading({
  label,
  title,
  description,
  href,
  linkText = "გაიგეთ მეტი",
}: {
  label: string;
  title: string;
  description?: string;
  href?: string;
  linkText?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{label}</p>
        <h2>{title}</h2>
        {description ? <p className="section-intro">{description}</p> : null}
      </div>
      {href ? (
        <Link className="text-link" href={href}>
          {linkText}
          <Icon name="right" size={18} />
        </Link>
      ) : null}
    </div>
  );
}
export function ContactBand() {
  return (
    <section className="contact-band">
      <div className="shell contact-band-inner">
        <div>
          <p className="eyebrow">შემდეგი ნაბიჯი</p>
          <h2>
            მოვარგოთ სისტემა
            <br />
            თქვენს ბიზნესს.
          </h2>
          <p>
            მოგვიყევით თქვენს პროცესებზე. ერთად განვსაზღვროთ, საიდან დავიწყოთ.
          </p>
        </div>
        <Button href="/contact" className="button-white">
          მოითხოვეთ კონსულტაცია
        </Button>
      </div>
    </section>
  );
}
export function FaqList({
  items = faqs.slice(0, 5),
}: {
  items?: readonly { q: string; a: string }[];
}) {
  return (
    <div className="faq-list">
      {items.map((item, index) => (
        <details key={item.q}>
          <summary>
            <span className="faq-index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span>{item.q}</span>
            <Icon name="chevron" size={18} />
          </summary>
          <p>{item.a}</p>
        </details>
      ))}
    </div>
  );
}
