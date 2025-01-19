import EventForm from "@/components/shared/board/event-form";
import { fetchEvent } from "@/server/services/events.service";
import { getTranslations } from "next-intl/server";
import EventNotFound from "../_components/event-not-found";

interface EditEventPageProps {
  params: Promise<{
    eventslug: string;
  }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { eventslug } = await params;
  const event = await fetchEvent(eventslug);

  const t = await getTranslations("EditEventPage");

  if (!event) {
    return <EventNotFound />;
  }

  return (
    <div className="container">
      <h3>{t("editEventTitle")}</h3>
      <EventForm initialData={event.data} />
    </div>
  );
}
