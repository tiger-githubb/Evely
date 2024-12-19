import { Button } from "@/components/ui/button";
import { Event } from "@/types/api/event.type";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import Link from "next/link";

export function EventSidebar({ event }: { event: Event }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <Button className="w-full" size="lg">
            Réserver maintenant
          </Button>
          <p className="text-center text-sm text-muted-foreground mt-2">Places limitées disponibles</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Organisateur</CardTitle>
        </CardHeader>
        <CardContent>
          <Link href={routes.organizations.details(event.organization.slug)}>
            <div className="flex items-center gap-4 hover:opacity-80 transition">
              <Avatar className="h-12 w-12">
                <AvatarImage src={event.organization.logo} alt={event.organization.name} />
                <AvatarFallback>{event.organization.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{event.organization.name}</p>
                <p className="text-sm text-muted-foreground">
                  {event.organization._count.followers} followers • {event.organization._count.events} événements
                </p>
              </div>
            </div>
          </Link>
          <Button variant="outline" className="w-full mt-4">
            Suivre l&apos;organisateur
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
