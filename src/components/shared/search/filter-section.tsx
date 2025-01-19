import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import React, { useState } from "react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  showViewMore?: boolean;
  initialItemsToShow?: number;
  hasActiveFilters?: boolean;
  onClear?: () => void;
}

export function FilterSection({
  title,
  children,
  showViewMore = false,
  initialItemsToShow = 4,
  hasActiveFilters = false,
  onClear,
}: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const childrenArray = React.Children.toArray(children);
  const hasMore = childrenArray.length > initialItemsToShow;
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, initialItemsToShow);

  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-semibold">{title}</h4>
        {hasActiveFilters && onClear && (
          <Button variant="ghost" size="sm" onClick={onClear} className="h-8 w-8 p-0">
            <RotateCcw className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="space-y-2">
        {visibleChildren}
        {showViewMore && hasMore && (
          <Button variant="ghost" className="w-full mt-2" onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                View Less
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                View More
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
