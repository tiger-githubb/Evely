"use client";

import { FileUploader } from "@/components/shared/file-uploader";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input"; // Assuming Input is your reusable input component
import { UseFormReturn } from "react-hook-form";
import type { CreateEventType } from "@/schemas/event.schema";

interface MediaSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function MediaSection({ form }: MediaSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Médias</h3>

      <div className="grid gap-6">
        {/* Cover images uploader */}
        <FormField
          control={form.control}
          name="covers"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Images de couverture</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value}
                  onChange={field.onChange}
                  accept={{ "image/*": [] }}
                  maxFiles={3}
                  preview
                  className="aspect-video h-auto w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Video URL input */}
        <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vidéo (URL)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Lien de la vidéo (ex: https://youtube.com/...)"
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
