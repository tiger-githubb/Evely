import { Skeleton } from "@/components/ui/skeleton";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

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
export function TeamSwitcherSkeleton() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg animate-pulse bg-muted" />
          <div className="grid flex-1 gap-1">
            <div className="h-4 w-24 animate-pulse rounded bg-muted" />
            <div className="h-3 w-16 animate-pulse rounded bg-muted" />
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function EventCardSkeleton() {
  return (
    <div className="group overflow-hidden rounded-lg border transition-all">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Skeleton className="h-full w-full" />
        <div className="absolute top-4 right-4">
          <Skeleton className="h-8 w-16" />
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 text-sm">
          <Skeleton className="h-4 w-4" />
          <Skeleton className="h-4 w-32" />
        </div>
        <div className="mt-2 space-y-2">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>

      <div className="px-6 py-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>

      <div className="px-6 py-4 border-t">
        <div className="flex items-center gap-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-4 w-32" />
        </div>
      </div>
    </div>
  );
}

export function EventGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <EventCardSkeleton key={i} />
      ))}
    </div>
  );
}

// Add this to existing ui-skeletons.tsx
export function SearchFilterSkeleton() {
  return (
    <div className="space-y-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-lg border p-4">
          <Skeleton className="h-6 w-32 mb-3" />
          <div className="space-y-2">
            {[1, 2, 3, 4].map((j) => (
              <div key={j} className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-32" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
