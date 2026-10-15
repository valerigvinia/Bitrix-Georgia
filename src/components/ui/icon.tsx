import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Blocks,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleHelp,
  CloudUpload,
  GraduationCap,
  Headphones,
  LayoutDashboard,
  ListChecks,
  Mail,
  Menu,
  MessageSquare,
  Network,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";
const icons = {
  arrow: ArrowUpRight,
  right: ArrowRight,
  chart: BarChart3,
  integrations: Network,
  crm: LayoutDashboard,
  tasks: ListChecks,
  messages: MessageSquare,
  automation: Workflow,
  migration: CloudUpload,
  training: GraduationCap,
  support: Headphones,
  web: Blocks,
  check: Check,
  chevron: ChevronDown,
  help: CircleHelp,
  business: BriefcaseBusiness,
  mail: Mail,
  phone: Phone,
  search: Search,
  shield: ShieldCheck,
  sparkle: Sparkles,
  menu: Menu,
  close: X,
};
export function Icon({
  name,
  size = 22,
  className,
}: {
  name: string;
  size?: number;
  className?: string;
}) {
  const Component = icons[name as keyof typeof icons] || icons.crm;
  return (
    <Component
      size={size}
      strokeWidth={1.65}
      aria-hidden="true"
      className={className}
    />
  );
}
