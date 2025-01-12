"use client";

import { TicketGridSkeleton } from "@/components/shared/ui-skeletons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { fetchEventTickets } from "@/server/services/events-tickets.service";
import { useOrganizationStore } from "@/stores/organization-store";
import { formatDate, formatTime } from "@/utils/date-utils";
import { useQuery } from "@tanstack/react-query";
import { MoreVertical } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { resolveSlug } from "@/server/services/slug-resolver.service";

interface TicketListProps {
  eventSlug: string;
}
export default function TicketList({ eventSlug }: TicketListProps) {
  const { activeOrganization } = useOrganizationStore();
  const organizationId = activeOrganization?.id;
  const [eventId, setEventId] = useState<number | null>(null);


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
        <h1 className="text-2xl font-bold">Liste des tickets</h1>
        <TicketGridSkeleton />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500">Erreur lors du chargement des tickets.</p>
      </div>
    );
  }

  const handleEdit = (ticketId: number) => {
    toast.success(`Modifier le ticket ${ticketId}`);
  };

  const handleDelete = (ticketId: number) => {
    toast.error(`Supprimer le ticket ${ticketId}`);
  };

  return (
    <div className="container mx-auto py-6 space-y-4">
      <h1 className="text-2xl font-bold">Liste des tickets</h1>
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
                    <DropdownMenuItem onClick={() => handleEdit(ticket.id)}>Modifier</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDelete(ticket.id)}>Supprimer</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-500">{ticket.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-green-500">● En vente</span>
                <span>
                  • Se termine {formatDate(ticket.saleEndDate)} à {formatTime(ticket.saleEndTime)}
                </span>
              </div>
              <div className="flex justify-between mt-4">
                <p>
                  <strong>Vendus :</strong> {ticket._count.inscriptions}/{ticket.availableQuantity}
                </p>
                <p>
                  <strong>Prix :</strong> {ticket.price === 0 ? "Gratuit" : `${ticket.price} FCFA`}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
