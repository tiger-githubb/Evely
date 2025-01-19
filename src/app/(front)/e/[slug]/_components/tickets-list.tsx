"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ticket } from "@/types/api/ticket.types";
import { Minus, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { toast } from "sonner";

interface TicketCounter {
  [key: number]: number;
}

interface TicketsListProps {
  tickets: Ticket[];
  onCountChange: (counts: { [key: number]: number }) => void;
  initialCounts?: { [key: number]: number };
  readOnly?: boolean;
}

export function TicketsList({ tickets, onCountChange }: TicketsListProps) {
  const [ticketCounts, setTicketCounts] = useState<TicketCounter>({});
  const [showFullDescription, setShowFullDescription] = useState<{ [key: number]: boolean }>({});
  const t = useTranslations("ticket");

  const updateTicketCount = (ticketId: number, newCount: number) => {
    const newCounts = {
      ...ticketCounts,
      [ticketId]: newCount,
    };
    setTicketCounts(newCounts);
    onCountChange(newCounts);
  };

  const handleIncrement = (ticket: Ticket) => {
    const currentCount = ticketCounts[ticket.id] || 0;
    const remainingTickets = getRemainingTickets(ticket);

    // Check both maxTicketsPerOrder and remainingTickets
    const maxAllowed = Math.min(ticket.maxTicketsPerOrder, remainingTickets);

    if (currentCount < maxAllowed) {
      updateTicketCount(ticket.id, currentCount + 1);

      // Show toast when reaching max limit
      if (currentCount + 1 === maxAllowed) {
        toast.info(maxAllowed === remainingTickets ? t("noMoreTickets") : t("maxLimit", { limit: ticket.maxTicketsPerOrder }));
      }
    }
  };

  const handleDecrement = (ticket: Ticket) => {
    const currentCount = ticketCounts[ticket.id] || 0;
    if (currentCount > 0) {
      updateTicketCount(ticket.id, currentCount - 1);
    }
  };

  const getRemainingTickets = (ticket: Ticket) => {
    return ticket.availableQuantity - (ticket._count?.inscriptions || 0);
  };

  const toggleDescription = (ticketId: number) => {
    setShowFullDescription((prev) => ({
      ...prev,
      [ticketId]: !prev[ticketId],
    }));
  };

  const renderDescription = (ticket: Ticket) => {
    if (!ticket.description) return null;

    const shouldTruncate = ticket.description.length > 100;

    return (
      <div className="text-sm text-muted-foreground mt-1">
        <p className={showFullDescription[ticket.id] ? "" : "line-clamp-2"}>{ticket.description}</p>
        {shouldTruncate && (
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleDescription(ticket.id);
            }}
            className="text-primary text-xs mt-1 hover:underline"
          >
            {showFullDescription[ticket.id] ? t("showLess") : t("showMore")}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Card key={ticket.id} className={`p-4 ${getRemainingTickets(ticket) === 0 ? "bg-red-50 dark:bg-red-950/20" : ""}`}>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-medium">{ticket.name}</h3>
              <p className="text-sm text-muted-foreground">{ticket.price} FCFA</p>
              <p
                className={`text-xs ${
                  getRemainingTickets(ticket) === 0 ? "text-red-600 dark:text-red-500 font-medium" : "text-muted-foreground"
                }`}
              >
                {t("remaining", { remaining: getRemainingTickets(ticket) })}
              </p>
              {renderDescription(ticket)}
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" onClick={() => handleDecrement(ticket)} disabled={!ticketCounts[ticket.id]}>
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{ticketCounts[ticket.id] || 0}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrement(ticket)}
                disabled={
                  ticketCounts[ticket.id] >= Math.min(ticket.maxTicketsPerOrder, getRemainingTickets(ticket)) ||
                  getRemainingTickets(ticket) === 0
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
