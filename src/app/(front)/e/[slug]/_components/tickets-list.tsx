"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { EventTicket } from "@/types/api/event.type";
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

  const handleIncrement = (ticketId: number) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) return;

    const currentCount = ticketCounts[ticketId] || 0;
    if (currentCount >= ticket.maxTicketsPerOrder) return;

    const newCounts = {
      ...ticketCounts,
      [ticketId]: currentCount + 1,
    };
    setTicketCounts(newCounts);
    onCountChange(newCounts);
  };

  const handleDecrement = (ticketId: number) => {
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) return;

    const currentCount = ticketCounts[ticketId] || 0;
    if (currentCount <= ticket.minTicketsPerOrder) return;

    const newCounts = {
      ...ticketCounts,
      [ticketId]: currentCount - 1,
    };
    setTicketCounts(newCounts);
    onCountChange(newCounts);
  };

  return (
    <div className="space-y-4">
      {tickets.map((ticket) => (
        <Card key={ticket.id} className="p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium">{ticket.name}</h3>
              <p className="text-sm text-muted-foreground">{ticket.price} FCFA</p>
              <p className="text-xs text-muted-foreground">
                Reste {ticket.availableQuantity - (ticket._count?.inscriptions || 0)} tickets
              </p>
              {ticket.description && <p className="text-sm text-muted-foreground mt-1">{ticket.description}</p>}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDecrement(ticket.id)}
                disabled={!ticketCounts[ticket.id] || ticketCounts[ticket.id] <= ticket.minTicketsPerOrder}
              >
                -
              </Button>
              <span>{ticketCounts[ticket.id] || 0}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleIncrement(ticket.id)}
                disabled={ticketCounts[ticket.id] >= ticket.maxTicketsPerOrder}
              >
                +
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
