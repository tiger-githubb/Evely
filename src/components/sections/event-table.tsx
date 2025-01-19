"use client";

import { Button } from "@/components/ui/button";
import { EVENT_TYPE } from "@/config/constants";
import { fetchPublicEvents } from "@/server/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { isToday, isWeekend } from "date-fns";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { EventCard } from "../shared/sections-ui/event-card";
import { EventGridSkeleton } from "../shared/ui-skeletons";
import { EmptyState, ErrorState } from "../shared/ui-states";
import Section from "../ui/custom/section";

interface Category {
  label: string;
  value: string;
}

export const EventTable = () => {
  const t = useTranslations("HomePage.FilterHomepage");
  const tLogs = useTranslations("Common.Logs");

  const CATEGORIES: Category[] = [
    { label: t("all"), value: "all" },
    { label: t("forYou"), value: "for-you" },
    { label: t("online"), value: "online" },
    { label: t("today"), value: "today" },
    { label: t("weekend"), value: "weekend" },
    { label: t("free"), value: "free" },
    { label: t("music"), value: "music" },
    { label: t("food"), value: "food" },
    { label: t("charity"), value: "charity" },
  ];

  const [categoryFilter, setCategoryFilter] = useState("all");

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["public-events"],
    queryFn: () =>
      fetchPublicEvents({
        startDate: new Date().toISOString(),
      }),
  });

  if (events?.data.length === 0)
    return (
      <Section className="md:my-8">
        <EmptyState title={tLogs("noEventsTitle")} description={tLogs("noEventsDescription")} />
      </Section>
    );

  const filteredEvents = events?.data.filter((event) => {
    if (categoryFilter === "all") return true;

    switch (categoryFilter) {
      case "today":
        return isToday(new Date(event.date));
      case "weekend":
        return isWeekend(new Date(event.date));
      case "free":
        return false;
      case "online":
        return event.type.name === EVENT_TYPE.ONLINE;
      default:
        return event.category.name.toLowerCase() === categoryFilter;
    }
  });

  return (
    <Section className="md:my-8">
      <div className="w-full">
        <div className="flex gap-2 overflow-x-auto pb-8">
          {CATEGORIES.map((category) => (
            <Button
              key={category.value}
              variant={categoryFilter === category.value ? "link" : "ghost"}
              onClick={() => setCategoryFilter(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        {isLoading ? (
          <EventGridSkeleton />
        ) : isError ? (
          <ErrorState description={tLogs("errorState")} variant="xl" />
        ) : filteredEvents?.length === 0 ? (
          <EmptyState title={tLogs("noEventsTitle")} description={tLogs("noEventsDescription")} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents?.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};
