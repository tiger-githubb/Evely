"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { createEventSchema, CreateEventType } from "@/schemas/event.schema";
import { createEvent, updateEvent, updateEventMedia } from "@/server/services/events.service";
import { useOrganizationStore } from "@/stores/organization-store";
import { Event } from "@/types/api/event.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import AgendaSection from "./agenda-section";
import BasicInfoSection from "./basic-info-section";
import CategoriesSection from "./categories-section";
import DateTimeSection from "./date-time-section";
import FAQSection from "./faq-section";
import LocationSection from "./location-section";
import MediaSection from "./media-section";
import TagsSection from "./tags-section";

interface EventFormProps {
  initialData?: Event;
}

export default function EventForm({ initialData }: EventFormProps) {
  const t = useTranslations("eventForm");
  const { activeOrganization } = useOrganizationStore();

  const form = useForm<CreateEventType>({
    resolver: zodResolver(createEventSchema(t).create),
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
      videoUrl: initialData?.videoUrl || "",
      covers: [],
    },
  });

  const createEventMutation = useMutation({
    mutationFn: async (data: CreateEventType) => {
      if (!activeOrganization) throw new Error(t("errors.noOrganization"));
      const eventData = {
        ...data,
        startTime: data.startTime ? format(new Date(data.startTime), "HH:mm") : undefined,
        endTime: data.endTime ? format(new Date(data.endTime), "HH:mm") : undefined,
      };
      return createEvent(activeOrganization.id, eventData);
    },
  });

  const updateEventMutation = useMutation({
    mutationFn: async ({ eventId, data }: { eventId: number; data: CreateEventType }) => {
      if (!activeOrganization) throw new Error(t("errors.noOrganization"));
      const eventData = {
        ...data,
        startTime: data.startTime ? format(new Date(data.startTime), "HH:mm") : undefined,
        endTime: data.endTime ? format(new Date(data.endTime), "HH:mm") : undefined,
      };
      return updateEvent(activeOrganization.id, eventId, eventData);
    },
  });

  const updateMediaMutation = useMutation({
    mutationFn: async ({ eventId, mediaData }: { eventId: number; mediaData: FormData }) => {
      if (!activeOrganization) throw new Error(t("errors.noOrganization"));
      return updateEventMedia(activeOrganization.id, eventId, mediaData);
    },
  });

  const onSubmit = async (data: CreateEventType) => {
    if (!activeOrganization) {
      toast.error(t("errors.noOrganization"));
      return;
    }

    try {
      let eventId = initialData?.id;
      let eventResponse;

      if (eventId) {
        eventResponse = await updateEventMutation.mutateAsync({ eventId, data });
        toast.success(t("success.update"));
      } else {
        eventResponse = await createEventMutation.mutateAsync(data);
        toast.success(t("success.create"));
        eventId = eventResponse.data.id;
      }

      if (data.covers && data.covers.length > 0) {
        const mediaFormData = new FormData();
        data.covers.forEach((file) => {
          if (file instanceof File) {
            mediaFormData.append("covers[]", file);
          }
        });

        await updateMediaMutation.mutateAsync({
          eventId: eventId!,
          mediaData: mediaFormData,
        });

        toast.success(t("success.mediaUpload"));
      }

      console.log("Form data submitted:", data);
    } catch (err) {
      console.error("Error submitting event:", err);
      toast.error(t("errors.submit"));
    }
  };

  const isLoading = createEventMutation.status === "pending" || updateMediaMutation.status === "pending";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full md:w-[60%]">
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
                  {isLoading
                    ? initialData
                      ? t("updatingEvent")
                      : t("creatingEvent")
                    : initialData
                    ? t("actions.update")
                    : t("actions.create")}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
