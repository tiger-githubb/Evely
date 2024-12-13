"use client";

import { useQuery } from "@tanstack/react-query";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { getOrganizations } from "@/server/services/organizations.service";
import { columns } from "./columns";

export default function Organizationstable() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  return (
    <CustomDataTable
      columns={columns}
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
    />
  );
}
