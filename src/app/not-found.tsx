import { Button } from "@/components/ui/common";
export default function NotFound() {
  return (
    <section className="shell not-found">
      <p className="eyebrow">404 / გვერდი ვერ მოიძებნა</p>
      <h1>
        ეს გზა აქ სრულდება.
        <br />
        საქმე კი გრძელდება.
      </h1>
      <p>
        შესაძლოა მისამართი შეიცვალა. დაბრუნდით მთავარ გვერდზე ან გაეცანით
        სერვისებს.
      </p>
      <div className="hero-actions">
        <Button href="/">მთავარი გვერდი</Button>
        <Button href="/services" secondary>
          სერვისები
        </Button>
      </div>
    </section>
  );
}
