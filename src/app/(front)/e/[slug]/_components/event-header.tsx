import { Event } from "@/types/api/event.type";
import Image from "next/image";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, MapPin } from "lucide-react";

export function EventHeader({ event }: { event: Event }) {
  return (
    <div className="space-y-4">
      <div className="relative aspect-video overflow-hidden rounded-xl">
        <Image src={event.covers[0]} alt={event.title} fill className="object-cover" />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">{event.title}</h1>
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(event.date), "PPP", { locale: fr })}</span>
          </div>
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
