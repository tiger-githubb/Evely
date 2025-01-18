"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Ticket } from "@/types/api/ticket.types";
import { Minus, Plus } from "lucide-react";
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
    if (currentCount < ticket.maxTicketsPerOrder) {
      updateTicketCount(ticket.id, currentCount + 1);
      // Show toast when reaching max limit
      if (currentCount + 1 === ticket.maxTicketsPerOrder) {
        toast.info(`Vous avez atteint la limite de ${ticket.maxTicketsPerOrder} tickets pour ce type de billet`);
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
            {showFullDescription[ticket.id] ? "Voir moins" : "Voir plus"}
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Card key={ticket.id} className="p-4">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <h3 className="font-medium">{ticket.name}</h3>
              <p className="text-sm text-muted-foreground">{ticket.price} FCFA</p>
              <p className="text-xs text-muted-foreground">Reste {getRemainingTickets(ticket)} tickets</p>
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
                disabled={ticketCounts[ticket.id] >= ticket.maxTicketsPerOrder}
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
