import { fetchEvent } from "@/server/services/events.service";
import { EventHeader } from "./_components/event-header";

interface EventLayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

export default async function EventLayout({ children, params }: EventLayoutProps) {
  const eventResponse = await fetchEvent(params.slug);

  if (!eventResponse?.data) {
    return <p>Événement introuvable</p>; // Add a proper not-found component later
  }

  const event = eventResponse.data;

  return (
    <div className="space-y-6">
      <EventHeader event={event} />
      <div className="mx-auto w-full space-y-4 max-w-7xl px-4 lg:px-6">{children}</div>
    </div>
  );
}
