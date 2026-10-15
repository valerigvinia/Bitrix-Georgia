import "server-only";
import { unstable_cache } from "next/cache";
import { parsePrices } from "./parse";
export const pricingSource = "https://www.bitrix24.ae/en/prices/";
const fetchPrices = unstable_cache(
  async () => {
    const response = await fetch(pricingSource, {
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    });
    if (!response.ok)
      throw new Error(`Pricing source returned ${response.status}`);
    const html = await response.text();
    if (html.length > 5000000) throw new Error("Pricing response too large");
    return { plans: parsePrices(html), verifiedAt: new Date().toISOString() };
  },
  ["bitrix-essentials-prices-v1"],
  { revalidate: 3600, tags: ["bitrix-pricing"] },
);
export async function getPricing() {
  try {
    const snapshot = await fetchPrices();
    return Date.now() - Date.parse(snapshot.verifiedAt) <= 48 * 60 * 60 * 1000
      ? snapshot
      : null;
  } catch {
    return null;
  }
}
