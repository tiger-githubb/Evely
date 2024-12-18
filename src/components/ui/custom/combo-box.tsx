"use client";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import * as React from "react";

interface ComboboxProps {
  options: { value: number | string; label: string }[];
  selectedValues: { value: number | string; label: string }[];
  onSelect: (option: { value: number | string; label: string }) => void;
  onRemove: (value: number | string) => void;
  onCreateNew?: (value: string) => void;
  placeholder?: string;
}

export function Combobox({
  options,
  selectedValues,
  onSelect,
  onRemove,
  onCreateNew,
  placeholder = "Saisir des tags...",
}: ComboboxProps) {
  const [search, setSearch] = React.useState("");
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter(
    (option) => option.label.toLowerCase().includes(search.toLowerCase()) && !selectedValues.some((v) => v.value === option.value)
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && search) {
      e.preventDefault();
      const existingOption = options.find((opt) => opt.label.toLowerCase() === search.toLowerCase());

      if (existingOption) {
        onSelect(existingOption);
      } else if (onCreateNew) {
        onCreateNew(search);
      }
      setSearch("");
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Input
          ref={inputRef}
          placeholder={placeholder}
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          onKeyDown={handleKeyDown}
        />

        {showSuggestions && search && (
          <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover p-2 shadow-md">
            <div className="flex flex-wrap gap-1.5">
              {filteredOptions.map((option) => (
                <Badge
                  key={option.value}
                  className="font-medium"
                  variant="suggestion"
                  onClick={() => {
                    onSelect(option);
                    setSearch("");
                    setShowSuggestions(false);
                  }}
                >
                  {option.label}
                </Badge>
              ))}
              {onCreateNew && !filteredOptions.length && (
                <Badge
                  variant="newTag"
                  onClick={() => {
                    onCreateNew(search);
                    setSearch("");
                    setShowSuggestions(false);
                  }}
                >
                  Créer &ldquo;{search}&ldquo;
                </Badge>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {selectedValues.map((value) => (
          <Badge key={value.value} variant="tag" className="flex items-center gap-1  font-medium">
            {value.label}
            <button
              type="button"
              onClick={() => onRemove(value.value)}
              className="ml-1 rounded-full hover:bg-destructive hover:text-destructive-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
    </div>
  );
}
