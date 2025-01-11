import EventFaqAccordion from "./_components/event-faq-accordion";

interface EventFaqPageProps {
  params: Promise<{
    eventslug: string;
  }>;
}

export default async function EventFaqPage({ params }: EventFaqPageProps) {
  const { eventslug } = await params;

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <h1 className="text-2xl font-bold">FAQ</h1>
      <EventFaqAccordion eventslug={eventslug} />
    </div>
  );
}
