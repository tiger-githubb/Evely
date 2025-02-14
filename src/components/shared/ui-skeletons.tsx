import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";
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
    </div>
  );
}

// export function EventGridSkeleton() {
//   return (
//     <div className="flex flex-col gap-4">
//       {Array.from({ length: 6 }).map((_, i) => (
//         <div key={i} className="h-32 rounded-lg border overflow-hidden">
//           <div className="flex h-full">
//             <div className="w-32 h-full">
//               <Skeleton className="h-full" />
//             </div>

//             <div className="flex-1 p-4 space-y-4">
//               <div className="flex items-center gap-2">
//                 <Skeleton className="h-4 w-4" />
//                 <Skeleton className="h-4 w-32" />
//               </div>

//               <Skeleton className="h-6 w-3/4" />

//               <div className="flex items-center gap-2">
//                 <Skeleton className="h-4 w-4" />
//                 <Skeleton className="h-4 w-40" />
//               </div>

//               <div className="flex items-center gap-2">
//                 <Skeleton className="h-6 w-6 rounded-full" />
//                 <Skeleton className="h-4 w-32" />
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
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

export function TicketCardSkeleton() {
  return (
    <div className="rounded-lg border p-4 space-y-4">
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/2" />
        <Skeleton className="h-4 w-6" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-3/4" />
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-16" />
      </div>
      <div className="flex justify-between items-center">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-12" />
      </div>
    </div>
  );
}

export function TicketGridSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {Array.from({ length: 6 }).map((_, i) => (
        <TicketCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function TicketsSkeleton() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-4">
              <div className="flex justify-between items-center">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-20" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </Card>
          ))}
        </CardContent>
      </Card>
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

export function PaymentFormSkeleton() {
  return (
    <div className="grid h-[90vh] lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Skeleton className="h-full w-full" />
      </div>

      <div className="flex flex-col p-6 md:p-10">
        <div className="flex items-center gap-2 mb-8">
          <Skeleton className="h-5 w-5" />
          <Skeleton className="h-4 w-16" />
        </div>

        <Skeleton className="h-8 w-64 mb-6" />

        <div className="flex flex-col gap-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-6">
              <div className="flex items-center gap-6">
                <Skeleton className="h-10 w-10" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-64" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="mt-auto pt-8 text-center">
          <Skeleton className="h-4 w-96 mx-auto" />
        </div>
      </div>
    </div>
  );
}

export function PaymentMethodsSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <Card key={i} className="p-6">
          <div className="flex items-center gap-6">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-64" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

export function SearchEventCardSkeleton() {
  return (
    <div className="h-32 rounded-lg border overflow-hidden">
      <div className="flex h-full">
        <div className="w-32 h-full">
          <Skeleton className="h-full" />
        </div>

        <div className="flex-1 p-4 space-y-4">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-32" />
          </div>

          <Skeleton className="h-6 w-3/4" />

          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-4" />
            <Skeleton className="h-4 w-40" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
