import { Icon } from "@/components/ui/icon";
export function Workspace() {
  return (
    <div className="workspace-scene">
      <div className="scene-ring ring-one" />
      <div className="scene-ring ring-two" />
      <div className="workspace">
        <div className="workspace-bar">
          <span className="workspace-badge">b24</span>
          <span>თქვენი სამუშაო სივრცე</span>
          <span className="window-dots">•••</span>
        </div>
        <div className="workspace-content">
          <aside className="mock-sidebar" aria-hidden="true">
            <Icon name="crm" />
            <Icon name="tasks" />
            <Icon name="messages" />
            <Icon name="chart" />
          </aside>
          <div className="mock-main">
            <div className="mock-heading">
              <div>
                <span className="micro-label">გაყიდვების მართვა</span>
                <h3>ყველაფერი თავის ადგილზე.</h3>
              </div>
              <span className="mock-plus" aria-hidden="true">
                +
              </span>
            </div>
            <div className="mock-tabs">
              <b>გაყიდვები</b>
              <span>დავალებები</span>
              <span>გუნდი</span>
            </div>
            <div className="mock-kanban">
              {[
                {
                  title: "ახალი მოთხოვნა",
                  name: "პირველი კონტაქტი",
                  note: "დაგეგმეთ გაცნობა",
                  icon: "messages",
                },
                {
                  title: "მიმდინარეობს",
                  name: "შეთავაზების მომზადება",
                  note: "შემდეგი ნაბიჯი ცნობილია",
                  icon: "tasks",
                },
                {
                  title: "შეთანხმებულია",
                  name: "ერთად ვიწყებთ",
                  note: "გუნდს აქვს საერთო გეგმა",
                  icon: "check",
                },
              ].map((col, i) => (
                <div className={`kanban-col col-${i}`} key={col.title}>
                  <p>
                    {col.title}
                    <span>1</span>
                  </p>
                  <div className="deal-card">
                    <div className="deal-icon">
                      <Icon name={col.icon} size={18} />
                    </div>
                    <b>{col.name}</b>
                    <span>{col.note}</span>
                    <div className="deal-line" />
                    <small>
                      <i /> პასუხისმგებელი გუნდი
                    </small>
                  </div>
                  <div className="ghost-card" aria-hidden="true">
                    <i />
                    <i />
                  </div>
                </div>
              ))}
            </div>
            <div className="mock-status">
              <Icon name="check" size={15} /> ერთი სისტემა. შეთანხმებული
              პროცესი.
            </div>
          </div>
        </div>
      </div>
      <div className="floating-note">
        <span>
          <Icon name="automation" size={24} />
        </span>
        <div>
          <b>რუტინა ავტომატიზებულია</b>
          <small>გუნდი ყურადღებას საქმეს უთმობს</small>
        </div>
        <Icon name="check" size={18} />
      </div>
      <p className="scene-caption">პროცესის საილუსტრაციო მაგალითი</p>
    </div>
  );
}
