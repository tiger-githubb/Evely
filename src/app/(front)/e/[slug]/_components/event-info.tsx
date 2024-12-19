import { Event } from "@/types/api/event.type";

export function EventInfo({ event }: { event: Event }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold mb-4">À propos</h2>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: event.content }} />
      </div>

      {event.faq.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">FAQ</h2>
          <div className="space-y-4">
            {event.faq.map((item) => (
              <div key={item.id} className="space-y-2">
                <h3 className="font-medium">{item.question}</h3>
                <p className="text-muted-foreground">{item.response}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
