"use client";
import { SearchEventCard } from "@/components/shared/search/event-card";
import SearchFilter from "@/components/shared/search/search-filter";
import { SearchMap } from "@/components/shared/search/search-map";
import { EventGridSkeleton } from "@/components/shared/ui-skeletons";
import { fetchEvents } from "@/server/services/events.service";
import { Event } from "@/types/api/event.type";
import { useEffect, useState } from "react";

export default function SearchContainer() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const response = await fetchEvents();
        setEvents(response.data);
      } catch (error) {
        console.error("Error loading events:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      <div className="md:col-span-3">
        <SearchFilter />
      </div>
      <div className="md:col-span-5">
        {loading ? (
          <EventGridSkeleton />
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <SearchEventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
      <div className="md:col-span-4">
        <SearchMap events={events} />
      </div>
    </div>
  );
}
