import Section from "@/components/ui/custom/section";
import { fetchPublicEventBySlug } from "@/server/services/events.service";
import { notFound } from "next/navigation";
import { EventDetails } from "./_components/event-details";

interface EventsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EventPage({ params }: EventsPageProps) {
  const { slug } = await params;
  const event = await fetchPublicEventBySlug(slug);
  const eventData = event.data;

  if (!event) {
    notFound();
  }

  return (
    <Section className="md:mt-0">
      <EventDetails event={eventData} />
    </Section>
  );
}
