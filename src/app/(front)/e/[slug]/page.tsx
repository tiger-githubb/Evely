import Section from "@/components/ui/custom/section";
import { fetchEventBySlug } from "@/config/data";
import { EventDetails } from "./_components/event-details";

export default function EventPage({ params }: { params: { slug: string } }) {
  const event = fetchEventBySlug(params.slug);

  return (
    <Section className="py-16 mt-0">
      <EventDetails event={event} />
    </Section>
  );
}
