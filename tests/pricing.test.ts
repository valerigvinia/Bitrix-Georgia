import { test } from "node:test";
import assert from "node:assert/strict";
import { parsePrices } from "../src/lib/pricing/parse.ts";

function column(
  code: string,
  name: string,
  monthly: number,
  annual: number,
  users: number,
  family = "essentials",
) {
  return `<div data-sb-column="${code}" data-sb-section-search='{"plan":"${family}"}'><div class="bx-sb-08-price-table-header__title">${name}</div><div class="bx-sb-08-price-table-price"><div data-sb-section-search='{"code":"${code}","option":1}'><div class="bx-sb-08-price-table-price__value">US$ <span>${monthly}</span></div></div><div data-sb-section-search='{"code":"${code}","option":12}'><div class="bx-sb-08-price-table-price__base">US$ ${monthly}</div><div class="bx-sb-08-price-table-price__value">US$ <span>${annual}</span></div></div></div><div data-sb-tooltip-data='{"message":"One payment of US$ ${annual * 12} / year"}'></div><div class="bx-sb-08-price-table-user__value">includes ${users} users</div></div>`;
}
const fixture =
  column("BASIC", "Basic", 69, 49, 5) +
  column("STD", "Standard", 144, 99, 50) +
  column("PRO100", "Professional", 289, 199, 100);
test("pricing uses Essentials, selected billing periods and annual total, not a crossed-out base", () => {
  const prices = parsePrices(
    fixture + column("BASIC", "Basic Vibe+", 999, 888, 5, "vibe"),
  );
  assert.deepEqual(prices[0], {
    code: "BASIC",
    name: "Basic",
    currency: "USD",
    monthly: 69,
    annualMonthly: 49,
    annualTotal: 588,
    users: 5,
  });
  assert.equal(prices[1].code, "STANDARD");
  assert.equal(prices[2].users, 100);
});
test("changed currency, mismatched annual total and duplicate plan are rejected", () => {
  assert.throws(() => parsePrices(fixture.replace("US$", "AED")));
  assert.throws(() =>
    parsePrices(fixture.replace("US$ 588 / year", "US$ 600 / year")),
  );
  assert.throws(() =>
    parsePrices(fixture + column("BASIC", "Basic", 69, 49, 5)),
  );
});
test("missing user limits or a second promotional price fail closed", () => {
  assert.throws(() =>
    parsePrices(fixture.replace("includes 5 users", "unlimited users")),
  );
  assert.throws(() =>
    parsePrices(
      fixture.replace(
        "US$ <span>69</span>",
        'US$ <span>69</span></div><div class="bx-sb-08-price-table-price__value">US$ 10',
      ),
    ),
  );
});
