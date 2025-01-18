"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { CreateEventType } from "@/schemas/event.schema";
import { fetchEventCategories } from "@/server/services/event-categories.service";
import { fetchEventFormats } from "@/server/services/event-formats.service";
import { fetchEventLanguages } from "@/server/services/event-languages.service";
import { fetchEventTypes } from "@/server/services/event-types.service";
import type { EventCategory } from "@/types/api/event-category.type";
import type { EventFormat } from "@/types/api/event-format.type";
import type { EventLanguage } from "@/types/api/event-language.type";
import type { EventType } from "@/types/api/event-type.type";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface CategoriesSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function CategoriesSection({ form }: CategoriesSectionProps) {
  const [types, setTypes] = useState<EventType[]>([]);
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [formats, setFormats] = useState<EventFormat[]>([]);
  const [languages, setLanguages] = useState<EventLanguage[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const [typesRes, categoriesRes, formatsRes, languagesRes] = await Promise.all([
        fetchEventTypes(),
        fetchEventCategories(),
        fetchEventFormats(),
        fetchEventLanguages(),
      ]);

      setTypes(typesRes.data);
      setCategories(categoriesRes.data); // Uncomment and add .data to match the API response structure
      setFormats(formatsRes.data);
      setLanguages(languagesRes.data);
    };

    loadData();
  }, []);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Catégories et format</h3>

      <div className="grid gap-4 sm:grid-cols-2">
        <FormField
          control={form.control}
          name="typeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type d&apos;événement</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {types.map((type) => (
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="categoryId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Catégorie</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une catégorie" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id.toString()}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="formatId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Format</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un format" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format.id} value={format.id.toString()}>
                      {format.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="languageId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Langue</FormLabel>
              <Select onValueChange={(value) => field.onChange(Number(value))} value={field.value?.toString()}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner une langue" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {languages.map((language) => (
                    <SelectItem key={language.id} value={language.id.toString()}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
