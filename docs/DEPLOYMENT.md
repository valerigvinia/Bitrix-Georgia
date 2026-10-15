# Vercel და GitHub

რეპოზიტორია: https://github.com/valerigvinia/Bitrix-Georgia
Vercel სამიზნე გუნდი: Portfolio (`valerigvinias-projects`).
პროექტის დაგეგმილი სახელი: `bitrix-georgia`.
Root directory: repository root. Framework: Next.js. Node: 24.x.
Install: `npm ci`; Build: `npm run build`; Output: Next.js default.

## სამუშაო გზა
1. ადგილობრივი ცვლილება → თემატური branch.
2. `npm run build` და `npm run typecheck`.
3. GitHub push → Vercel preview; GitHub Actions ამოწმებს build/typecheck-ს.
4. განხილვა და main-ში გაერთიანება; დაკავშირებული main push შეიძლება production deployment-ს იწვევდეს Vercel-ის პარამეტრების მიხედვით.
5. დომენისა და production გაშვების საკითხი ცალკე ეტაპია. მიმდინარე ვერსია noindex-ია.

არ გამოაცხადოთ CI სავალდებულო merge ბარიერად, სანამ GitHub branch protection/Deployment Checks რეალურად არ დაკონფიგურირდება.
Vercel-ის ნაგულისხმევი deployment protection უნდა შენარჩუნდეს.
საიდუმლოებები შეივსოს მხოლოდ შეთანხმებული ფორმის/CRM ინტეგრაციისას. ამ საწყის ვერსიას არ სჭირდება API გასაღები.

## დომენი და rollback
DNS ამ ეტაპზე უცვლელია. მოგვიანებით აღირიცხოს არსებული A/CNAME/MX/TXT ჩანაწერები, დაემატოს დომენი Vercel-ში და შეიცვალოს მხოლოდ საჭირო web ჩანაწერები. პრობლემისას შესაძლებელია წინა deployment-ზე დაბრუნება; DNS მიგრაციისას — შენახულ ჩანაწერებზე დაბრუნება.
