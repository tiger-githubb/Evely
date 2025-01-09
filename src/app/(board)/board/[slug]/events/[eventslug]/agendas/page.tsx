// app/board/[slug]/events/[eventId]/agendas/page.tsx

import { fetchEvent } from "@/server/services/events.service";
import EventAgendas from "./_components/event-agendas";

interface AgendasPageProps {
  params: {
    slug: string;
    eventslug: string;
  };
}

export default async function AgendasPage({ params }: AgendasPageProps) {
  const { eventslug } = params;

  const eventResponse = await fetchEvent(eventslug);

  if (!eventResponse?.data) {
    return <div>No agendas found for this event.</div>;
  }

  const { agendas } = eventResponse.data;

  return <EventAgendas agendas={agendas} />;
}
