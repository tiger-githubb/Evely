"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateEventType } from "@/schemas/event.schema";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

interface BasicInfoSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function BasicInfoSection({ form }: BasicInfoSectionProps) {
  const t = useTranslations("basicInfoSection");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t("sectionTitle")}</h3>

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("titleLabel")}</FormLabel>
            <FormControl>
              <Input placeholder={t("titlePlaceholder")} {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="summary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("summaryLabel")}</FormLabel>
            <FormControl>
              <Textarea placeholder={t("summaryPlaceholder")} className="resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="content"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t("descriptionLabel")}</FormLabel>
            <FormControl>
              <Textarea placeholder={t("descriptionPlaceholder")} className="min-h-[200px] resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
