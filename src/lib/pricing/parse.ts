import { load } from "cheerio";
export type PricePlan = {
  code: string;
  name: string;
  currency: "USD";
  monthly: number;
  annualMonthly: number;
  annualTotal: number;
  users: number;
};

function amount(value: string): number {
  const match = value.trim().match(/^US\$\s*([\d,]+(?:\.\d{1,2})?)$/);
  if (!match) throw new Error("Unrecognized price or currency");
  const number = Number(match[1].replaceAll(",", ""));
  if (!Number.isFinite(number) || number <= 0 || number > 100000)
    throw new Error("Invalid amount");
  return number;
}

export function parsePrices(html: string): PricePlan[] {
  const $ = load(html);
  return [
    { code: "BASIC", id: "BASIC", label: "Basic" },
    { code: "STANDARD", id: "STD", label: "Standard" },
    { code: "PROFESSIONAL", id: "PRO100", label: "Professional" },
  ].map(({ code: canonicalCode, id: code, label }) => {
    const column = $(`[data-sb-column="${code}"]`).filter((_, node) => {
      try {
        return (
          JSON.parse($(node).attr("data-sb-section-search") || "{}").plan ===
          "essentials"
        );
      } catch {
        return false;
      }
    });
    if (column.length !== 1) throw new Error(`Ambiguous plan ${code}`);
    const name = column
      .find(".bx-sb-08-price-table-header__title")
      .first()
      .text()
      .trim();
    if (name !== label) throw new Error("Plan name changed");
    const section = (option: number) =>
      column
        .find(".bx-sb-08-price-table-price [data-sb-section-search]")
        .filter((_, node) => {
          try {
            const data = JSON.parse(
              $(node).attr("data-sb-section-search") || "{}",
            );
            return data.code === code && data.option === option;
          } catch {
            return false;
          }
        });
    const monthlyElements = section(1).find(
      ".bx-sb-08-price-table-price__value",
    );
    const annualElements = section(12).find(
      ".bx-sb-08-price-table-price__value",
    );
    if (monthlyElements.length !== 1 || annualElements.length !== 1)
      throw new Error("Ambiguous price variant");
    const monthly = amount(monthlyElements.text());
    const annualMonthly = amount(annualElements.text());
    const annualMessages = column
      .find("[data-sb-tooltip-data]")
      .toArray()
      .map((node) => {
        try {
          return String(
            JSON.parse($(node).attr("data-sb-tooltip-data") || "{}").message ||
              "",
          );
        } catch {
          return "";
        }
      })
      .filter((message) =>
        /^One payment of US\$ [\d,.]+ \/ year$/.test(message),
      );
    if (annualMessages.length !== 1)
      throw new Error("Annual total missing or ambiguous");
    const annualTotal = amount(
      annualMessages[0].replace("One payment of ", "").replace(" / year", ""),
    );
    if (
      Math.abs(annualMonthly * 12 - annualTotal) > 0.05 ||
      annualMonthly > monthly
    )
      throw new Error("Inconsistent billing amounts");
    const userText = column
      .find(".bx-sb-08-price-table-user__value")
      .text()
      .trim();
    const usersMatch = userText.match(/^includes\s+([\d,]+)\s+users$/);
    if (!usersMatch) throw new Error("User limit missing or changed");
    const users = Number(usersMatch[1].replaceAll(",", ""));
    if (!Number.isInteger(users) || users <= 0)
      throw new Error("Invalid user limit");
    return {
      code: canonicalCode,
      name,
      currency: "USD" as const,
      monthly,
      annualMonthly,
      annualTotal,
      users,
    };
  });
}
