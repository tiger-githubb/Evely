import { fetchEvent } from "@/server/services/events.service";
import { getTranslations } from "next-intl/server";
import EventStats from "./_components/event-stats";

interface StatsPageProps {
  params: Promise<{
    eventslug: string;
  }>;
}

export default async function StatsPage({ params }: StatsPageProps) {
  const { eventslug } = await params;
  const t = await getTranslations("StatsPage"); // Fetch translations for this page

  const eventResponse = await fetchEvent(eventslug);

  if (!eventResponse?.data) {
    return <div>{t("noStatsAvailable")}</div>; // Use translated fallback message
  }

  const { date, startTime, endTime, tags } = eventResponse.data;

  return <EventStats date={date} startTime={startTime} endTime={endTime} tags={tags} />;
}
