import sanitizeHtml from "sanitize-html";

export function plainText(value: string): string {
  return sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} })
    .replace(
      /&(?:amp|lt|gt|quot|apos|nbsp|hellip);/g,
      (entity) =>
        ({
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&apos;": "'",
          "&nbsp;": " ",
          "&hellip;": "…",
        })[entity] || entity,
    )
    .replace(/&#(x[0-9a-f]+|\d+);/gi, (_, digits: string) => {
      const code =
        digits[0].toLowerCase() === "x"
          ? parseInt(digits.slice(1), 16)
          : Number(digits);
      return code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : "";
    })
    .replace(/\s+/g, " ")
    .trim();
}

const legacyLinks: Record<string, string> = {
  "/kontaqti/": "/contact",
  "/blogi/": "/news",
  "/chvens-shesakheb/": "/about",
  "/სერვისები/": "/services",
  "/faq/": "/faq",
  "/wesebi-da-pirobebi/": "/terms",
};
export function safeArticleHtml(
  html: string,
  mediaHost = "bitrixgeorgia.ge",
): string {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "b",
      "i",
      "a",
      "br",
      "blockquote",
      "img",
      "figure",
      "figcaption",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "hr",
      "code",
      "pre",
    ],
    allowedAttributes: {
      a: ["href", "rel"],
      img: ["src", "alt", "width", "height", "loading", "decoding"],
      th: ["scope"],
      ol: ["start"],
    },
    allowedSchemes: ["https", "mailto", "tel"],
    allowProtocolRelative: false,
    transformTags: {
      h1: "h2",
      a: (tagName, attribs) => {
        let href = attribs.href || "";
        try {
          const url = new URL(href, "https://bitrixgeorgia.ge");
          if (["bitrixgeorgia.ge", mediaHost].includes(url.hostname))
            href = legacyLinks[decodeURIComponent(url.pathname)] || href;
        } catch {
          href = "";
        }
        return { tagName, attribs: { href, rel: "noopener noreferrer" } };
      },
      img: (tagName, attribs) => {
        let src = "";
        try {
          const url = new URL(attribs.src);
          if (
            url.protocol === "https:" &&
            ["bitrixgeorgia.ge", mediaHost].includes(url.hostname)
          )
            src = url.href;
        } catch {
          /* Omit unsafe images. */
        }
        return {
          tagName,
          attribs: {
            src,
            alt: attribs.alt || "",
            loading: "lazy",
            decoding: "async",
          },
        };
      },
    },
    exclusiveFilter: (frame) => frame.tag === "img" && !frame.attribs.src,
  });
}
