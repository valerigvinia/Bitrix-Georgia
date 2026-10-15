import { services } from "@/content/services";

export default function Home() {
  return <>
    <a className="skip" href="#main">შინაარსზე გადასვლა</a>
    <header className="shell header">
      <a className="wordmark" href="/" aria-label="Bitrix Georgia მთავარი">bitrix<span>georgia</span><i /></a>
      <nav aria-label="მთავარი ნავიგაცია"><a href="#services">სერვისები</a><a href="#process">როგორ ვმუშაობთ</a><a href="#pricing">ტარიფები</a></nav>
      <a className="button small" href="#contact">დაგვიკავშირდით ↗</a>
    </header>
    <main id="main">
      <section className="shell hero">
        <div><p className="eyebrow"><span /> BITRIX24 • ბიზნესის ახალი რიტმი</p>
          <h1>მეტი წესრიგი.<br />მეტი შესაძლებლობა.<br /><em>თქვენს ბიზნესში.</em></h1>
          <p className="intro">გაყიდვებიდან ყოველდღიურ პროცესებამდე — ვეხმარებით თქვენს გუნდს Bitrix24-ის დანერგვასა და ეფექტურად გამოყენებაში.</p>
          <a className="button" href="#contact">მოითხოვეთ კონსულტაცია <span>↗</span></a>
          <p className="subtle">დანერგვა / ინტეგრაცია / მხარდაჭერა ქართულად</p>
        </div>
        <div className="workspace" aria-label="ბიზნესპროცესის საილუსტრაციო სქემა">
          <div className="workspace-top"><span className="mini-mark">b.</span><span>თქვენი ბიზნესის სამუშაო სივრცე</span><span className="dots">•••</span></div>
          <div className="workspace-body"><p className="eyebrow">ყველაფერი დაკავშირებულია</p><h2>იდეიდან<br />შედეგამდე.</h2>
          <div className="flow"><div><span>01</span>ახალი მოთხოვნა<b>↗</b></div><div><span>02</span>დაგეგმილი მოქმედება<b>✓</b></div><div className="active"><span>03</span>მოწესრიგებული პროცესი<b>✓</b></div></div>
          <div className="workspace-footer"><span className="status" /> გუნდი • CRM • ავტომატიზაცია</div></div>
        </div>
      </section>
      <section id="services" className="services"><div className="shell"><div className="section-heading"><p className="eyebrow">01 / ჩვენი სერვისები</p><h2>ტექნოლოგია, რომელიც<br />თქვენს საქმეს ერგება.</h2></div>
        <div className="service-grid">{services.map(service => <article key={service.number}><span className="service-number">{service.number} /</span><h3>{service.title}</h3><p>{service.text}</p></article>)}</div>
      </div></section>
      <section id="process" className="shell section"><p className="eyebrow">02 / სამუშაო პროცესი</p><h2>მკაფიო გზა ცვლილებამდე.</h2><div className="steps">{["ვიკვლევთ თქვენს პროცესებს", "ვგეგმავთ და ვნერგავთ", "ვამზადებთ თქვენს გუნდს"].map((step,index) => <p key={step}><span>0{index+1}</span>{step}</p>)}</div></section>
      <section id="pricing" className="shell section pricing"><div><p className="eyebrow">03 / BITRIX24-ის ტარიფები</p><h2>შეარჩიეთ თქვენი<br />ბიზნესის შესაძლებლობები.</h2></div><div><p>ლიცენზია და დანერგვის მომსახურება ცალ-ცალკე განისაზღვრება. ტარიფის, გადახდის პერიოდისა და გუნდის ზომის შერჩევაში დაგეხმარებით.</p><a className="text-link" href="#contact">მოითხოვეთ შეთავაზება ↗</a><a className="source" href="https://www.bitrix24.ae/en/prices/" target="_blank" rel="noopener noreferrer">Bitrix24-ის ოფიციალური ფასები ↗</a></div></section>
      <section id="contact" className="contact"><div className="shell"><p className="eyebrow">დავიწყოთ საუბრით</p><h2>თქვენი შემდეგი ნაბიჯი —<br />მოწესრიგებული ბიზნესი.</h2><p>მოგვწერეთ თქვენი ბიზნესის საჭიროებების შესახებ ან დაგვირეკეთ.</p><a className="button light" href="mailto:info@bitrixgeorgia.ge">info@bitrixgeorgia.ge ↗</a><p><a href="tel:+995555102035">+995 555 10 20 35</a></p></div></section>
    </main>
    <footer className="shell footer"><span>Bitrix Georgia</span><span>საწყისი სამუშაო ვერსია • 2026</span><span>Bitrix24 არის მისი მფლობელის სავაჭრო ნიშანი.</span></footer>
  </>;
}
