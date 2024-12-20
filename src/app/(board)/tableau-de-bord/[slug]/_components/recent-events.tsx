"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { generateDashboardStats } from "@/config/data";
import { useOrganizationStore } from "@/stores/organization-store";
import { Event } from "@/types/api/event.type";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const eventColumns: ColumnDef<Event, string>[] = [
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(new Date(row.original.date), "dd MMMM yyyy", { locale: fr }),
  },

  {
    accessorKey: "category.name",
    header: "Catégorie",
    cell: ({ row }) => row.original.category.name,
  },
];

export function RecentEvents() {
  const { activeOrganization } = useOrganizationStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats", activeOrganization?.id],
    queryFn: () => generateDashboardStats(activeOrganization?.id || 0),
    enabled: !!activeOrganization?.id,
  });

  if (!activeOrganization) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Événements récents</h2>
        <div className="text-center py-4">Veuillez sélectionner une organisation</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">Événements récents</h2>
      <CustomDataTable
        columns={eventColumns}
        data={data?.recentEvents || []}
        isLoading={isLoading}
        error={error}
        errorMessage="Une erreur est survenue lors du chargement des événements récents."
        showPagination={false}
        showFilterInput={false}
        showColumnVisibility={false}
        rowsPerPage={5}
        filterColumn="title"
      />
    </div>
  );
}
