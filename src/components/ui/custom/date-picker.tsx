"use client";

import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarIcon, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface DatePickerProps {
  date?: Date;
  onSelect: (date: Date) => void;
  variant?: "date" | "time" | "datetime";
  disablePastDates?: boolean;
}

export function DatePicker({ date, onSelect, variant = "date", disablePastDates = false }: DatePickerProps) {
  const showDate = variant === "date" || variant === "datetime";
  const showTime = variant === "time" || variant === "datetime";

  const handleTimeChange = (timeString: string) => {
    const [hours, minutes] = timeString.split(":");
    const newDate = date ? new Date(date) : new Date();
    newDate.setHours(parseInt(hours), parseInt(minutes));
    onSelect(newDate);
  };

  const getDisplayText = () => {
    if (!date) return "Sélectionner";

    switch (variant) {
      case "date":
        return format(date, "PPP", { locale: fr });
      case "time":
        return format(date, "HH:mm");
      case "datetime":
        return format(date, "PPP HH:mm", { locale: fr });
      default:
        return "Sélectionner";
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}>
          {showDate && <CalendarIcon className="mr-2 h-4 w-4" />}
          {showTime && !showDate && <Clock className="mr-2 h-4 w-4" />}
          {getDisplayText()}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-auto p-0" align="start">
        <div className="space-y-4 p-3">
          {showDate && (
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && onSelect(newDate)}
              disabled={disablePastDates ? (date) => date < new Date(new Date().setHours(0, 0, 0, 0)) : undefined}
              initialFocus
              locale={fr}
            />
          )}
          {showTime && (
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <Input
                type="time"
                value={date ? format(date, "HH:mm") : ""}
                onChange={(e) => handleTimeChange(e.target.value)}
                className="w-[150px]"
              />
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}
