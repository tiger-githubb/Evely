"use client";
import { TicketsSkeleton } from "@/components/shared/ui-skeletons";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchEventTickets } from "@/server/services/events.service";
import { Event } from "@/types/api/event.type";
import { useQuery } from "@tanstack/react-query";
import { AlertCircle, TicketX } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { TicketsList } from "./tickets-list";
import { TicketsTotal } from "./tickets-total";
interface TicketCounter {
  [key: number]: number;
}

export function TicketsSection({ event, organizationId }: { event: Event; organizationId: number }) {
  const [ticketCounts, setTicketCounts] = useState<TicketCounter>({});
  const t = useTranslations();

  const {
    data: tickets,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tickets", event.id, organizationId],
    queryFn: () => fetchEventTickets(event.id, organizationId),
  });

  if (isLoading) return <TicketsSkeleton />;

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>{t("tickets.loadError")}</AlertDescription>
      </Alert>
    );
  }

  if (!tickets?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{t("ticket.notAvailableTitle")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="mx-auto w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <TicketX className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground">{t("ticket.notAvailableMessage")}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("ticket.availableTitle")}</CardTitle>
      </CardHeader>
      <CardContent>
        <TicketsList tickets={tickets} onCountChange={setTicketCounts} />
        <TicketsTotal tickets={tickets} counts={ticketCounts} event={event} />
      </CardContent>
    </Card>
  );
}
