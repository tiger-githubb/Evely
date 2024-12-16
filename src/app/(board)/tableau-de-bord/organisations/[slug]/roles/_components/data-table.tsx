"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { deleteRole, fetchOrganizationRoles } from "@/server/services/roles.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { columns } from "./columns";
import { RoleForm } from "./role-form";

interface RolesTableProps {
  organizationId: string;
}

export default function RolesTable({ organizationId }: RolesTableProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-roles", organizationId],
    queryFn: () => fetchOrganizationRoles(),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-roles"] });
      toast.success("Rôle supprimé avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la suppression du rôle");
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <RoleForm organizationId={organizationId} />
      </div>

      <CustomDataTable
        columns={columns({
          onDelete: deleteMutation.mutate,
          isDeleting: deleteMutation.isPending,
          organizationId: organizationId,
        })}
        data={data?.data || []}
        isLoading={isLoading}
        error={error}
        errorMessage="Une erreur est survenue lors du chargement des rôles"
        filterColumn="name"
        filterPlaceholder="Filtrer par nom..."
        showColumnVisibility={true}
        showPagination={true}
        density="normal"
        rowsPerPage={10}
        noResultsMessage="Aucun rôle trouvé"
        totalLabel="rôle(s)"
        totalItems={data?.total}
      />
    </div>
  );
}
