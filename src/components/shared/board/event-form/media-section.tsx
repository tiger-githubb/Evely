"use client";

import { FileUploader } from "@/components/shared/file-uploader";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Assuming Input is your reusable input component
import type { CreateEventType } from "@/schemas/event.schema";
import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";

interface MediaSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function MediaSection({ form }: MediaSectionProps) {
  const t = useTranslations("mediaSection");

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">{t("sectionTitle")}</h3>

      <div className="grid gap-6">
        {/* Cover images uploader */}
        <FormField
          control={form.control}
          name="covers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("coverImagesLabel")}</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onChange={field.onChange}
                  accept={{ "image/*": [] }}
                  maxFiles={3}
                  preview
                  className="aspect-video h-[150px] w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Video URL input */}
        <FormField
          control={form.control}
          name="videoUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("videoLabel")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("videoPlaceholder")}
                  {...field}
                  value={field.value || ""}
                  onChange={(e) => field.onChange(e.target.value)}
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
