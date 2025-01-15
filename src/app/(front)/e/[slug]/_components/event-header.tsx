import { Badge } from "@/components/ui/badge";
import { JSX } from "react";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/types/api/event.type";
import { getImageUrl } from "@/utils/image-utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { CalendarDays, Globe, MapPin, MapPinIcon } from "lucide-react";
import Image from "next/image";

export function EventHeader({ event }: { event: Event }) {
  // Define icons for event types
  const eventTypeIcons: { [key: number]: JSX.Element } = {
    1: <MapPinIcon className="h-4 w-4" />, // MapPin for "Presentiel"
    2: <Globe className="h-4 w-4" />, // Globe for "En ligne"
  };
  return (
    <div className="space-y-6">
      <div className="relative aspect-[21/9] overflow-hidden rounded-xl">
        <Image
          src={getImageUrl(event.covers?.[0]) || "/placeholder-image.png"}
          alt={event.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          priority
        />
      </div>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            {eventTypeIcons[event.type.id]}
            {event.type.name}
          </Badge>

          {/* Event Category Badge */}
          <Badge variant="outline">{event.category.name}</Badge>

          {/* Language as plain text (not a badge) */}
          {event.language?.name && (
            <span className="text-sm text-muted-foreground">
              {event.language.name}
            </span>
          )}
        </div>

        <h1 className="text-4xl font-bold tracking-tight">{event.title}</h1>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            <span>
              {format(new Date(event.date), "PPP à HH:mm", { locale: fr })}
            </span>
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
