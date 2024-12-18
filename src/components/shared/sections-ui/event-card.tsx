import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event } from "@/types/api/event.type";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getImageUrl } from "@/utils/image-utils";

interface EventCardProps {
  event: Event;
}

const gradients = [
  "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500",
  "bg-gradient-to-r from-green-300 via-blue-500 to-purple-600",
  "bg-gradient-to-r from-indigo-300 to-purple-400",
  "bg-gradient-to-r from-green-200 to-green-500",
  "bg-gradient-to-r from-blue-400 to-emerald-400",
];

export const EventCard = ({ event }: EventCardProps) => {
  const coverImage = event.covers[0] ? getImageUrl(event.covers[0]) : "";
  const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
  const organizationLogo = getImageUrl(event.organization.logo) || "/placeholder-avatar.jpg";

  return (
    <Link href={`/evenements/${event.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[16/9] overflow-hidden">
          {coverImage ? (
            <Image src={coverImage} alt={event.title} fill className="object-cover transition-transform group-hover:scale-105" />
          ) : (
            <div className={`w-full h-full ${randomGradient}`} />
          )}
          <div className="absolute top-4 right-4">
            <Button size="sm" variant="secondary" className="font-medium">
              Gratuit
            </Button>
          </div>
        </div>

        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{format(new Date(event.date), "PPP", { locale: fr })}</span>
          </div>
          <CardTitle className="line-clamp-1">{event.title}</CardTitle>
          <CardDescription className="line-clamp-2">{event.summary}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            {event.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span className="line-clamp-1">{event.location.name}</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>0 participants</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-4">
          <div className="flex items-center gap-2">
            <Image src={organizationLogo} alt={event.organization.name} width={24} height={24} className="rounded-full" />
            <span className="text-sm text-muted-foreground">{event.organization.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
