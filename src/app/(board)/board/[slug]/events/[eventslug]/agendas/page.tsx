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

  const { agendas } = eventResponse.data;

  return <EventAgendas agendas={agendas} />;
}
