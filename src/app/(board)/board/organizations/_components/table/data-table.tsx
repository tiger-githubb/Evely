"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { deleteOrganization, fetchOrganizations } from "@/server/services/organizations.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl"; // Import for translations
import { toast } from "sonner";
import { Columns } from "./columns";

export default function OrganizationsTable() {
  const t = useTranslations("OrganizationsPage"); // Fetch translations for the Organizations page

  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: fetchOrganizations,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteOrganization,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      toast.success(t("deleteSuccess")); // Translate the success message
    },
    onError: () => {
      toast.error(t("deleteError")); // Translate the error message
    },
  });

  return (
    <CustomDataTable
      columns={Columns({
        onDelete: deleteMutation.mutate,
        isDeleting: deleteMutation.isPending,
      })}
      data={data?.data || []}
      isLoading={isLoading}
      error={error}
      errorMessage={t("errorMessage")} // Translate the error message for data loading
      filterColumn="name"
      filterPlaceholder={t("filterByName")} // Translate the filter placeholder
      showColumnVisibility={true}
      showPagination={true}
      density="spacious"
      rowsPerPage={10}
      noResultsMessage={t("noResultsMessage")} // Translate the no results message
      totalLabel={t("totalLabel")} // Translate the total label
      totalItems={data?.total}
    />
  );
}
