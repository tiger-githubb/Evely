"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { routes } from "@/config/routes";
import { deleteEvent, fetchOrganizationEvents, updateEventPublishStatus } from "@/server/services/events.service";
import { useOrganizationStore } from "@/stores/organization-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { columns } from "./columns";

export default function EventsTable() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { activeOrganization } = useOrganizationStore();

  // Ensure activeOrganization is available
  const organizationSlug = activeOrganization?.slug;
  const organizationId = activeOrganization?.id;

  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-events", organizationSlug],
    queryFn: () => {
      if (!organizationSlug) {
        return Promise.reject("Aucune organisation active sélectionnée.");
      }
      return fetchOrganizationEvents(organizationId || 0);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (eventId: number) => {
      if (organizationId === undefined) {
        throw new Error("Organization ID is undefined");
      }
      return deleteEvent(organizationId, eventId);
    },
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

  // Handle publish/depublish toggle
  const handlePublishToggle = async (eventId: number, draft: boolean) => {
    try {
      if (organizationId !== undefined) {
        await updateEventPublishStatus(organizationId, eventId, draft);
      } else {
        toast.error("Organization ID is undefined");
      }
      toast.success(draft ? "L'événement a été dépublié avec succès !" : "L'événement a été publié avec succès !");
      queryClient.invalidateQueries({ queryKey: ["organization-events"] }); // Refresh the event list
    } catch (error) {
      console.log(error);

      toast.error("Une erreur est survenue lors de la mise à jour du statut de l'événement.");
    }
  };
  const handleView = (eventSlug: string) => {
    if (organizationSlug) {
      router.push(routes.board.workspace.events.show(organizationSlug, eventSlug));
    } else {
      toast.error("Organization slug is undefined");
    }
  };

  return (
    <CustomDataTable
      columns={columns(handleView, handleDelete, handlePublishToggle)}
      data={data?.data || []}
      isLoading={isLoading}
      error={error}
      errorMessage="Une erreur est survenue lors du chargement des événements."
      rowsPerPage={10}
      noResultsMessage="Aucun événement trouvé."
    />
  );
}
