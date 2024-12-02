"use client";

import { Button } from "@/components/ui/button";
import { generateEvents } from "@/config/data";
import { isToday, isWeekend } from "date-fns";
import { useState } from "react";
import { EventCard } from "../shared/sections-ui/event-card";

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
  const eventsData = generateEvents(10);
  const filteredEvents = eventsData.filter((event) => {
    if (categoryFilter === "all") return true;

    switch (categoryFilter) {
      case "today":
        return isToday(event.date);
      case "weekend":
        return isWeekend(event.date);
      case "free":
        return event.price === 0;
      case "online":
        return event.location === "En ligne";
      default:
        return event.category.toLowerCase() === categoryFilter;
    }
  });

  return (
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
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};
