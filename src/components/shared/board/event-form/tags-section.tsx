"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CreateEventType } from "@/schemas/event.schema";
import { fetchEventTags } from "@/server/services/event-tags.service";
import { EventTag } from "@/types/api/event-tag.type";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface TagsSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function TagsSection({ form }: TagsSectionProps) {
  const [newTag, setNewTag] = useState("");
  const [availableTags, setAvailableTags] = useState<EventTag[]>([]);

  useEffect(() => {
    const loadTags = async () => {
      const response = await fetchEventTags();
      if (response.data) {
        setAvailableTags(response.data);
      }
    };
    loadTags();
  }, []);

  const handleAddTag = () => {
    if (!newTag.trim()) return;

    const currentNewTags = form.getValues("newTags") || [];
    form.setValue("newTags", [...currentNewTags, newTag.trim()]);
    setNewTag("");
  };

  const handleRemoveTag = (index: number) => {
    const currentNewTags = form.getValues("newTags") || [];
    form.setValue(
      "newTags",
      currentNewTags.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Tags</h3>

      <FormField
        control={form.control}
        name="tags"
        render={() => (
          <FormItem>
            <FormLabel>Tags existants</FormLabel>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
              {availableTags.map((tag) => (
                <label key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    checked={form.watch("tags")?.includes(tag.id)}
                    onCheckedChange={(checked) => {
                      const currentTags = form.getValues("tags") || [];
                      if (checked) {
                        form.setValue("tags", [...currentTags, tag.id]);
                      } else {
                        form.setValue(
                          "tags",
                          currentTags.filter((id) => id !== tag.id)
                        );
                      }
                    }}
                  />
                  <span>{tag.name}</span>
                </label>
              ))}
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="newTags"
        render={() => (
          <FormItem>
            <FormLabel>Nouveaux tags</FormLabel>
            <div className="space-y-4">
              <div className="flex gap-2">
                <FormControl>
                  <Input
                    placeholder="Nouveau tag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                </FormControl>
                <Button type="button" onClick={handleAddTag}>
                  Ajouter
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {form.watch("newTags")?.map((tag, index) => (
                  <div key={index} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
                    <span>{tag}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
