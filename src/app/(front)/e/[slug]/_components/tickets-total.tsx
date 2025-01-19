"use client";
import { CheckoutModal } from "@/components/shared/checkout/checkout-modal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Event } from "@/types/api/event.type";
import { Ticket } from "@/types/api/ticket.types";
import { useTranslations } from "next-intl"; // Import useTranslations hook
import { useState } from "react";

interface TicketsTotalProps {
  tickets: Ticket[];
  counts: { [key: number]: number };
  event: Event;
}

export function TicketsTotal({ tickets, counts, event }: TicketsTotalProps) {
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const t = useTranslations(); // Fetch translations

  const totalAmount = Object.entries(counts).reduce((total, [ticketId, count]) => {
    const ticket = tickets.find((t) => t.id === Number(ticketId));
    return total + (ticket?.price || 0) * count;
  }, 0);

  return (
    <>
      <div className="pt-4">
        <Separator className="mb-4" />
        <div className="flex justify-between mb-4">
          <span className="font-medium">{t("ticket.total")}</span> {/* Translated "Total" */}
          <span className="font-medium">{totalAmount} FCFA</span>
        </div>
        <Button className="w-full" size="lg" disabled={totalAmount === 0} onClick={() => setIsCheckoutOpen(true)}>
          {t("ticket.confirm")} {/* Translated "Valider" */}
        </Button>
      </div>

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onCloseAction={() => setIsCheckoutOpen(false)}
        eventId={tickets[0]?.eventId}
        event={event}
        cart={counts}
        tickets={tickets}
      />
    </>
  );
}
