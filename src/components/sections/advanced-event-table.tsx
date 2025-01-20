"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { fetchEventCategories } from "@/server/services/event-categories.service";
import { fetchPublicEvents } from "@/server/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { addDays, endOfWeek, startOfWeek } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { useEffect, useRef, useState } from "react";
import { EventCard } from "../shared/sections-ui/event-card";
import { EventGridSkeleton } from "../shared/ui-skeletons";
import { EmptyState, ErrorState } from "../shared/ui-states";
import Section from "../ui/custom/section";

const DATE_FILTERS = {
  ALL: "all", // New default option
  TODAY: "today",
  TOMORROW: "tomorrow",
  WEEKEND: "weekend",
  NEXT_MONTH: "next_month",
};
export const AdvancedEventTable = () => {
  const t = useTranslations("HomePage.FilterHomepage");
  const tLogs = useTranslations("Common.Logs");
  const categoriesRef = useRef<HTMLDivElement>(null);
  const [dateFilter, setDateFilter] = useState(DATE_FILTERS.ALL);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  // Fetch categories
  const { data: categories } = useQuery({
    queryKey: ["event-categories"],
    queryFn: fetchEventCategories,
  });

  // Calculate date ranges based on filter
  const getDateRange = () => {
    const today = new Date();

    switch (dateFilter) {
      case DATE_FILTERS.ALL:
        return {
          startDate: today.toISOString(),
          endDate: addDays(today, 365).toISOString(), // Or any future date
        };
      case DATE_FILTERS.TODAY:
        return {
          startDate: today.toISOString(),
          endDate: today.toISOString(),
        };
      case DATE_FILTERS.TOMORROW:
        const tomorrow = addDays(today, 1);
        return {
          startDate: tomorrow.toISOString(),
          endDate: tomorrow.toISOString(),
        };
      case DATE_FILTERS.WEEKEND:
        return {
          startDate: startOfWeek(today).toISOString(),
          endDate: endOfWeek(today).toISOString(),
        };
      case DATE_FILTERS.NEXT_MONTH:
        return {
          startDate: today.toISOString(),
          endDate: addDays(today, 30).toISOString(),
        };
      default:
        return {
          startDate: today.toISOString(),
          endDate: addDays(today, 365).toISOString(),
        };
    }
  };

  // Fetch events with filters
  const {
    data: events,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["public-events", dateFilter, selectedCategory],
    queryFn: () => {
      const { startDate, endDate } = getDateRange();
      return fetchPublicEvents({
        startDate,
        endDate,
        categories: selectedCategory !== "all" ? selectedCategory : undefined,
      });
    },
  });

  // Scroll handlers for categories
  const scroll = (direction: "left" | "right") => {
    if (categoriesRef.current) {
      const scrollAmount = 400;
      categoriesRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const checkScroll = () => {
    if (categoriesRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = categoriesRef.current;
      setShowLeftButton(scrollLeft > 0);

      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 20); // Added small buffer
    }
  };

  useEffect(() => {
    const currentRef = categoriesRef.current;
    if (currentRef) {
      checkScroll();
      currentRef.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      }
    };
  }, []);

  return (
    <Section className="md:my-8 mb-12">
      <div className="w-full space-y-6">
        <div className="bg-muted/30 rounded-lg p-4 sticky top-0 z-50">
          <div className="flex items-center gap-4 w-full">
            {/* Date Filter - Fixed width */}
            <div className="w-[180px] flex-shrink-0">
              <Select value={dateFilter} onValueChange={setDateFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={DATE_FILTERS.ALL}>Select a date</SelectItem>
                  <SelectItem value={DATE_FILTERS.TODAY}>Today</SelectItem>
                  <SelectItem value={DATE_FILTERS.TOMORROW}>Tomorrow</SelectItem>
                  <SelectItem value={DATE_FILTERS.WEEKEND}>This Weekend</SelectItem>
                  <SelectItem value={DATE_FILTERS.NEXT_MONTH}>Next 30 Days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-border flex-shrink-0"></div>

            {/* Categories Section */}
            <div className="flex-1 relative overflow-hidden">
              {" "}
              {/* Added overflow-hidden */}
              <div className="flex items-center">
                {showLeftButton && (
                  <Button size="icon" variant="ghost" onClick={() => scroll("left")} className="flex-shrink-0 z-10 bg-muted/30">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                )}

                <div
                  ref={categoriesRef}
                  className="flex gap-3 overflow-x-auto scrollbar-hide px-2 mx-2 scroll-smooth flex-1 no-scrollbar" // Added no-scrollbar
                  style={{
                    maskImage: "linear-gradient(to right, transparent, black 20px, black 90%, transparent)",
                    WebkitMaskImage: "linear-gradient(to right, transparent, black 20px, black 90%, transparent)",
                  }}
                >
                  <div className="flex gap-3 py-1 flex-nowrap">
                    {" "}
                    {/* Added flex-nowrap */}
                    <Button
                      variant={selectedCategory === "all" ? "default" : "outline"}
                      onClick={() => setSelectedCategory("all")}
                      className="rounded-full px-6 transition-all duration-300 hover:scale-105 flex-shrink-0 overflow-hidden"
                    >
                      {t("all")}
                    </Button>
                    {categories?.data.map((category) => (
                      <Button
                        key={category.id}
                        variant={selectedCategory === category.id.toString() ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category.id.toString())}
                        className="rounded-full px-6 transition-all duration-300 hover:scale-105 whitespace-nowrap flex-shrink-0"
                      >
                        {category.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {showRightButton && (
                  <Button size="icon" variant="ghost" onClick={() => scroll("right")} className="flex-shrink-0 z-10 bg-muted/30">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Events Display Section */}
        {isLoading ? (
          <EventGridSkeleton />
        ) : isError ? (
          <ErrorState description={tLogs("errorState")} variant="xl" />
        ) : events?.data.length === 0 ? (
          <EmptyState title={tLogs("noEventsTitle")} description={tLogs("noEventsDescription")} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events?.data.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </Section>
  );
};
