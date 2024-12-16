"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { deleteOrganizationInvitation, fetchOrganizationInvitations } from "@/server/services/organizations.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { InvitationForm } from "../../membres/_components/invitation-form";
import { columns } from "./columns";

interface InvitationsTableProps {
  organizationId: string;
}

export default function InvitationsTable({ organizationId }: InvitationsTableProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-invitations", organizationId],
    queryFn: () => fetchOrganizationInvitations(organizationId),
  });

  const deleteMutation = useMutation({
    mutationFn: (invitationId: number) => deleteOrganizationInvitation(organizationId, invitationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-invitations", organizationId] });
      toast.success("Invitation supprimée avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la suppression de l'invitation");
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <InvitationForm organizationId={organizationId} />
      </div>
      <CustomDataTable
        columns={columns({
          onDelete: deleteMutation.mutate,
          isDeleting: deleteMutation.isPending,
        })}
        data={data?.data || []}
        isLoading={isLoading}
        error={error}
        errorMessage="Une erreur est survenue lors du chargement des invitations"
        filterColumn="email"
        filterPlaceholder="Filtrer par email..."
        showColumnVisibility={true}
        showPagination={true}
        density="normal"
        rowsPerPage={10}
        noResultsMessage="Aucune invitation trouvée"
        totalLabel="invitation(s)"
        totalItems={data?.total}
      />
    </div>
  );
}
