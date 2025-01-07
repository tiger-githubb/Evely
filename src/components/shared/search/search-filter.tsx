"use client";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchEventCategories } from "@/server/services/event-categories.service";
import { fetchEventFormats } from "@/server/services/event-formats.service";
import { fetchEventLanguages } from "@/server/services/event-languages.service";
import { fetchEventTags, fetchTopEventTags } from "@/server/services/event-tags.service";
import { fetchEventTypes } from "@/server/services/event-types.service";
import { EventCategory } from "@/types/api/event-category.type";
import { EventFormat } from "@/types/api/event-format.type";
import { EventLanguage } from "@/types/api/event-language.type";
import { EventTag } from "@/types/api/event-tag.type";
import { EventType } from "@/types/api/event-type.type";
import { SearchFilterSkeleton } from "../ui-skeletons";
import { FilterSection } from "./filter-section";

import { useEffect, useState } from "react";

export default function SearchFilter() {
  const [categories, setCategories] = useState<EventCategory[]>([]);
  const [formats, setFormats] = useState<EventFormat[]>([]);
  const [languages, setLanguages] = useState<EventLanguage[]>([]);
  const [types, setTypes] = useState<EventType[]>([]);

  const [topTags, setTopTags] = useState<EventTag[]>([]);
  const [dateFilter, setDateFilter] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const [categoriesResponse, formatsResponse, languagesResponse, typesResponse, topTagsResponse] = await Promise.all([
          fetchEventCategories(),
          fetchEventFormats(),
          fetchEventLanguages(),
          fetchEventTypes(),
          fetchEventTags(),
          fetchTopEventTags(),
        ]);

        setCategories(categoriesResponse.data);
        setFormats(formatsResponse.data);
        setLanguages(languagesResponse.data);
        setTypes(typesResponse.data);
        setTopTags(topTagsResponse.data);
      } catch (error) {
        console.error("Error fetching filter data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiltersData();
  }, []);

  if (loading) {
    return <SearchFilterSkeleton />;
  }

  return (
    <div className="space-y-6">
      <FilterSection title="Categories" showViewMore>
        {categories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox id={`category-${category.id}`} />
            <Label htmlFor={`category-${category.id}`}>{category.name}</Label>
          </div>
        ))}
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

      <FilterSection title="Event Type">
        <RadioGroup>
          {types.map((type) => (
            <div key={type.id} className="flex items-center space-x-2">
              <RadioGroupItem value={type.id.toString()} id={`type-${type.id}`} />
              <Label htmlFor={`type-${type.id}`}>{type.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>

      <FilterSection title="Format" showViewMore>
        {formats.map((format) => (
          <div key={format.id} className="flex items-center space-x-2">
            <Checkbox id={`format-${format.id}`} />
            <Label htmlFor={`format-${format.id}`}>{format.name}</Label>
          </div>
        ))}
      </FilterSection>

      <FilterSection title="Language">
        <RadioGroup>
          {languages.map((language) => (
            <div key={language.id} className="flex items-center space-x-2">
              <RadioGroupItem value={language.id.toString()} id={`language-${language.id}`} />
              <Label htmlFor={`language-${language.id}`}>{language.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </FilterSection>

      <FilterSection title="Popular Tags" showViewMore>
        {topTags.map((tag) => (
          <div key={tag.id} className="flex items-center space-x-2">
            <Checkbox id={`tag-${tag.id}`} />
            <Label htmlFor={`tag-${tag.id}`}>{tag.name}</Label>
          </div>
        ))}
      </FilterSection>
    </div>
  );
}
