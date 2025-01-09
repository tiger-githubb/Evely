// app/board/[slug]/events/[eventId]/media/page.tsx

import { fetchEvent } from "@/server/services/events.service";
import EventMedia from "./_components/event-media";

interface MediaPageProps {
  params: {
    slug: string;
    eventslug: string;
  };
}

export default async function MediaPage({ params }: MediaPageProps) {
  const { eventslug } = params;

  const eventResponse = await fetchEvent(eventslug);

  if (!eventResponse?.data) {
    return <div>No media available for this event.</div>;
  }

  const { covers, video } = eventResponse.data;

  return <EventMedia covers={covers} video={video} />;
}
