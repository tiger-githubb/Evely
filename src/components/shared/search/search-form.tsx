"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

interface SearchFormData {
  search: string;
  categories?: string;
  formats?: string;
  languages?: string;
  types?: string;
  ticketTypes?: string;
  startDate?: string;
  endDate?: string;
}

export const SearchForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<SearchFormData>({
    search: searchParams.get("search") || "",
  });

  useEffect(() => {
    const handleReset = () => {
      setFormData({ search: "" });
    };

    window.addEventListener("resetFilters", handleReset);
    return () => window.removeEventListener("resetFilters", handleReset);
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const queryParams = new URLSearchParams(searchParams.toString());

    if (formData.search) {
      queryParams.set("search", formData.search);
    } else {
      queryParams.delete("search");
    }

    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        type="search"
        value={formData.search}
        onChange={(e) => setFormData((prev) => ({ ...prev, search: e.target.value }))}
        placeholder="Search events..."
        className="pl-10 pr-4 py-2 w-full rounded-full border-muted-foreground/20"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
    </form>
  );
};
