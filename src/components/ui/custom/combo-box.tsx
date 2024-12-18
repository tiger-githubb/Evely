"use client";

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
    <div className="flex flex-col gap-2">
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          className="w-full rounded-md border border-input bg-background px-3 py-2"
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
          <div className="absolute z-50 w-full rounded-md border bg-popover p-2 shadow-md">
            <div className="flex flex-wrap gap-2">
              {filteredOptions.map((option) => (
                <span
                  key={option.value}
                  onClick={() => {
                    onSelect(option);
                    setSearch("");
                    setShowSuggestions(false);
                  }}
                  className="flex cursor-pointer items-center gap-1 rounded-full bg-secondary/50 px-3 py-1 text-sm hover:bg-secondary"
                >
                  {option.label}
                </span>
              ))}
              {onCreateNew && !filteredOptions.length && (
                <span
                  onClick={() => {
                    onCreateNew(search);
                    setSearch("");
                    setShowSuggestions(false);
                  }}
                  className="flex cursor-pointer items-center gap-1 rounded-full bg-primary/20 px-3 py-1 text-sm hover:bg-primary/30"
                >
                  Créer &ldquo;{search}&ldquo;
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {selectedValues.map((value) => (
          <span key={value.value} className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm">
            {value.label}
            <button type="button" onClick={() => onRemove(value.value)} className="text-muted-foreground hover:text-foreground">
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
