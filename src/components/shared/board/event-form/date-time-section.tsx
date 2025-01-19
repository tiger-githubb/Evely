"use client";

import { DatePicker } from "@/components/ui/custom/date-picker";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import type { CreateEventType } from "@/schemas/event.schema";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

interface DateTimeSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function DateTimeSection({ form }: DateTimeSectionProps) {
  const t = useTranslations("dateTimeSection");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t("sectionTitle")}</h3>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("dateLabel")}</FormLabel>
              <FormControl>
                <DatePicker date={field.value} onSelect={field.onChange} variant="date" disablePastDates={true} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="startTime"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>{t("startTimeLabel")}</FormLabel>
              <FormControl>
                <DatePicker
                  date={value ? new Date(value) : undefined} // Convert ISO string to Date object
                  onSelect={(date) => onChange(date.toISOString())} // Convert back to ISO string
                  variant="time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="endTime"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>{t("endTimeLabel")}</FormLabel>
              <FormControl>
                <DatePicker
                  date={value ? new Date(value) : undefined} // Convert ISO string to Date object
                  onSelect={(date) => onChange(date.toISOString())} // Convert back to ISO string
                  variant="time"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
