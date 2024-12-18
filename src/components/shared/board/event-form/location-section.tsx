"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import type { CreateEventType } from "@/schemas/event.schema";

interface LocationSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function LocationSection({ form }: LocationSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Localisation</h3>

      <div className="grid gap-4 sm:grid-cols-3">
        <FormField
          control={form.control}
          name="location.name"
          render={({ field }) => (
            <FormItem className="sm:col-span-3">
              <FormLabel>Nom du lieu</FormLabel>
              <FormControl>
                <Input placeholder="Nom du lieu de l'événement" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location.lat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input placeholder="Latitude" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location.long"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input placeholder="Longitude" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
