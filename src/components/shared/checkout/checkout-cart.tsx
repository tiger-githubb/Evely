"use client";
import { TicketsList } from "@/app/(front)/e/[slug]/_components/tickets-list";
import { TicketsTotal } from "@/app/(front)/e/[slug]/_components/tickets-total";
import { Button } from "@/components/ui/button";
import { Event } from "@/types/api/event.type";
import { Ticket } from "@/types/api/ticket.types";

interface CheckoutCartProps {
  tickets: Ticket[];
  cart: { [key: number]: number };
  event: Event;
  onNext: () => void;
}

export function CheckoutCart({ tickets, cart, event, onNext }: CheckoutCartProps) {
  const handleCountChange = (counts: { [key: number]: number }) => {
    console.log(counts);

    // Handle count changes if needed in checkout context
  };

  return (
    <div className="space-y-6">
      <TicketsList tickets={tickets} onCountChange={handleCountChange} initialCounts={cart} readOnly={true} />
      <TicketsTotal tickets={tickets} counts={cart} event={event} />
      <Button className="w-full" onClick={onNext}>
        Continuer
      </Button>
    </div>
  );
}
