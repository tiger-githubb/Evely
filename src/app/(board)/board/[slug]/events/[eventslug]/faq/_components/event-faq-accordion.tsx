"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface EventFaqAccordionProps {
  faqs: {
    id: number;
    question: string;
    answer: string;
  }[];
}

export default function EventFaqAccordion({ faqs }: EventFaqAccordionProps) {
  if (!faqs || faqs.length === 0) {
    return <p className="text-gray-500">Aucune FAQ disponible pour cet événement.</p>;
  }

  return (
    <div className="space-y-4">
      <Accordion type="single" collapsible>
        {faqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id.toString()}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
