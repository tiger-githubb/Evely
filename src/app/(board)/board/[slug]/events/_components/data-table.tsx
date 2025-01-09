"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { deleteEvent, fetchOrganizationEvents } from "@/server/services/events.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "@/config/routes";
import { columns } from "./columns";

export default function EventsTable({ organizationSlug }: { organizationSlug: string }) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-events", organizationSlug],
    queryFn: () => fetchOrganizationEvents(organizationSlug),
  });

  const deleteMutation = useMutation({
    mutationFn: (eventId: number) => deleteEvent(organizationSlug, eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-events"] });
      toast.success("Événement supprimé avec succès");
    },
    onError: () => toast.error("Une erreur est survenue lors de la suppression"),
  });

  const handleDelete = (eventId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      deleteMutation.mutate(eventId);
    }
  };

  const handleView = (eventSlug: string) => {
    router.push(routes.board.workspace.events.show(organizationSlug, eventSlug));
  };

  return (
    <CustomDataTable
      columns={columns(handleView, handleDelete)}
      data={data?.data || []}
      isLoading={isLoading}
      error={error}
      errorMessage="Une erreur est survenue lors du chargement des événements."
      rowsPerPage={10}
      noResultsMessage="Aucun événement trouvé."
    />
  );
}
