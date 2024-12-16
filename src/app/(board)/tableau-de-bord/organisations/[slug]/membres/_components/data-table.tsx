"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { deleteOrganizationUser, fetchOrganizationUsers } from "@/server/services/organizations.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { columns } from "./columns";

interface MembersTableProps {
  organizationId: string;
}

export default function MembersTable({ organizationId }: MembersTableProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-members", organizationId],
    queryFn: () => fetchOrganizationUsers(organizationId),
  });

  const deleteMutation = useMutation({
    mutationFn: (userId: number) => deleteOrganizationUser(organizationId, userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-members", organizationId] });
      toast.success("Membre retiré avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors du retrait du membre");
    },
  });

  return (
    <CustomDataTable
      columns={columns({
        onDelete: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
      })}
      data={data?.data || []}
      isLoading={isLoading}
      error={error}
      errorMessage="Une erreur est survenue lors du chargement des membres"
      filterColumn="user"
      filterPlaceholder="Filtrer par nom..."
      showColumnVisibility={true}
      showPagination={true}
      density="normal"
      rowsPerPage={10}
      noResultsMessage="Aucun membre trouvé"
      totalLabel="membre(s)"
      totalItems={data?.total}
    />
  );
}
