"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { getOrganizations, deleteOrganization } from "@/server/services/organizations.service";
import { columns } from "./columns";
import { toast } from "sonner";

export default function OrganizationsTable() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      toast.success("Organisation supprimée avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la suppression de l'organisation");
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
      errorMessage="Une erreur est survenue lors du chargement des organisations."
      filterColumn="name"
      filterPlaceholder="Filtrer par nom..."
      showColumnVisibility={true}
      showPagination={true}
      density="normal"
      rowsPerPage={10}
      noResultsMessage="Aucune organisation trouvée"
      totalLabel="ligne(s)"
      totalItems={data?.total}
    />
  );
}
