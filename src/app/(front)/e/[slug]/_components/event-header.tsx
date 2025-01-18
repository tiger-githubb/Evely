import { Badge } from "@/components/ui/badge";
import { JSX } from "react";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/types/api/event.type";
import { getImageUrl } from "@/utils/image-utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale/fr";
import { CalendarDays, Globe, MapPin, MapPinIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { routes } from "@/config/routes";
import { ShareButton } from "@/components/shared/ui/share-button";
import { FollowButton } from "@/components/shared/ui/follow-button";

export function EventHeader({ event }: { event: Event }) {
  // Define icons for event types
  const eventTypeIcons: { [key: number]: JSX.Element } = {
    1: <MapPinIcon className="h-4 w-4" />, // MapPin for "Presentiel"
    2: <Globe className="h-4 w-4" />, // Globe for "En ligne"
  };
  const isFollowing = false; // Replace with actual logic to determine if the user is following

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
        <div className="flex flex-wrap gap-2 items-center justify-between">
          <div className="flex flex-row gap-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                <span>
                  {format(new Date(event.date), "PPP à HH:mm", { locale: fr })}
                </span>
              </div>
              <Separator
                orientation="vertical"
                className="hidden sm:block h-4"
              />
              {event.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{event.location.name}</span>
                </div>
              )}
            </div>

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
          <div>
            <ShareButton organizationName={event.organization.name} />
          </div>
        </div>

        <div>
          <h1 className="text-4xl font-bold tracking-tight">{event.title}</h1>
        </div>

        <div className="flex flex-row items-center gap-8">
          <Link href={routes.organizations.details(event.organization.slug)}>
            <div className="flex items-center gap-4 hover:opacity-80 transition">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={event.organization.logo}
                  alt={event.organization.name}
                />
                <AvatarFallback>{event.organization.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{event.organization.name}</p>
                <p>
                  {[
                    event.organization._count?.followers &&
                      `${event.organization._count.followers} followers`,
                    event.organization._count?.events &&
                      `${event.organization._count.events} événements`,
                  ]
                    .filter(Boolean)
                    .join(" • ")}
                </p>
              </div>
            </div>
          </Link>

          <FollowButton
            organizationId={event.organization.id.toString()}
            isFollowing={isFollowing}
          />
        </div>
      </div>
    </div>
  );
}
