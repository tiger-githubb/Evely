import EventFaqAccordion from "./event-faq-accordion";

interface Event {
  faq: [];
}

const EventFaqSection = ({ event }: { event: Event }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">FAQ</h2>
      <EventFaqAccordion faqs={event.faq} />
    </div>
  );
};

export default EventFaqSection;
