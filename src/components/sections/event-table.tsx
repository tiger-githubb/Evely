"use client";

import { Button } from "@/components/ui/button";
import { EVENT_TYPE } from "@/config/constants";
import { fetchEvents } from "@/server/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { isToday, isWeekend } from "date-fns";
import { useState } from "react";
import { EventCard } from "../shared/sections-ui/event-card";
import { EventGridSkeleton } from "../shared/ui-skeletons";
import { EmptyState, ErrorState } from "../shared/ui-states";
import Section from "../ui/custom/section";

interface Category {
  label: string;
  value: string;
}

const CATEGORIES: Category[] = [
  { label: "Tous", value: "all" },
  { label: "Pour vous", value: "for-you" },
  { label: "En ligne", value: "online" },
  { label: "Aujourd'hui", value: "today" },
  { label: "Ce week-end", value: "weekend" },
  { label: "Libre", value: "free" },
  { label: "Musique", value: "music" },
  { label: "Gastronomie", value: "food" },
  { label: "Œuvres de bienfaisance", value: "charity" },
];

export const EventTable = () => {
  const [categoryFilter, setCategoryFilter] = useState("all");

  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  if (events?.data.length === 0)
    return (
      <EmptyState title="Aucun événement trouvé" description="Il n'y a pas d'événements correspondant à vos critères de recherche." />
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
        <div className="flex gap-2 overflow-x-auto pb-4">
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
          <ErrorState description="Une erreur est survenue lors du chargement des événements." variant="xl" />
        ) : filteredEvents?.length === 0 ? (
          <EmptyState
            title="Aucun événement trouvé"
            description="Il n'y a pas d'événements correspondant à vos critères de recherche."
          />
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
