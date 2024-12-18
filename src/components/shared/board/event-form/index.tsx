"use client";

import { createEventSchema } from "@/schemas/event.schema";
import { useOrganizationStore } from "@/stores/organization-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import BasicInfoSection from "./basic-info-section";
import DateTimeSection from "./date-time-section";
import LocationSection from "./location-section";
import CategoriesSection from "./categories-section";
import MediaSection from "./media-section";
import AgendaSection from "./agenda-section";
import FAQSection from "./faq-section";
import TagsSection from "./tags-section";
import type { z } from "zod";

type EventFormValues = z.infer<typeof createEventSchema>;

export default function EventForm() {
  const { activeOrganization } = useOrganizationStore();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: "",
      summary: "",
      content: "",
      date: new Date(),
      tags: [],
      newTags: [],
      faq: [],
      agendas: [],
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    if (!activeOrganization) return;
    // TODO: Implement event creation logic
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="space-y-8">
              <BasicInfoSection form={form} />
              <DateTimeSection form={form} />
              <LocationSection form={form} />
              <CategoriesSection form={form} />
              <MediaSection form={form} />
              <AgendaSection form={form} />
              <FAQSection form={form} />
              <TagsSection form={form} />

              <div className="flex justify-end">
                <Button type="submit" size="lg">
                  Créer l&apos;événement
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
