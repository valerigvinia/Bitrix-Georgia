"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/icon";
const links = [
  { href: "/bitrix24", label: "Bitrix24" },
  { href: "/services", label: "სერვისები" },
  { href: "/pricing", label: "ტარიფები" },
  { href: "/news", label: "სიახლეები" },
  { href: "/about", label: "ჩვენ შესახებ" },
];
export function Brand() {
  return (
    <Link className="brand" href="/" aria-label="Bitrix Georgia — მთავარი">
      <span className="brand-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <span>
        bitrix<span className="brand-light">georgia</span>
        <small>ბიზნესის ციფრული განვითარება</small>
      </span>
    </Link>
  );
}
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const active = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === "Escape") {
          setOpen(false);
          document.getElementById("menu-toggle")?.focus();
        }
      }}
    >
      <div className="shell header-inner">
        <div onClick={() => setOpen(false)}>
          <Brand />
        </div>
        <nav className="desktop-nav" aria-label="მთავარი ნავიგაცია">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={active(link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="header-contact" href="/contact">
          კონსულტაცია
          <Icon name="arrow" size={17} />
        </Link>
        <button
          id="menu-toggle"
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "მენიუს დახურვა" : "მენიუს გახსნა"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      <nav
        id="mobile-menu"
        className="mobile-nav"
        aria-label="მობილური ნავიგაცია"
        hidden={!open}
      >
        {[
          ...links,
          { href: "/faq", label: "ხშირად დასმული კითხვები" },
          { href: "/contact", label: "კონტაქტი" },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active(link.href) ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            {link.label}
            <Icon name="right" size={18} />
          </Link>
        ))}
      </nav>
    </header>
  );
}
