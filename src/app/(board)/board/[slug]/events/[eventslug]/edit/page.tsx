import EventForm from "@/components/shared/board/event-form";
import { fetchEvent } from "@/server/services/events.service";

interface EditEventPageProps {
  params: Promise<{
    eventslug: string;
  }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { eventslug } = await params;
  const event = await fetchEvent(eventslug);

  if (!event) {
    return (
      <div className="container">
        <h3>Événement non trouvé</h3>
        <p>Impossible de charger les détails de l&apos;événement. Veuillez réessayer plus tard.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h3>Modifier l&apos;Événement</h3>
      <EventForm initialData={event.data} />
    </div>
  );
}
