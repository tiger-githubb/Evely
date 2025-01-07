import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import React, { useState } from "react";

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
  showViewMore?: boolean;
  initialItemsToShow?: number;
}

export function FilterSection({ title, children, showViewMore = false, initialItemsToShow = 4 }: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const childrenArray = React.Children.toArray(children);
  const hasMore = childrenArray.length > initialItemsToShow;
  const visibleChildren = isExpanded ? childrenArray : childrenArray.slice(0, initialItemsToShow);

  return (
    <div className="rounded-lg border p-4">
      <h4 className="font-semibold mb-3">{title}</h4>
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
