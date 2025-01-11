import { fetchEvent } from "@/server/services/events.service";
import EventAgendas from "./_components/event-agendas";

interface PageProps {
  params: Promise<{
    eventslug: string;
  }>;
}

export default async function AgendasPage({ params }: PageProps) {
  const { eventslug } = await params;

  const eventResponse = await fetchEvent(eventslug);

  if (!eventResponse?.data) {
    return <div>No agendas found for this event.</div>;
  }

  const { agendas } = eventResponse.data;

  return <EventAgendas agendas={agendas} />;
}
