import Link from "next/link";
import { services } from "@/content/services";
import { Icon } from "@/components/ui/icon";
export function ServiceGrid() {
  return (
    <div className="service-grid">
      {services.map((service) => (
        <Link
          className="service-card"
          key={service.slug}
          href={`/services/${service.slug}`}
        >
          <div className="card-top">
            <span className="icon-tile">
              <Icon name={service.icon} size={25} />
            </span>
            <span className="card-number">{service.number}</span>
          </div>
          <h3>{service.title}</h3>
          <p>{service.text}</p>
          <span className="card-action">
            გაიგეთ მეტი
            <Icon name="arrow" size={18} />
          </span>
        </Link>
      ))}
    </div>
  );
}
