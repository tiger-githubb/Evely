"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Search, X } from "lucide-react";
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

interface SearchFormProps {
  onSearchComplete?: () => void;
}

export const SearchForm = ({ onSearchComplete }: SearchFormProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const queryParams = new URLSearchParams(searchParams.toString());

    if (formData.search) {
      queryParams.set("search", formData.search);
    } else {
      queryParams.delete("search");
    }

    try {
      await router.push(`/search?${queryParams.toString()}`);
      onSearchComplete?.();
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    const queryParams = new URLSearchParams(searchParams.toString());
    queryParams.delete("search");
    setFormData((prev) => ({ ...prev, search: "" }));
    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <Input
        value={formData.search}
        onChange={(e) => setFormData((prev) => ({ ...prev, search: e.target.value }))}
        placeholder="Search events..."
        className="pl-10 pr-12 py-2 w-full rounded-full border-muted-foreground/20"
      />
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

      {formData.search && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 hover:bg-transparent"
          onClick={handleClear}
        >
          <X className="h-4 w-4" />
        </Button>
      )}

      {isLoading && <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin" />}
    </form>
  );
};
