"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";
import type { CreateEventType } from "@/schemas/event.schema";

interface BasicInfoSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function BasicInfoSection({ form }: BasicInfoSectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Informations de base</h3>

      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Titre de l&apos;événement</FormLabel>
            <FormControl>
              <Input placeholder="Entrez le titre de l'événement" {...field} />
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
            <FormLabel>Résumé</FormLabel>
            <FormControl>
              <Textarea placeholder="Entrez un bref résumé de l'événement" className="resize-none" {...field} />
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
            <FormLabel>Description détaillée</FormLabel>
            <FormControl>
              <Textarea placeholder="Décrivez votre événement en détail" className="min-h-[200px] resize-none" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
