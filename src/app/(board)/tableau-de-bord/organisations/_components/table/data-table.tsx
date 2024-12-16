"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { deleteOrganization, fetchOrganizations } from "@/server/services/organizations.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { columns } from "./columns";

export default function OrganizationsTable() {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: fetchOrganizations,
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
      density="spacious"
      rowsPerPage={10}
      noResultsMessage="Aucune organisation trouvée"
      totalLabel="ligne(s)"
      totalItems={data?.total}
    />
  );
}
