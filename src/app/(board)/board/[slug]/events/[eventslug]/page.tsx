import { EventInfo } from "./_components/event-info";
import { fetchEvent } from "@/server/services/events.service";

interface EventPageProps {
  params: { eventslug: string };
}

export default async function EventPage({ params }: EventPageProps) {
  const eventResponse = await fetchEvent(params.eventslug);

  if (!eventResponse?.data) {
    return <p>Événement introuvable</p>; 
  }

  const event = eventResponse.data;

  return (
    <div className="space-y-8">
      <EventInfo event={event} />
    </div>
  );
}
