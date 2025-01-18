import { Event } from "@/types/api/event.type";
import { TicketsSection } from "./tickets-section";

export function EventSidebar({ event }: { event: Event }) {
  return (
    <div className="space-y-6">
      <TicketsSection event={event} organizationId={event.organizationId} />
    </div>
  );
}
