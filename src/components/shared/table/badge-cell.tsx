import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface BadgeCellProps {
  value: string | number;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function BadgeCell({ value, variant = "default", className }: BadgeCellProps) {
  return (
    <Badge variant={variant} className={cn(className)}>
      {value}
    </Badge>
  );
}
