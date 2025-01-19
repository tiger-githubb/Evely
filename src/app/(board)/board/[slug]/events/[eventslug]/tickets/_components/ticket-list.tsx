"use client";

import { TicketGridSkeleton } from "@/components/shared/ui-skeletons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { fetchEventTickets } from "@/server/services/events-tickets.service";
import { resolveSlug } from "@/server/services/slug-resolver.service";
import { useOrganizationStore } from "@/stores/organization-store";
import { formatDate, formatTime } from "@/utils/date-utils";
import { useQuery } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface TicketListProps {
  eventSlug: string;
}

export default function TicketList({ eventSlug }: TicketListProps) {
  const { activeOrganization } = useOrganizationStore();
  const organizationId = activeOrganization?.id;
  const [eventId, setEventId] = useState<number | null>(null);
  const t = useTranslations("tickets.ticketList");
  const tStats = useTranslations("tickets.ticketStats");

  useEffect(() => {
    const fetchEventId = async () => {
      if (organizationId && eventSlug) {
        try {
          const id = await resolveSlug("event", eventSlug);
          setEventId(id);
        } catch {
          toast.error("Erreur lors de la résolution de l'ID de l'événement.");
        }
      }
    };

    fetchEventId();
  }, [organizationId, eventSlug]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["event-tickets", organizationId, eventId],
    queryFn: () => fetchEventTickets(Number(organizationId), Number(eventId)),
    enabled: !!organizationId && !!eventId,
  });

  if (!organizationId || !eventId || isLoading) {
    return (
      <div className="container mx-auto py-6">
        <h1 className="text-2xl font-bold">{t("ticketListTitle")}</h1>
        <TicketGridSkeleton />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">{t("errorLoadingTickets")}</p>
      </div>
    );
  }

  const handleEdit = (ticketId: number) => {
    toast.success(`${t("ticketModify")} ${ticketId}`);
  };

  const handleDelete = (ticketId: number) => {
    toast.error(`${t("ticketDelete")} ${ticketId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-4">
      <h1 className="text-2xl font-bold">{t("ticketListTitle")}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {data.data.map((ticket) => (
          <Card key={ticket.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-semibold">{ticket.name}</CardTitle>
                {/* Vertical ellipses menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-2">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleEdit(ticket.id)}>{t("ticketModify")}</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(ticket.id)}>{t("ticketDelete")}</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-6 bg-gray-50 rounded-lg shadow-sm space-y-4">
              <p className="text-gray-700 text-sm leading-relaxed">{ticket.description}</p>

              <div className="flex flex-col items-start space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center justify-center w-5 h-5 bg-green-500 text-white rounded-full text-xs font-bold">
                    ✔
                  </span>
                  <span className="text-green-600 text-sm font-medium">{t("ticketOnSale")}</span>
                </div>
                <div className="text-gray-500 text-sm">
                  {/* Format date and time */}
                  {t("endsOn")} <span className="font-semibold text-gray-700">{formatDate(ticket.saleEndDate)}</span> {t("at")}{" "}
                  <span className="font-semibold text-gray-700">{formatTime(ticket.saleEndTime)}</span>
                </div>
              </div>

              <div className="border-t pt-4 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm">{tStats("soldTickets")}</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {ticket._count.inscriptions}/{ticket.availableQuantity}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">{tStats("price")}</p>
                  <p className={`text-lg font-semibold ${ticket.price === 0 ? "text-green-600" : "text-gray-800"}`}>
                    {ticket.price === 0 ? t("free") : `${ticket.price} FCFA`}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
