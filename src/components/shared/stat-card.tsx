import { cn } from "@/lib/utils";
import { Calendar, DollarSign, Smile, Users } from "lucide-react";

const iconMap = {
  calendar: Calendar,
  users: Users,
  "dollar-sign": DollarSign,
  smile: Smile,
} as const;

interface StatCardProps {
  title: string;
  value: string;
  icon: keyof typeof iconMap;
  className?: string;
}

export function StatCard({ title, value, icon, className }: StatCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className={cn("rounded-lg border p-4 flex items-start space-x-4", className)}>
      <div className="p-2 rounded-full bg-primary/10">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
      </div>
    </div>
  );
}
