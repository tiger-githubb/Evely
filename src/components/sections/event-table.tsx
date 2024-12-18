"use client";

import { Button } from "@/components/ui/button";

import { EVENT_TYPE } from "@/config/constants";
import { EventsResponse, fetchEvents } from "@/server/services/events.service";
import { isToday, isWeekend } from "date-fns";
import { useEffect, useState } from "react";
import { EventCard } from "../shared/sections-ui/event-card";
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

  const [events, setEvents] = useState<EventsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      const eventsData = await fetchEvents();
      setEvents(eventsData);
      setLoading(false);
    };
    loadEvents();
  }, []);

  const filteredEvents = events?.data.filter((event) => {
    if (categoryFilter === "all") return true;

    switch (categoryFilter) {
      case "today":
        return isToday(new Date(event.date));
      case "weekend":
        return isWeekend(new Date(event.date));
      case "free":
        return false; // Since we don't have price in Event type, default to false
      case "online":
        return event.type.name === EVENT_TYPE.ONLINE;
      default:
        return event.category.name.toLowerCase() === categoryFilter;
    }
  });

  if (loading) {
    return <div>Chargement des événements...</div>;
  }

  return (
    <Section>
      <div className="w-full">
        <div className="flex gap-2 overflow-x-auto pb-4">
          {CATEGORIES.map((category) => (
            <Button
              key={category.value}
              variant={categoryFilter === category.value ? "default" : "outline"}
              onClick={() => setCategoryFilter(category.value)}
            >
              {category.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents?.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </Section>
  );
};
