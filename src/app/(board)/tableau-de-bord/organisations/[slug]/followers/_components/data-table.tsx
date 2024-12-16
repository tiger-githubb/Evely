"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { deleteOrganizationFollower, fetchOrganizationFollowers } from "@/server/services/followers.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { columns } from "./columns";

interface FollowersTableProps {
  organizationId: string;
}

export default function FollowersTable({ organizationId }: FollowersTableProps) {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-followers", organizationId],
    queryFn: () => fetchOrganizationFollowers(organizationId),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrganizationFollower,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-followers", organizationId] });
      toast.success("Follower supprimé avec succès");
    },
    onError: () => {
      toast.error("Une erreur est survenue lors de la suppression du follower");
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
      errorMessage="Une erreur est survenue lors du chargement des followers"
      filterColumn="user"
      filterPlaceholder="Filtrer par email..."
      showColumnVisibility={true}
      showPagination={true}
      density="normal"
      rowsPerPage={10}
      noResultsMessage="Aucun follower trouvé"
      totalLabel="follower(s)"
      totalItems={data?.total}
    />
  );
}
