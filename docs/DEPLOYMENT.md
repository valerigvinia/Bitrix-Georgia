# Vercel და GitHub

რეპოზიტორია: https://github.com/valerigvinia/Bitrix-Georgia
Vercel სამიზნე გუნდი: Portfolio (`valerigvinias-projects`).
პროექტი: `bitrix-georgia` (`prj_s8fxdONiYyiRAMEA1TvCB6AutQRf`).
მისამართი: https://bitrix-georgia.vercel.app
Root directory: repository root. Framework: Next.js. Node: 24.x.
Install: `npm ci`; Build: `npm run build`; Output: Next.js default.

## მიმდინარე შედეგი — 2026-10-15
- საწყისი კოდი ატვირთულია GitHub main-ზე; საწყისი commit: `a6226d0`.
- ლოკალური build/typecheck და GitHub Actions Check წარმატებით დასრულდა: https://github.com/valerigvinia/Bitrix-Georgia/actions/runs/38789459577
- წინა წვდომის დასკვნა დაზუსტდა: explicit teamId-ით სია ცარიელია, ნაგულისხმევი connector კონტექსტით კი ჩანს იგივე გუნდის პროექტები და შესაძლებელია პროექტის განახლება/დეპლოი. ზოგიერთ connector endpoint-ზე რჩება 403/404; ეს სრული წვდომის არქონას არ ნიშნავს.
- CLI 64.2.0-ის VERCEL_TOKEN შემოწმება ადრე წარუმატებელი იყო; ამ შესწორებისთვის გამოყენებულია დაკავშირებული Vercel ინსტრუმენტი.
- წარუმატებელი deployment `dpl_Aqy9qm4SpPzbphipQZUUMvMQWvGz`: `STATIC_BUILD_NO_OUT_DIR` — აწყობა დასრულდა, მაგრამ `framework: null` კონფიგურაციით Vercel ეძებდა `public` დირექტორიას.
- პროექტის პარამეტრებში გასწორდა `framework: nextjs` და `outputDirectory: null` (framework default).
- ახალი deployment `dpl_EvfmDq53i8j3EJbByNavVaw3Vta5` დადასტურებულია READY სტატუსით; target: production, commit: `af8e59ec2067eed8562385ccaf4ec710e3631ea8`, build დაახლოებით 23 წამი. https://bitrix-georgia.vercel.app
- Deployment Protection შენარჩუნებულია. გვერდის ავტომატურმა fetch-მა დაცვის bypass endpoint-ზე მიიღო 403; ვიზუალური QA და runtime გვერდის შიგთავსი ჯერ არ გადამოწმებულა.
- ლოკალური `.vercel/project.json` უკავშირდება მთავარ `bitrix-georgia` პროექტს და Git-ში იგნორირებულია.
- ასევე არსებობს `bitrix-georgia-lggb` პროექტი იმავე რეპოზიტორიით. ამ შესწორებისას ის არ შეცვლილა; ძირითად სამიზნედ გამოიყენება `bitrix-georgia`.

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
