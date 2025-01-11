import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { EventTicket } from "@/types/api/event.type";

interface TicketsTotalProps {
  tickets: EventTicket[];
  counts: { [key: number]: number };
}

export function TicketsTotal({ tickets, counts }: TicketsTotalProps) {
  const totalAmount = Object.entries(counts).reduce((total, [ticketId, count]) => {
    const ticket = tickets.find((t) => t.id === Number(ticketId));
    return total + (ticket?.price || 0) * count;
  }, 0);

  return (
    <div className="pt-4">
      <Separator className="mb-4" />
      <div className="flex justify-between mb-4">
        <span className="font-medium">Total</span>
        <span className="font-medium">{totalAmount} FCFA</span>
      </div>
      <Button
        className="w-full"
        size="lg"
        disabled={totalAmount === 0}
        onClick={() => {
          /* Handle payment */
        }}
      >
        Procéder au paiement
      </Button>
    </div>
  );
}
