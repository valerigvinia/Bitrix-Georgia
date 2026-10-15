import Link from "next/link";
import { site } from "@/content/site";
import { services } from "@/content/services";
import { Icon } from "@/components/ui/icon";
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-about">
          <Link className="footer-brand" href="/">
            bitrix<span>georgia</span>
          </Link>
          <p>
            ტექნოლოგია, რომელიც თქვენს
            <br />
            ყოველდღიურ საქმეს ერგება.
          </p>
          <p className="footer-note">
            Bitrix24-ის დანერგვა, ინტეგრაცია
            <br />
            და მხარდაჭერა ქართულად.
          </p>
        </div>
        <div>
          <h2>სერვისები</h2>
          {services.map((service) => (
            <Link key={service.slug} href={`/services/${service.slug}`}>
              {service.title}
            </Link>
          ))}
        </div>
        <div>
          <h2>გაიცანით</h2>
          <Link href="/bitrix24">Bitrix24-ის შესაძლებლობები</Link>
          <Link href="/pricing">ტარიფები</Link>
          <Link href="/about">ჩვენ შესახებ</Link>
          <Link href="/news">სიახლეები და სტატიები</Link>
          <Link href="/faq">ხშირად დასმული კითხვები</Link>
        </div>
        <div>
          <h2>დაგვიკავშირდით</h2>
          <a href={`mailto:${site.email}`}>
            <Icon name="mail" size={17} />
            {site.email}
          </a>
          <a href={`tel:${site.phone}`}>
            <Icon name="phone" size={17} />
            {site.phoneLabel}
          </a>
          <Link className="footer-consult" href="/contact">
            დავგეგმოთ საუბარი <Icon name="arrow" size={17} />
          </Link>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} Bitrix Georgia</span>
        <div>
          <Link href="/privacy">კონფიდენციალურობა</Link>
          <Link href="/terms">გამოყენების პირობები</Link>
        </div>
        <span>Bitrix24 — მისი მფლობელის სავაჭრო ნიშანი</span>
      </div>
    </footer>
  );
}
