"use client";

import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchEventCategories } from "@/server/services/event-categories.service";
import { fetchEventFormats } from "@/server/services/event-formats.service";
import { fetchEventTypes } from "@/server/services/event-types.service";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchFilterSkeleton } from "../ui-skeletons";
import { FilterSection } from "./filter-section";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [selectedCategories, setSelectedCategories] = useState<string[]>(searchParams.get("categories")?.split(",") || []);
  const [selectedFormats, setSelectedFormats] = useState<string[]>(searchParams.get("formats")?.split(",") || []);
  const [selectedType, setSelectedType] = useState<string>(searchParams.get("types") || "");
  const [dateFilter, setDateFilter] = useState(searchParams.get("dateFilter") || "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    searchParams.get("date") ? new Date(searchParams.get("date")!) : undefined
  );

  useEffect(() => {
    const handleReset = () => {
      setSelectedCategories([]);
      setSelectedFormats([]);
      setSelectedType("");
      setDateFilter("");
      setSelectedDate(undefined);
    };

    window.addEventListener("resetFilters", handleReset);
    return () => window.removeEventListener("resetFilters", handleReset);
  }, []);

  const { data: categoriesResponse, isLoading: loadingCategories } = useQuery({
    queryKey: ["eventCategories"],
    queryFn: () => fetchEventCategories(),
  });

  const { data: formatsResponse, isLoading: loadingFormats } = useQuery({
    queryKey: ["eventFormats"],
    queryFn: () => fetchEventFormats(),
  });

  const { data: typesResponse, isLoading: loadingTypes } = useQuery({
    queryKey: ["eventTypes"],
    queryFn: () => fetchEventTypes(),
  });

  const isLoading = loadingCategories || loadingFormats || loadingTypes;

  const dateOptions = [
    { value: "today", label: "Today" },
    { value: "tomorrow", label: "Tomorrow" },
    { value: "weekend", label: "This weekend" },
    { value: "week", label: "This week" },
    { value: "nextWeek", label: "Next week" },
    { value: "month", label: "This month" },
    { value: "nextMonth", label: "Next month" },
    { value: "pickDate", label: "Pick a date..." },
  ];

  const handleCalendarSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    const params = new URLSearchParams(searchParams);

    if (date) {
      const formattedDate = date.toISOString().split("T")[0];
      params.set("startDate", formattedDate);
      params.set("endDate", formattedDate);
    } else {
      params.delete("startDate");
      params.delete("endDate");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedCategories.includes(categoryId)) {
      const filtered = selectedCategories.filter((id) => id !== categoryId);
      setSelectedCategories(filtered);
      if (filtered.length === 0) {
        params.delete("categories");
      } else {
        params.set("categories", filtered.join(","));
      }
    } else {
      const newCategories = [...selectedCategories, categoryId];
      setSelectedCategories(newCategories);
      params.set("categories", newCategories.join(","));
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleFormatChange = (formatId: string) => {
    const params = new URLSearchParams(searchParams);

    if (selectedFormats.includes(formatId)) {
      const filtered = selectedFormats.filter((id) => id !== formatId);
      setSelectedFormats(filtered);
      if (filtered.length === 0) {
        params.delete("formats");
      } else {
        params.set("formats", filtered.join(","));
      }
    } else {
      const newFormats = [...selectedFormats, formatId];
      setSelectedFormats(newFormats);
      params.set("formats", newFormats.join(","));
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleTypeChange = (typeId: string) => {
    const params = new URLSearchParams(searchParams);
    setSelectedType(typeId);

    if (typeId) {
      params.set("types", typeId);
    } else {
      params.delete("types");
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleDateChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    setDateFilter(value);

    const today = new Date();
    let startDate: Date | null = null;
    let endDate: Date | null = null;

    switch (value) {
      case "today":
        startDate = today;
        endDate = today;
        break;
      case "tomorrow":
        startDate = new Date(today.setDate(today.getDate() + 1));
        endDate = startDate;
        break;
      case "weekend":
        // Get next Friday if today is after Sunday
        const daysUntilFriday = (5 - today.getDay() + 7) % 7;
        startDate = new Date(today.setDate(today.getDate() + daysUntilFriday));
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 2); // Sunday
        break;
      case "week":
        startDate = today;
        endDate = new Date(today.setDate(today.getDate() + 7));
        break;
      case "nextWeek":
        startDate = new Date(today.setDate(today.getDate() + 7));
        endDate = new Date(startDate);
        endDate.setDate(startDate.getDate() + 7);
        break;
      case "month":
        startDate = today;
        endDate = new Date(today.setMonth(today.getMonth() + 1));
        break;
      case "nextMonth":
        startDate = new Date(today.setMonth(today.getMonth() + 1));
        endDate = new Date(startDate);
        endDate.setMonth(startDate.getMonth() + 1);
        break;
      case "pickDate":
        if (selectedDate) {
          startDate = selectedDate;
          endDate = selectedDate;
        }
        break;
      default:
        params.delete("startDate");
        params.delete("endDate");
        router.push(`${pathname}?${params.toString()}`);
        return;
    }

    if (startDate && endDate) {
      params.set("startDate", startDate.toISOString().split("T")[0]);
      params.set("endDate", endDate.toISOString().split("T")[0]);
    }

    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearCategories = () => {
    const params = new URLSearchParams(searchParams);
    setSelectedCategories([]);
    params.delete("categories");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearFormats = () => {
    const params = new URLSearchParams(searchParams);
    setSelectedFormats([]);
    params.delete("formats");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearType = () => {
    const params = new URLSearchParams(searchParams);
    setSelectedType("");
    params.delete("types");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleClearDate = () => {
    const params = new URLSearchParams(searchParams);
    setDateFilter("");
    setSelectedDate(undefined);
    params.delete("startDate");
    params.delete("endDate");
    params.delete("dateFilter");
    router.push(`${pathname}?${params.toString()}`);
  };

  if (isLoading) {
    return <SearchFilterSkeleton />;
  }

  return (
    <div className="space-y-6">
      <FilterSection title="Categories" showViewMore hasActiveFilters={selectedCategories.length > 0} onClear={handleClearCategories}>
        {categoriesResponse?.data.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={`category-${category.id}`}
              checked={selectedCategories.includes(category.id.toString())}
              onCheckedChange={() => handleCategoryChange(category.id.toString())}
            />
            <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
          </div>
        ))}
      </FilterSection>
      <FilterSection title="Format" showViewMore hasActiveFilters={selectedFormats.length > 0} onClear={handleClearFormats}>
        {formatsResponse?.data.map((format) => (
          <div key={format.id} className="flex items-center space-x-2">
            <Checkbox
              id={`format-${format.id}`}
              checked={selectedFormats.includes(format.id.toString())}
              onCheckedChange={() => handleFormatChange(format.id.toString())}
            />
            <Label htmlFor={`format-${format.id}`}>{format.name}</Label>
          </div>
        ))}
      </FilterSection>
      <FilterSection title="Event Type" hasActiveFilters={!!selectedType} onClear={handleClearType}>
        <RadioGroup value={selectedType} onValueChange={handleTypeChange}>
          {typesResponse?.data.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <RadioGroupItem value={type.id.toString()} id={`type-${type.id}`} />
              <Label htmlFor={`type-${type.id}`}>{type.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>
      <FilterSection title="Date" hasActiveFilters={!!dateFilter} onClear={handleClearDate}>
        <RadioGroup value={dateFilter} onValueChange={handleDateChange}>
          {dateOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>

        {dateFilter === "pickDate" && (
          <Calendar mode="single" selected={selectedDate} onSelect={handleCalendarSelect} className="rounded-md border mt-2" />
        )}
      </FilterSection>
    </div>
  );
}
