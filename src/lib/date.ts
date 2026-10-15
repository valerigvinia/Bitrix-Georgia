// Explicit numeric format keeps server and browsers without Georgian ICU consistent.
export function georgianTimestamp(value: string): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Tbilisi",
  }).formatToParts(new Date(value));
  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value;
  return `${part("day")}.${part("month")}.${part("year")}, ${part("hour")}:${part("minute")}`;
}
