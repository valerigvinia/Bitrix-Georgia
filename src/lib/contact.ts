export function createContactMailto(data: {
  name: string;
  company: string;
  contact: string;
  service: string;
  plan: string;
  period: string;
  message: string;
}) {
  const subject = `კონსულტაციის მოთხოვნა${data.plan ? ` — ${data.plan}` : data.service ? ` — ${data.service}` : ""}`;
  const body = [
    `სახელი: ${data.name}`,
    data.company ? `კომპანია: ${data.company}` : "",
    `საკონტაქტო ინფორმაცია: ${data.contact}`,
    data.service ? `სერვისი: ${data.service}` : "",
    data.plan ? `ტარიფი: ${data.plan}` : "",
    data.plan
      ? `გადახდის პერიოდი: ${data.period === "monthly" ? "ყოველთვიური" : "წლიური"}`
      : "",
    "",
    data.message,
  ]
    .filter((line, index) => line || index === 6)
    .join("\n");
  return `mailto:info@bitrixgeorgia.ge?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
