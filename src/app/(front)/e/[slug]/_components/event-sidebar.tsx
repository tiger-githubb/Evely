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
    </div>
  );
}
