# Bitrix Georgia

ქართული Bitrix24 სერვისების ვებსაიტის საწყისი Next.js / TypeScript პროექტი. მოქმედი WordPress: https://bitrixgeorgia.ge/ . დომენის მიგრაცია ჯერ არ სრულდება.

## გაშვება
Node.js 24 LTS და npm.

```sh
npm ci
npm run dev
```

http://localhost:3000

```sh
npm run build
npm run typecheck
npm start
```

## სტრუქტურა
```text
src/app/           მარშრუტები, layout და გლობალური სტილები
src/content/       ქართული კონტენტი
docs/brand/        დაცული ბრენდბუქი
docs/              გეგმა, გადაწყვეტილებები, ფასები, deployment
assets/reference/  ლოკალური საცნობარო ფაილები; Git-ში არ შედის
.github/workflows/ ავტომატური შემოწმება
AGENTS.md          დაცული სამუშაო წესები
```

`src/components` და `src/lib` დაემატება შესაბამისი კოდის გაჩენისას. `.env.example` არის კონფიგურაციის შაბლონი; რეალური საიდუმლოებები Git-ში არ ჩაიწეროს.

## მიმდინარე საზღვრები
ეს არის ინფრასტრუქტურისა და დიზაინის სამუშაო ვერსია. საკონტაქტო ფორმა, ფასების feed, WordPress კონტენტის მიგრაცია და საბოლოო ბრენდი ჯერ დასასრულებელია. კონტაქტები გადმოტანილია მოქმედი საიტის მთავარი გვერდიდან (2026-10-15): info@bitrixgeorgia.ge და +995555102035. ყველა გვერდს აქვს noindex გამოშვებამდე.

დაიწყეთ [სრული საიტის გეგმით](docs/SITE-PLAN.md), [სამუშაო ეტაპებით](docs/ROADMAP.md), [ბრენდბუქით](docs/brand/BRAND-BOOK.md) და [ფასების მიდგომით](docs/PRICING.md). სიახლეების ადმინისტრირება შეთანხმებულია WordPress-იდან; საჯარო საიტი იქნება Next.js-ზე.
