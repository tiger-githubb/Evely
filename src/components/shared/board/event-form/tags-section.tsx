"use client";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { X } from "lucide-react";
import { useState } from "react";
import type { CreateEventType } from "@/schemas/event.schema";

interface TagsSectionProps {
  form: UseFormReturn<CreateEventType>;
}

export default function TagsSection({ form }: TagsSectionProps) {
  const [newTag, setNewTag] = useState("");

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
        name="newTags"
        render={() => (
          <FormItem>
            <FormLabel>Ajouter des tags</FormLabel>
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
