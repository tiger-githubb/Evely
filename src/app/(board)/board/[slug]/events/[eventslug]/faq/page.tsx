"use client";

import { fetchEvent } from "@/server/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import EventFaqAccordion from "./_components/event-faq-accordion";

interface EventFaqPageProps {
  params: {
    slug: string;
    eventslug: string;
  };
}

export default function EventFaqPage({ params }: EventFaqPageProps) {
  const router = useRouter();

  const { data: event, isLoading, error } = useQuery({
    queryKey: ["event", params.eventslug],
    queryFn: () => fetchEvent(params.eventslug),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
Loading      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Une erreur est survenue lors du chargement des FAQs.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 px-4 space-y-6">
      <h1 className="text-2xl font-bold">FAQ</h1>
      <EventFaqAccordion faqs={event.data.faq} />
      <button
        onClick={() => router.back()}
        className="mt-4 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
      >
        Retour
      </button>
    </div>
  );
}
