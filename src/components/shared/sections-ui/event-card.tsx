import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { EventType } from "@/types/api/event.type";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { CalendarDays, MapPin, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface EventCardProps {
  event: EventType;
}

export const EventCard = ({ event }: EventCardProps) => {
  return (
    <Link href={`/evenements/${event.id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg">
        <div className="relative aspect-[16/9] overflow-hidden">
          <Image src={event.image} alt={event.title} fill className="object-cover transition-transform group-hover:scale-105" />{" "}
          <div className="absolute top-4 right-4">
            <Button size="sm" variant="secondary" className="font-medium">
              {event.price === 0 ? "Gratuit" : `${event.price}€`}
            </Button>
          </div>
        </div>

        <CardHeader>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>{format(event.date, "PPP", { locale: fr })}</span>
          </div>
          <CardTitle className="line-clamp-1">{event.title}</CardTitle>
          <CardDescription className="line-clamp-2">{event.description}</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col gap-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="line-clamp-1">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>{event.attendees} participants</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-4">
          <div className="flex items-center gap-2">
            <Image src={event.organizer.avatar} alt={event.organizer.name} width={24} height={24} className="rounded-full" />{" "}
            <span className="text-sm text-muted-foreground">{event.organizer.name}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};
