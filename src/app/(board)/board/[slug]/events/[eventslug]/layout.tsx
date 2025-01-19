import { fetchEvent } from "@/server/services/events.service";
import { EventHeader } from "./_components/event-header";
import { EventNav } from "./_components/event-nav";
import EventNotFound from "./_components/event-not-found";

interface EventLayoutProps {
  children: React.ReactNode;
  params: { slug: string; eventslug: string };
}

export default async function EventLayout({ children, params }: EventLayoutProps) {
  const { slug, eventslug } = params;

  const eventResponse = await fetchEvent(eventslug); // Fetch event details using both `slug` and `eventslug`

  if (!eventResponse?.data) {
    return <EventNotFound />;
  }

  return (
    <div className="space-y-6">
      <EventHeader event={eventResponse.data} />
      <div className="mx-auto w-full space-y-4 max-w-7xl px-4 lg:px-6">
        <EventNav organizationId={slug} eventId={eventslug} />
        {children}
      </div>
    </div>
  );
}
