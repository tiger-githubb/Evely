"use client";

import { FileUploader } from "@/components/shared/file-uploader";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
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

        {/* <FormField
          control={form.control}
          name="video"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vidéo (optionnel)</FormLabel>
              <FormControl>
                <FileUploader
                  value={field.value ? [field.value] : []}
                  onChange={(files) => field.onChange(files[0])}
                  accept={{ "video/*": [] }}
                  maxFiles={1}
                  preview={false}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </div>
    </div>
  );
}
