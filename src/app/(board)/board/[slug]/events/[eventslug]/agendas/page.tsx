import { fetchEvent } from "@/server/services/events.service";
import EventAgendas from "./_components/event-agendas";

type PageProps = {
  params: {
    slug: string;
    eventslug: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
};

export default async function AgendasPage({ params }: PageProps) {
  const { eventslug } = params;

  const eventResponse = await fetchEvent(eventslug);

  if (!eventResponse?.data) {
    return <div>No agendas found for this event.</div>;
  }

  const { agendas } = eventResponse.data;

  return <EventAgendas agendas={agendas} />;
}
