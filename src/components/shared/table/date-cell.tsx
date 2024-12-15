import { cn } from "@/lib/utils";

interface DateCellProps {
  date: Date | string;
  className?: string;
  showTime?: boolean;
  format?: Intl.DateTimeFormatOptions;
}

export function DateCell({ date, className, showTime = true, format }: DateCellProps) {
  const dateObj = new Date(date);
  const defaultFormat: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: showTime ? "2-digit" : undefined,
    minute: showTime ? "2-digit" : undefined,
  };

  const formattedDate = dateObj.toLocaleDateString("fr-FR", format || defaultFormat);
  const uniqueKey = `date-${dateObj.getTime()}`;

  return (
    <span key={uniqueKey} className={cn("text-sm", className)}>
      {formattedDate}
    </span>
  );
}
