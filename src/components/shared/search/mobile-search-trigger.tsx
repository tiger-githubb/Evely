"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useState } from "react";
import { SearchForm } from "./search-form";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose } from "@/components/ui/sheet";

export const MobileSearchTrigger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Search className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="w-full h-[120px] p-4 pt-8 border-b">
        <SheetTitle className="sr-only">Search Events</SheetTitle>
        <div className="relative w-full max-w-2xl mx-auto space-y-4">
          <SheetClose className="absolute right-2 top-1/2 -translate-y-1/2" />
          <SearchForm />
        </div>
      </SheetContent>
    </Sheet>
  );
};
