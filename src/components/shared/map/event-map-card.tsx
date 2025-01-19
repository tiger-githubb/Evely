import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { Event } from "@/types/api/event.type";
import { getImageUrl } from "@/utils/image-utils";
import { MapIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventMapCardProps {
  event: Event;
  userLocation: google.maps.LatLngLiteral | undefined;
  onClose: () => void;
  calculateDistance: (lat1: number, lon1: number, lat2: number, lon2: number) => number;
}

export const EventMapCard = ({ event, userLocation, calculateDistance }: EventMapCardProps) => {
  const coverImage = event.covers && event.covers.length > 0 ? getImageUrl(event.covers[0]) : "/default-event-image.jpg";

  return (
    <div className="max-w-[300px]">
      <div className="relative h-32 w-full mb-2">
        <Image src={coverImage} alt={event.title} fill className="object-cover rounded-t-lg" sizes="(max-width: 300px) 100vw" />
      </div>

      <div className="p-2">
        <h4 className="font-semibold text-lg mb-1 line-clamp-1">{event.title}</h4>
        <p className="text-sm text-gray-600 mb-2">{event.location?.name}</p>

        {userLocation && event.location && (
          <p className="text-xs text-gray-500 mb-2">
            Distance:{" "}
            {calculateDistance(
              userLocation.lat,
              userLocation.lng,
              parseFloat(event.location.lat),
              parseFloat(event.location.long)
            ).toFixed(1)}{" "}
            km
          </p>
        )}

        <div className="flex gap-2">
          {event.location && (
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${event.location.lat},${event.location.long}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button variant="default" className="w-full">
                <MapIcon className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </a>
          )}

          <Link href={routes.events.details(event.slug)} className="flex-1">
            <Button variant="outline" className="w-full">
              Voir détails
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
