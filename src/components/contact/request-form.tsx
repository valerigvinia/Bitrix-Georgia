"use client";
import { useState } from "react";
import Link from "next/link";
import { services } from "@/content/services";
import { planNames } from "@/content/plans";
import { createContactMailto } from "@/lib/contact";
import { Icon } from "@/components/ui/icon";
export function RequestForm({
  initialService,
  initialPlan,
  initialPeriod,
}: {
  initialService: string;
  initialPlan: string;
  initialPeriod: string;
}) {
  const [plan, setPlan] = useState(initialPlan);
  const [status, setStatus] = useState("");
  return (
    <form
      className="contact-form"
      onSubmit={(event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (!form.reportValidity()) return;
        const values = new FormData(form);
        const value = (key: string) => String(values.get(key) || "").trim();
        const name = value("name"),
          contact = value("contact"),
          message = value("message");
        if (!name || !contact || !message) {
          setStatus(
            "გთხოვთ, შეავსოთ სახელი, საკონტაქტო ინფორმაცია და შეტყობინება.",
          );
          return;
        }
        const href = createContactMailto({
          name,
          company: value("company"),
          contact,
          service: value("service"),
          plan: value("plan"),
          period: value("period"),
          message,
        });
        window.location.href = href;
        setStatus(
          "გაიხსნება თქვენი ელფოსტის პროგრამა მომზადებული წერილით. მოთხოვნა გაიგზავნება მხოლოდ იქ „გაგზავნაზე“ დაჭერის შემდეგ. თუ პროგრამა არ გაიხსნა, მოგვწერეთ პირდაპირ info@bitrixgeorgia.ge-ზე.",
        );
      }}
    >
      <h2>მოგვიყევით თქვენს ამოცანაზე.</h2>
      <p className="form-intro">
        ფორმა მოამზადებს წერილს თქვენს ელფოსტის პროგრამაში. გაგზავნამდე შეძლებთ
        მის შემოწმებას.
      </p>
      <div className="form-grid">
        <label className="field">
          სახელი *
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={80}
            placeholder="თქვენი სახელი"
          />
        </label>
        <label className="field">
          კომპანია
          <input
            name="company"
            autoComplete="organization"
            maxLength={100}
            placeholder="კომპანიის დასახელება"
          />
        </label>
        <label className="field full-width">
          ელფოსტა ან ტელეფონი *
          <input
            name="contact"
            required
            maxLength={120}
            placeholder="როგორ დაგიკავშირდეთ?"
          />
        </label>
        <label className="field full-width">
          რა მიმართულება გაინტერესებთ?
          <select name="service" defaultValue={initialService}>
            <option value="">საჭიროა კონსულტაცია</option>
            {services.map((item) => (
              <option key={item.slug} value={item.title}>
                {item.title}
              </option>
            ))}
          </select>
        </label>
        <label className="field">
          სასურველი ტარიფი
          <select
            name="plan"
            value={plan}
            onChange={(event) => setPlan(event.target.value)}
          >
            <option value="">შერჩევაში დახმარება</option>
            {planNames.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <label className="field">
          გადახდის პერიოდი
          <select name="period" defaultValue={initialPeriod} disabled={!plan}>
            <option value="annual">წლიური</option>
            <option value="monthly">ყოველთვიური</option>
          </select>
        </label>
        <label className="field full-width">
          შეტყობინება *
          <textarea
            name="message"
            required
            maxLength={1500}
            placeholder="რას საქმიანობს თქვენი კომპანია და რისი გაუმჯობესება გსურთ?"
          />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" required name="consent" />
        <span>
          გავეცანი <Link href="/privacy">კონფიდენციალურობის ინფორმაციას</Link>{" "}
          და ვეთანხმები ჩემ მიერ გაგზავნილი მონაცემების გამოყენებას ამ
          მოთხოვნაზე პასუხისთვის.
        </span>
      </label>
      <button className="button" type="submit">
        წერილის მომზადება
        <Icon name="arrow" size={18} />
      </button>
      {status ? (
        <p className="form-status" role="status">
          {status}
        </p>
      ) : null}
    </form>
  );
}
