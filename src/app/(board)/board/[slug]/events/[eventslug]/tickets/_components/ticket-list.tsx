"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { fetchEventTickets } from "@/server/services/events-tickets.service";
import { toast } from "sonner";
import { fetchEvent } from "@/server/services/events.service";
import { fetchOrganizationIdBySlug } from "@/server/services/organizations.service";
import { MoreVertical } from "lucide-react";
import { formatDate, formatTime } from "@/utils/date-utils";
import { TicketGridSkeleton } from "@/components/shared/ui-skeletons";



interface TicketListProps {
  organizationSlug: string;
  eventSlug: string;
}
export default function TicketList({ organizationSlug, eventSlug }: TicketListProps) {
  const [organizationId, setOrganizationId] = useState<string | null>(null);
  const [eventId, setEventId] = useState<string | null>(null);


  // Resolve organization and event IDs from slugs
  useEffect(() => {
    const fetchIds = async () => {
      try {
        const orgId = await fetchOrganizationIdBySlug(organizationSlug);
        setOrganizationId(orgId);

        const event = await fetchEvent(eventSlug);
        setEventId(event?.data.id);
      } catch {
        toast.error("Erreur lors de la récupération des IDs par slug");
      }
    };

    fetchIds();
  }, [organizationSlug, eventSlug]);

  // Fetch tickets when IDs are resolved
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