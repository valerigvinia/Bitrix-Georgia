import type { Metadata } from "next";
import "@fontsource-variable/noto-sans-georgian";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { site } from "@/content/site";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Bitrix Georgia — CRM და ბიზნესის ავტომატიზაცია",
    template: "%s | Bitrix Georgia",
  },
  description:
    "Bitrix24-ის დანერგვა, ინტეგრაცია, ავტომატიზაცია და მხარდაჭერა ქართულად. მოვარგოთ სისტემა თქვენს ბიზნესს.",
  robots: { index: false, follow: false },
  openGraph: { type: "website", locale: "ka_GE", siteName: site.name },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ka" data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          შინაარსზე გადასვლა
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
