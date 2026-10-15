import { test } from "node:test";
import assert from "node:assert/strict";
import { safeArticleHtml, plainText } from "../src/lib/content/sanitize.ts";
import { createContactMailto } from "../src/lib/contact.ts";
import { georgianTimestamp } from "../src/lib/date.ts";

test("source timestamps remain numeric Georgian time across browser locales", () => {
  assert.equal(georgianTimestamp("2026-10-15T20:25:00Z"), "16.10.2026, 00:25");
});

test("WordPress HTML removes scripts, event handlers, embedded frames and unsafe URLs", () => {
  const clean = safeArticleHtml(
    '<h1>სათაური</h1><script>alert(1)</script><iframe src="https://example.com"></iframe><p onclick="alert(1)">ტექსტი <a href="javascript:alert(1)">ბმული</a></p><img src="https://evil.example/pixel" onerror="alert(1)"><img src="https://bitrixgeorgia.ge/wp-content/uploads/photo.jpg" alt="ფოტო">',
  );
  assert.match(clean, /<h2>სათაური<\/h2>/);
  assert.doesNotMatch(
    clean,
    /<script|<iframe|onclick|onerror|javascript:|evil\.example/,
  );
  assert.match(clean, /loading="lazy"/);
});
test("known WordPress links point to the matching Next.js page", () => {
  assert.match(
    safeArticleHtml(
      '<a href="https://bitrixgeorgia.ge/kontaqti/">კონტაქტი</a>',
    ),
    /href="\/contact"/,
  );
});
test("titles are rendered as plain Unicode text", () => {
  assert.equal(
    plainText("<b>CRM &amp; გაყიდვები</b> &#x10d0;"),
    "CRM & გაყიდვები ა",
  );
});
test("email request retains selected plan and safely encodes special characters", () => {
  const link = createContactMailto({
    name: "ანა & გიორგი",
    company: "კომპანია",
    contact: "+995555000000",
    service: "დანერგვა",
    plan: "Standard",
    period: "annual",
    message: "ინტეგრაცია? A&B",
  });
  const url = new URL(link);
  assert.equal(url.pathname, "info@bitrixgeorgia.ge");
  assert.equal(
    url.searchParams.get("subject"),
    "კონსულტაციის მოთხოვნა — Standard",
  );
  assert.match(url.searchParams.get("body")!, /წლიური/);
  assert.match(url.searchParams.get("body")!, /ინტეგრაცია\? A&B/);
  assert.equal([...url.searchParams.keys()].length, 2);
});
