"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { CreateEventType } from "@/schemas/event.schema";
import { PlusCircle, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { UseFormReturn, useFieldArray } from "react-hook-form";

interface FAQSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function FAQSection({ form }: FAQSectionProps) {
  const t = useTranslations("faqSection");

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faq",
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{t("sectionTitle")}</h3>
        <Button type="button" variant="outline" size="sm" onClick={() => append({ question: "", response: "" })}>
          <PlusCircle className="mr-2 h-4 w-4" />
          {t("addQuestion")}
        </Button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4 rounded-lg border p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-4">
              <FormField
                control={form.control}
                name={`faq.${index}.question`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("questionLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("questionPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`faq.${index}.response`}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("responseLabel")}</FormLabel>
                    <FormControl>
                      <Textarea placeholder={t("responsePlaceholder")} {...field} className="resize-none" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
