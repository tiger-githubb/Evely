"use client";
import { TicketsSkeleton } from "@/components/shared/ui-skeletons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchEventTickets } from "@/server/services/events.service";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, TicketX } from "lucide-react";
import { useState } from "react";
import { TicketsList } from "./tickets-list";
import { TicketsTotal } from "./tickets-total";

interface TicketCounter {
  [key: number]: number;
}

export function TicketsSection({ eventId, organizationId }: { eventId: number; organizationId: number }) {
  const [ticketCounts, setTicketCounts] = useState<TicketCounter>({});

  const {
    data: tickets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tickets", eventId, organizationId],
    queryFn: () => fetchEventTickets(eventId, organizationId),
  });

  if (isLoading) return <TicketsSkeleton />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Une erreur est survenue lors du chargement des tickets</AlertDescription>
      </Alert>
    );
  }

  if (!tickets?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Tickets non disponibles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <TicketX className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">Les tickets pour cet événement ne sont pas encore disponibles.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tickets disponibles</CardTitle>
      </CardHeader>
      <CardContent>
        <TicketsList tickets={tickets} onCountChange={setTicketCounts} />
        <TicketsTotal tickets={tickets} counts={ticketCounts} />
      </CardContent>
    </Card>
  );
}
