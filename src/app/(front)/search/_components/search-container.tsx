"use client";
import { SearchEventCard } from "@/components/shared/search/search-event-card";
import SearchFilter from "@/components/shared/search/search-filter";
import { SearchMap } from "@/components/shared/search/search-map";
import { EventGridSkeleton } from "@/components/shared/ui-skeletons";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { fetchEvents } from "@/server/services/events.service";
import { Event } from "@/types/api/event.type";
import { FilterIcon, MapIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { useDebounce, useLocalStorage, useMediaQuery } from "@uidotdev/usehooks";

export default function SearchContainer() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [lastSearchParams] = useLocalStorage("lastSearch", {});
  const debouncedSearchParams = useDebounce(lastSearchParams, 500);

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
  }, [debouncedSearchParams]);

  return (
    <div className="container mx-auto p-4">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button onClick={() => setShowMobileFilters(!showMobileFilters)} className="w-full">
          <FilterIcon className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Filters */}
        <div className={`md:col-span-3 ${showMobileFilters ? "fixed inset-0 z-50 bg-white p-4 overflow-y-auto" : "hidden md:block"}`}>
          {showMobileFilters && (
            <Button onClick={() => setShowMobileFilters(false)} className="mb-4 md:hidden">
              <XIcon className="mr-2 h-4 w-4" />
              Close
            </Button>
          )}
          <SearchFilter />
        </div>

        {/* Results and Map Grid */}
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Results */}
            <div className="flex flex-col gap-4">
              {loading ? <EventGridSkeleton /> : events.map((event) => <SearchEventCard key={event.id} event={event} />)}
            </div>

            {/* Desktop Map */}
            {isDesktop && (
              <div className="hidden md:block">
                <SearchMap events={events} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Map Drawer */}
      {!isDesktop && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="fixed left-1/2 -translate-x-1/2 bottom-4 z-50 md:hidden rounded-full shadow-lg size-12">
              <MapIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>Map View</DrawerTitle>
            </DrawerHeader>
            <div className="h-full p-4">
              <SearchMap events={events} />
            </div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
