"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createEventSchema, CreateEventType } from "@/schemas/event.schema";
import { createEvent, updateEventMedia } from "@/server/services/events.service";
import { useOrganizationStore } from "@/stores/organization-store";
import { Event } from "@/types/api/event.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type { z } from "zod";
import AgendaSection from "./agenda-section";
import BasicInfoSection from "./basic-info-section";
import CategoriesSection from "./categories-section";
import DateTimeSection from "./date-time-section";
import FAQSection from "./faq-section";
import LocationSection from "./location-section";
import MediaSection from "./media-section";
import TagsSection from "./tags-section";

type EventFormValues = z.infer<typeof createEventSchema>;

interface EventFormProps {
  initialData?: Event;
}

export default function EventForm({ initialData }: EventFormProps) {
  const { activeOrganization } = useOrganizationStore();

  const form = useForm<CreateEventType>({
    resolver: zodResolver(createEventSchema),
    defaultValues: {
      title: initialData?.title || "",
      summary: initialData?.summary || "",
      content: initialData?.content || "",
      date: initialData?.date ? new Date(initialData.date) : new Date(),
      typeId: initialData?.typeId || 0,
      categoryId: initialData?.categoryId || 0,
      languageId: initialData?.languageId || 0,
      formatId: initialData?.formatId || 0,
      tags: initialData?.tags.map((tag) => tag.id) || [],
      newTags: [],
      faq: initialData?.faq || [],
      agendas: initialData?.agendas || [],
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: EventFormValues) => {
      if (!activeOrganization) throw new Error("No active organization");
      const eventData = {
        ...data,

        startTime: data.startTime ? format(new Date(data.startTime), "HH:mm") : undefined,
        endTime: data.endTime ? format(new Date(data.endTime), "HH:mm") : undefined,
      };

      return createEvent(activeOrganization.id, eventData);
    },
  });

  const updateMediaMutation = useMutation({
    mutationFn: async ({ eventId, mediaData }: { eventId: number; mediaData: FormData }) => {
      if (!activeOrganization) throw new Error("No active organization");
      return updateEventMedia(activeOrganization.id, eventId, mediaData);
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    try {
      const eventResponse = await createEventMutation.mutateAsync(data);
      console.log("Event created successfully:", eventResponse);

      if (data.covers && data.covers.length > 0) {
        const mediaFormData = new FormData();

        data.covers.forEach((file) => {
          mediaFormData.append("covers[]", file);
        });

        if ("video" in data && data.video instanceof File) {
          mediaFormData.append("video", data.video);
        }

        const mediaResponse = await updateMediaMutation.mutateAsync({
          eventId: eventResponse.data.id,
          mediaData: mediaFormData,
        });
        console.log("Media uploaded successfully:", mediaResponse);
      }

      toast.success("Événement créé avec succès");
      console.log("Full form data submitted:", data);
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue lors de la création de l'événement");
    }
  };
  const isLoading = createEventMutation.isPending || updateMediaMutation.isPending;

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
                <Button type="submit" size="lg" disabled={isLoading}>
                  {isLoading ? "Création en cours..." : "Créer l'événement"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
