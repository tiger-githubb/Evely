import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { Event } from "@/types/api/event.type";
import Link from "next/link";
import { OrganizationActions } from "../../../o/[slug]/_components/organization-actions";
import { TicketsSection } from "./tickets-section";

export function EventSidebar({ event }: { event: Event }) {
  return (
    <div className="space-y-6">
      <TicketsSection event={event} organizationId={event.organizationId} />

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
                {/* <p className="text-sm text-muted-foreground">
                  {event.organization._count.followers} followers • {event.organization._count.events} événements
                </p> */}
              </div>
            </div>
          </Link>
          <div className="mt-4">
            <OrganizationActions organization={event.organization} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
