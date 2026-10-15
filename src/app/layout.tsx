import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Bitrix Georgia — CRM და ბიზნესის ავტომატიზაცია",
  description: "Bitrix24-ის დანერგვა, ინტეგრაცია და მხარდაჭერა ქართულად.",
  robots: { index: false, follow: false },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ka"><body>{children}</body></html>;
}
