import { Skeleton } from "@/components/ui/skeleton";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
}

export function TableSkeleton({ columns = 5, rows = 5 }: TableSkeletonProps) {
  return (
    <div className="w-full">
      <div className="rounded-md border">
        <div className="border-b">
          <div className="flex">
            {Array.from({ length: columns }).map((_, i) => (
              <div key={i} className="p-2 w-full">
                <Skeleton className="h-6" />
              </div>
            ))}
          </div>
        </div>
        <div>
          {Array.from({ length: rows }).map((_, i) => (
            <div key={i} className="flex border-b last:border-0">
              {Array.from({ length: columns }).map((_, j) => (
                <div key={j} className="p-2 w-full">
                  <Skeleton className="h-4" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
