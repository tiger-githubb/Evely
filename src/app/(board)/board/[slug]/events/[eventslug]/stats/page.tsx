// app/board/[slug]/events/[eventId]/stats/page.tsx

import { fetchEvent } from "@/server/services/events.service";
import EventStats from "./_components/event-stats";

interface StatsPageProps {
  params: {
    slug: string;
    eventslug: string;
  };
}

export default async function StatsPage({ params }: StatsPageProps) {
  const { eventslug } = params;

  const eventResponse = await fetchEvent(eventslug);

  if (!eventResponse?.data) {
    return <div>No stats available for this event.</div>;
  }

  const { date, startTime, endTime, tags } = eventResponse.data;

  return <EventStats date={date} startTime={startTime} endTime={endTime} tags={tags} />;
}
