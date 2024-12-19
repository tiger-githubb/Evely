import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/types/api/event.type";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { CalendarDays, MapPin } from "lucide-react";
import Image from "next/image";

export function EventHeader({ event }: { event: Event }) {
  return (
    <div className="space-y-6">
      <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
        <Image
          src={event.covers[0]}
          alt={event.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{event.type.name}</Badge>
          <Badge variant="outline">{event.category.name}</Badge>
          <Badge>{event.language.name}</Badge>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">{event.title}</h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(event.date), "PPP à HH:mm", { locale: fr })}</span>
          </div>
          <Separator orientation="vertical" className="hidden sm:block h-4" />
          {event.location && (
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{event.location.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
