"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EventTicket } from "@/types/api/event.type";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";

interface TicketCounter {
  [key: number]: number;
}

interface TicketsListProps {
  tickets: EventTicket[];
  onCountChange: (counts: TicketCounter) => void;
}

export function TicketsList({ tickets, onCountChange }: TicketsListProps) {
  const [ticketCounts, setTicketCounts] = useState<TicketCounter>({});

  const updateTicketCount = (ticketId: number, newCount: number) => {
    const newCounts = {
      ...ticketCounts,
      [ticketId]: newCount,
    };
    setTicketCounts(newCounts);
    onCountChange(newCounts);
  };

  const handleIncrement = (ticket: EventTicket) => {
    const currentCount = ticketCounts[ticket.id] || 0;
    if (currentCount < ticket.maxTicketsPerOrder) {
      updateTicketCount(ticket.id, currentCount + 1);
    }
  };

  const handleDecrement = (ticket: EventTicket) => {
    const currentCount = ticketCounts[ticket.id] || 0;
    if (currentCount > 0) {
      updateTicketCount(ticket.id, currentCount - 1);
    }
  };

  const getRemainingTickets = (ticket: EventTicket) => {
    return ticket.availableQuantity - (ticket._count?.inscriptions || 0);
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
              {ticket.description && <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>}
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
