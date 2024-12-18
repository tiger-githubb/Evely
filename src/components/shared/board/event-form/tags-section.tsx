"use client";

import { Combobox } from "@/components/ui/custom/combo-box";
import { FormField, FormItem, FormLabel } from "@/components/ui/form";
import type { CreateEventType } from "@/schemas/event.schema";
import { fetchEventTags } from "@/server/services/event-tags.service";
import { EventTag } from "@/types/api/event-tag.type";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface TagsSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function TagsSection({ form }: TagsSectionProps) {
  const [availableTags, setAvailableTags] = useState<EventTag[]>([]);
  const [selectedTags, setSelectedTags] = useState<Array<{ value: number | string; label: string }>>([]);

  useEffect(() => {
    const loadTags = async () => {
      const response = await fetchEventTags();
      if (response.data) {
        setAvailableTags(response.data);
      }
    };
    loadTags();
  }, []);

  const handleSelect = (option: { value: number | string; label: string }) => {
    setSelectedTags((prev) => [...prev, option]);
    if (typeof option.value === "number") {
      const currentTags = form.getValues("tags") || [];
      form.setValue("tags", [...currentTags, option.value]);
    } else {
      const currentNewTags = form.getValues("newTags") || [];
      form.setValue("newTags", [...currentNewTags, option.label]);
    }
  };

  const handleRemove = (value: number | string) => {
    setSelectedTags((prev) => prev.filter((tag) => tag.value !== value));
    if (typeof value === "number") {
      const currentTags = form.getValues("tags") || [];
      form.setValue(
        "tags",
        currentTags.filter((id) => id !== value)
      );
    } else {
      const currentNewTags = form.getValues("newTags") || [];
      form.setValue(
        "newTags",
        currentNewTags.filter((tag) => tag !== value)
      );
    }
  };

  const tagOptions = availableTags.map((tag) => ({
    value: tag.id,
    label: tag.name,
  }));

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Tags</h3>
      <FormField
        control={form.control}
        name="tags"
        render={() => (
          <FormItem>
            <FormLabel></FormLabel>
            <Combobox
              options={tagOptions}
              selectedValues={selectedTags}
              onSelect={handleSelect}
              onRemove={handleRemove}
              onCreateNew={(value) => handleSelect({ value, label: value })}
            />
          </FormItem>
        )}
      />
    </div>
  );
}
