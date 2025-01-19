import { fetchEvent } from "@/server/services/events.service";
import { getTranslations } from "next-intl/server";
import EventMedia from "./_components/event-media";

interface MediaPageProps {
  params: Promise<{
    eventslug: string;
  }>;
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { eventslug } = await params;
  const t = await getTranslations("MediaPage"); // Fetch translations for this page

  const eventResponse = await fetchEvent(eventslug);

  if (!eventResponse?.data) {
    return <div>{t("noMediaAvailable")}</div>; // Use translated fallback message
  }

  const { covers, video } = eventResponse.data;

  return <EventMedia covers={covers} video={video} />;
}
