"use client";

import { SearchEventCard } from "@/components/shared/search/search-event-card";
import SearchFilter from "@/components/shared/search/search-filter";

import { SearchMap } from "@/components/shared/search/search-map";
import { SearchEventCardSkeleton } from "@/components/shared/ui-skeletons";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { fetchPublicEvents } from "@/server/services/events.service";
import { Event } from "@/types/api/event.type";


interface SearchContainerProps {
  searchTerm: string;
}

export default function SearchContainer({ searchTerm }: SearchContainerProps) {
    const t = useTranslations();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const queryClient = useQueryClient();

  const handleReset = () => {
    const newParams = new URLSearchParams();
    router.push(`/search?${newParams.toString()}`);
    queryClient.invalidateQueries({ queryKey: ["events"] });
    // Emit a custom event to notify other components
    window.dispatchEvent(new CustomEvent("resetFilters"));
  };
  useEffect(() => {
    const loadEvents = async () => {
      setLoading(true);
      try {
        const params = {
          search: searchTerm,
          categories: searchParams.get("categories") || undefined,
          formats: searchParams.get("formats") || undefined,
          types: searchParams.get("types") || undefined,
          languages: searchParams.get("languages") || undefined,
          ticketTypes: searchParams.get("ticketTypes") || undefined,
          startDate: searchParams.get("startDate") || undefined,
          endDate: searchParams.get("endDate") || undefined,
        };

        const response = await fetchPublicEvents(params);
        setEvents(response.data);
      } catch (error) {
        console.error(t("search.error"), error);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();

  }, [searchTerm, searchParams]);

  return (
    <div className="container mx-auto p-4">
      <div className="md:hidden mb-4">
        <Button onClick={() => setShowMobileFilters(!showMobileFilters)} className="w-full">
          <FilterIcon className="mr-2 h-4 w-4" />
          {t("filters.filters")}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className={`md:col-span-3 ${showMobileFilters ? "fixed inset-0 z-50 bg-white p-4 overflow-y-auto" : "hidden md:block"}`}>
          {showMobileFilters && (
            <Button onClick={() => setShowMobileFilters(false)} className="mb-4 md:hidden">
              <XIcon className="mr-2 h-4 w-4" />
              {t("filters.close")}
            </Button>
          )}
          <SearchFilter />
        </div>

        <div className="md:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              {loading ? (
                <div className="flex flex-col gap-4">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <SearchEventCardSkeleton key={i} />
                  ))}
                </div>
              ) : events.length > 0 ? (
                events.map((event) => <SearchEventCard key={event.id} event={event} />)
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
                <SearchMap events={events} />
              </div>
            )}
          </div>
        </div>
      </div>

      {!isDesktop && (
        <Drawer>
          <DrawerTrigger asChild>
            <Button className="fixed left-1/2 -translate-x-1/2 bottom-4 z-50 md:hidden rounded-full shadow-lg size-12">
              <MapIcon />
            </Button>
          </DrawerTrigger>
          <DrawerContent className="h-[90vh]">
            <DrawerHeader>
              <DrawerTitle>{t("map.map_view")}</DrawerTitle>
            </DrawerHeader>
            <div className="h-full p-4">{/* <SearchMap events={events} /> */}</div>
          </DrawerContent>
        </Drawer>
      )}
    </div>
  );
}
