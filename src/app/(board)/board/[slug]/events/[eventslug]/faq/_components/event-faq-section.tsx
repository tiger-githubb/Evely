import EventFaqAccordion from "./event-faq-accordion";

interface EventPageProps {
  params: Promise<{ eventslug: string }>;
}

const EventFaqSection = async ({ params }: EventPageProps) => {
  const { eventslug } = await params;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">FAQ</h2>
      <EventFaqAccordion eventslug={eventslug} />
    </div>
  );
};

export default EventFaqSection;
