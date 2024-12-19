import { Event } from "@/types/api/event.type";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function EventInfo({ event }: { event: Event }) {
  return (
    <div className="space-y-16">
      {/* About Section */}
      <section className="space-y-8">
        <h2 className="text-2xl font-semibold">À propos</h2>
        <div className="prose prose-gray max-w-none space-y-6">
          {event.summary && <p className="text-lg text-muted-foreground leading-relaxed mb-8">{event.summary}</p>}
          <div dangerouslySetInnerHTML={{ __html: event.content }} className="space-y-4" />
        </div>
      </section>

      <Separator className="my-12" />

      {/* Program Section */}
      {event.agendas.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">Programme</h2>
          <div className="space-y-8">
            {event.agendas.map((agenda) => (
              <Card key={agenda.id} className="p-8">
                <h3 className="text-xl font-medium mb-6">{agenda.title}</h3>
                <div className="space-y-6">
                  {agenda.sessions.map((session) => (
                    <div key={session.title} className="flex items-start gap-6 py-2">
                      <div className="w-32 flex-shrink-0">
                        <p className="font-medium">{format(new Date(session.startTime), "HH:mm", { locale: fr })}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">{session.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      <Separator className="my-12" />

      {/* FAQ Section */}
      {event.faq.length > 0 && (
        <section className="space-y-8">
          <h2 className="text-2xl font-semibold">Questions fréquentes</h2>
          <Accordion type="single" collapsible className="space-y-4">
            {event.faq.map((item) => (
              <AccordionItem key={item.id} value={item.id.toString()} className={accordionVariants.elegant.item}>
                <AccordionTrigger className={accordionVariants.elegant.trigger}>
                  <span className="text-lg">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className={accordionVariants.elegant.content}>
                  <div className="text-muted-foreground leading-relaxed">{item.response}</div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </div>
  );
}

const accordionVariants = {
  elegant: {
    trigger: "bg-background hover:bg-muted/50 px-6 rounded-lg transition-all",
    content: "px-6 pb-6",
    item: "mb-4 border border-border rounded-lg overflow-hidden data-[state=open]:bg-muted/50",
  },
};
