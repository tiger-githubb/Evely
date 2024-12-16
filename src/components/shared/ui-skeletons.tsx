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
                  <Skeleton className="h-8" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function OrganizationDetailsSkeleton() {
  return (
    <div className="space-y-8">
      {/* Cover and Avatar Skeleton */}
      <div className="relative h-48 w-full rounded-xl ">
        <Skeleton className="h-full w-full" />
        <div className="absolute -bottom-16 left-8 ">
          <Skeleton className="h-32 w-32 rounded-full border-4 border-background" />
        </div>
      </div>

      {/* Content Grid */}
      <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="space-y-6 md:col-span-2">
          {/* Organization Name and Date */}
          <div className="space-y-2">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-40" />
          </div>

          {/* About Section */}
          <div className="space-y-3">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full" />
          </div>

          {/* Roles Section */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Stats */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <div className="space-y-3">
              <Skeleton className="h-8 w-full" />
              <Skeleton className="h-8 w-full" />
            </div>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
    </div>
  );
}