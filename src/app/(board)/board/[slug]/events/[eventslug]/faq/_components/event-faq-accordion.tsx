"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { fetchEvent } from "@/server/services/events.service";
import { EventFaq } from "@/types/api/event-faq.type";
import { useQuery } from "@tanstack/react-query";
import { useTranslations } from "next-intl";

interface EventFaqAccordionProps {
  eventslug: string;
}

export default function EventFaqAccordion({ eventslug }: EventFaqAccordionProps) {
  const t = useTranslations("EventFaqAccordion");

  const {
    data: event,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["event", eventslug],
    queryFn: () => fetchEvent(eventslug),
  });

  const faqs = event?.data.faqs;

  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">{t("loading")}</div>;
  }

  if (error || !event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">{t("errorLoading")}</p>
      </div>
    );
  }

  if (!faqs || faqs.length === 0) {
    return <p className="text-gray-500">{t("noFaqsAvailable")}</p>;
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible>
        {faqs.map((faq: EventFaq) => (
          <AccordionItem key={faq.id} value={faq.id.toString()}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.response}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
