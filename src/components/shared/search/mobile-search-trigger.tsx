"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Search } from "lucide-react";
import { useState } from "react";
import { SearchForm } from "./search-form";

export const MobileSearchTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchComplete = () => {
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Search className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="w-full h-[120px] p-4 pt-8 border-b">
        <SheetTitle className="sr-only">Search Events</SheetTitle>
        <div className="relative w-full max-w-2xl mx-auto">
          <SearchForm onSearchComplete={handleSearchComplete} />
        </div>
      </SheetContent>
    </Sheet>
  );
};
