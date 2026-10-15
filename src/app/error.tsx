"use client";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="shell not-found">
      <h1>გვერდის ჩატვირთვა ვერ მოხერხდა.</h1>
      <p>გთხოვთ, სცადოთ ხელახლა.</p>
      <button className="button" onClick={reset}>
        ხელახლა ცდა
      </button>
    </section>
  );
}
