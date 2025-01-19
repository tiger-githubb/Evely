"use client";

import { SearchEventCard } from "@/components/shared/search/search-event-card";
import SearchFilter from "@/components/shared/search/search-filter";
import { SearchForm } from "@/components/shared/search/search-form";
import { SearchMap } from "@/components/shared/search/search-map";
import { SearchEventCardSkeleton } from "@/components/shared/ui-skeletons";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { EventsResponse, fetchPublicEvents } from "@/server/services/events.service";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useMediaQuery } from "@uidotdev/usehooks";
import { FilterIcon, MapIcon, RefreshCw, Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

import { useInView } from "react-intersection-observer";

interface SearchContainerProps {
  searchTerm: string;
}

export default function SearchContainerClient({ searchTerm }: SearchContainerProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { ref, inView } = useInView();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const hasActiveFilters = () => {
    return (
      searchParams.has("categories") ||
      searchParams.has("formats") ||
      searchParams.has("types") ||
      searchParams.has("startDate") ||
      searchParams.has("endDate")
    );
  };

  const handleReset = () => {
    const newParams = new URLSearchParams();
    router.push(`/search?${newParams.toString()}`);
    window.dispatchEvent(new CustomEvent("resetFilters"));
  };

  const { data, fetchNextPage, hasNextPage, isLoading } = useInfiniteQuery({
    queryKey: ["events", searchTerm, searchParams.toString()],
    queryFn: ({ pageParam = 1 }) =>
      fetchPublicEvents({
        search: searchTerm,
        currentPage: pageParam,
        ...Object.fromEntries(searchParams.entries()),
      }),
    initialPageParam: 1,
    getNextPageParam: (lastPage: EventsResponse) => (lastPage.page < lastPage.pages ? lastPage.page + 1 : undefined),
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="container mx-auto p-4">
      <div className="md:hidden mb-4 space-y-6">
        <SearchForm />
        <div className="flex gap-2">
          <Drawer>
            <DrawerTrigger asChild>
              <Button className="flex-1">
                <FilterIcon className="mr-2 h-4 w-4" />
                Filters
              </Button>
            </DrawerTrigger>
            <DrawerContent className="h-[90vh]">
              <DrawerHeader className="sticky top-0 z-10 bg-background border-b">
                <DrawerTitle>Filtres</DrawerTitle>
              </DrawerHeader>
              <div className="flex-1 overflow-y-auto px-4">
                <div className="pb-16">
                  {" "}
                  {/* Added padding bottom for visibility */}
                  <SearchFilter />
                  <Button variant="outline" onClick={handleReset} className="w-full mt-4 gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Réinitialiser les filtres
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>

          {hasActiveFilters() && (
            <Button variant="outline" onClick={handleReset} className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Réinitialiser
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="hidden md:block md:col-span-3">
          <SearchFilter />
          <Button variant="outline" onClick={handleReset} className="w-full mt-4 gap-2">
            <RefreshCw className="w-4 h-4" />
            Réinitialiser les filtres
          </Button>
        </div>

        <div className="md:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              {isLoading ? (
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SearchEventCardSkeleton key={i} />
                  ))}
                </div>
              ) : data?.pages[0]?.data.length ? (
                <>
                  {data.pages.map((page, i) => (
                    <div key={i} className="flex flex-col gap-4">
                      {page.data.map((event) => (
                        <SearchEventCard key={event.id} event={event} />
                      ))}
                    </div>
                  ))}
                  <div ref={ref} />
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                  <div className="bg-muted/30 rounded-full p-6 mb-6">
                    <Search className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-2">Aucun événement trouvé</h3>
                  <p className="text-muted-foreground max-w-md mb-6">
                    Nous n&apos;avons trouvé aucun événement correspondant à vos critères. Essayez de modifier vos filtres ou votre
                    recherche.
                  </p>
                  <Button variant="outline" onClick={handleReset} className="gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}
            </div>

            {isDesktop && (
              <div className="hidden md:block">
                <SearchMap events={data?.pages.flatMap((page) => page.data) || []} />
              </div>
            )}
          </div>
        </div>
      </div>

      {!isDesktop && (
        <Dialog>
          <DialogTrigger asChild>
            <Button className="fixed left-1/2 -translate-x-1/2 bottom-4 z-50 md:hidden rounded-full shadow-lg size-12">
              <MapIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="h-[90vh] sm:max-w-[90vw]">
            <DialogHeader>
              <DialogTitle>Carte</DialogTitle>
            </DialogHeader>
            <div className="h-full">
              <SearchMap events={data?.pages.flatMap((page) => page.data) || []} />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
