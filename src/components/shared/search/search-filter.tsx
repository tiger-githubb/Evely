"use client";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchEventCategories } from "@/server/services/event-categories.service";
import { fetchEventFormats } from "@/server/services/event-formats.service";
import { fetchEventTypes } from "@/server/services/event-types.service";
import { EventCategory } from "@/types/api/event-category.type";
import { EventFormat } from "@/types/api/event-format.type";
import { EventType } from "@/types/api/event-type.type";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SearchFilterSkeleton } from "../ui-skeletons";
import { FilterSection } from "./filter-section";

export default function SearchFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [formats, setFormats] = useState<EventFormat[]>([]);
  const [types, setTypes] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");

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

  const [dateFilter, setDateFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [categoriesResponse, formatsResponse, typesResponse] = await Promise.all([
          fetchEventCategories(),
          fetchEventFormats(),
          fetchEventTypes(),
        ]);

        setCategories(categoriesResponse.data);
        setFormats(formatsResponse.data);
        setTypes(typesResponse.data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltersData();
  }, []);

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

  if (loading) {
    return <SearchFilterSkeleton />;
  }

  return (
    <div className="space-y-6">
      <FilterSection title="Categories" showViewMore>
        {categories.map((category) => (
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

      <FilterSection title="Format" showViewMore>
        {formats.map((format) => (
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

      <FilterSection title="Event Type">
        <RadioGroup value={selectedType} onValueChange={handleTypeChange}>
          {types.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <RadioGroupItem value={type.id.toString()} id={`type-${type.id}`} />
              <Label htmlFor={`type-${type.id}`}>{type.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>

      <FilterSection title="Date">
        <RadioGroup value={dateFilter} onValueChange={setDateFilter}>
          {dateOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <RadioGroupItem value={option.value} id={option.value} />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>

        {dateFilter === "pickDate" && (
          <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} className="rounded-md border mt-2" />
        )}
      </FilterSection>
    </div>
  );
}
