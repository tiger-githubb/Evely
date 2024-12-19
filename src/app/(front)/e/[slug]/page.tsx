import Section from "@/components/ui/custom/section";
import { fetchEventBySlug } from "@/config/data";
import { EventDetails } from "./_components/event-details";
interface EventsPageProps {
  params: Promise<{
    slug: string;
  }>;
}
export default async function EventPage({ params }: EventsPageProps) {
  const { slug } = await params;
  const event = fetchEventBySlug(slug);

  return (
    <Section className="md:mt-0">
      <EventDetails event={event} />
    </Section>
  );
}
