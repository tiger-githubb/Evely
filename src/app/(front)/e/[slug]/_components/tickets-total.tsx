"use client";
import { CheckoutModal } from "@/components/shared/checkout/checkout-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Ticket } from "@/types/api/ticket.types";
import { useState } from "react";

interface TicketsTotalProps {
  tickets: Ticket[];
  counts: { [key: number]: number };
}

export function TicketsTotal({ tickets, counts }: TicketsTotalProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const totalAmount = Object.entries(counts).reduce((total, [ticketId, count]) => {
    const ticket = tickets.find((t) => t.id === Number(ticketId));
    return total + (ticket?.price || 0) * count;
  }, 0);

  return (
    <>
      <div className="pt-4">
        <Separator className="mb-4" />
        <div className="flex justify-between mb-4">
          <span className="font-medium">Total</span>
          <span className="font-medium">{totalAmount} FCFA</span>
        </div>
        <Button className="w-full" size="lg" disabled={totalAmount === 0} onClick={() => setIsCheckoutOpen(true)}>
          Procéder au paiement
        </Button>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        eventId={tickets[0]?.eventId}
        cart={counts}
        tickets={tickets}
      />
    </>
  );
}
