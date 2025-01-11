"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createEventSchema } from "@/schemas/event.schema";
import { createEvent, updateEvent, updateEventMedia } from "@/server/services/events.service";
import { useOrganizationStore } from "@/stores/organization-store";
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
  event?: EventFormValues & { id: number }; // Add optional `event` prop for editing
}

export default function EventForm({ event }: EventFormProps) {
  const { activeOrganization } = useOrganizationStore();

  const form = useForm<EventFormValues>({
    resolver: zodResolver(createEventSchema),
    defaultValues: event
      ? {
        ...event,
        date: event.date ? new Date(event.date) : undefined, // Convert back to Date object
        startTime: event.startTime ? `1970-01-01T${event.startTime}` : undefined, // Convert HH:mm to ISO string
        endTime: event.endTime ? `1970-01-01T${event.endTime}` : undefined,     // Convert HH:mm to ISO string
      }
    : {
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

  const createEventMutation = useMutation({
    mutationFn: async (data: EventFormValues) => {
      if (!activeOrganization) throw new Error("No active organization");
      const eventData = {
        ...data,
        startTime: data.startTime ? format(new Date(data.startTime), "HH:mm") : undefined,
        endTime: data.endTime ? format(new Date(data.endTime), "HH:mm") : undefined,
      };

      return createEvent(String(activeOrganization.slug), eventData);
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: async (data: EventFormValues) => {
      console.log("Updating event with data:", data); 

      if (!activeOrganization || !event) throw new Error("No active organization or event");
      const eventData = {
        ...data,
        startTime: data.startTime ? format(new Date(data.startTime), "HH:mm") : undefined,
        endTime: data.endTime ? format(new Date(data.endTime), "HH:mm") : undefined,
      };

      return updateEvent(String(activeOrganization.slug), event.id, eventData);
    },
  });

  const updateMediaMutation = useMutation({
    mutationFn: async ({ eventId, mediaData }: { eventId: number; mediaData: FormData }) => {
      if (!activeOrganization) throw new Error("No active organization");
      return updateEventMedia(String(activeOrganization.id), eventId, mediaData);
    },
  });

  const onSubmit = async (data: EventFormValues) => {
    console.log("Form data submitted:", data); // Add this

    try {
      const mutation = event ? updateEventMutation : createEventMutation;
      const eventResponse = await mutation.mutateAsync(data);
      console.log("Event successfully submitted:", eventResponse);

      if (data.covers && data.covers.length > 0) {
        const mediaFormData = new FormData();

        data.covers.forEach((file) => {
          mediaFormData.append("covers[]", file);
        });

        if (data.video instanceof File) {
          mediaFormData.append("video", data.video);
        }

        const mediaResponse = await updateMediaMutation.mutateAsync({
          eventId: event ? event.id : eventResponse.data.id,
          mediaData: mediaFormData,
        });
        console.log("Media uploaded successfully:", mediaResponse);
      }

      toast.success(`Événement ${event ? "modifié" : "créé"} avec succès`);
    } catch (err) {
      console.error(err);
      toast.error("Une erreur est survenue lors du traitement de l'événement");
    }
  };

  const isLoading =
    createEventMutation.isPending || updateEventMutation.isPending || updateMediaMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-w-3xl mx-auto">
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
                  {isLoading ? "En traitement..." : event ? "Modifier l'événement" : "Créer l'événement"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
