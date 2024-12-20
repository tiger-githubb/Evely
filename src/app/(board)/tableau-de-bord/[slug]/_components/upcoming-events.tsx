"use client";

import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { generateDashboardStats } from "@/config/data";
import { useOrganizationStore } from "@/stores/organization-store";
import { Event } from "@/types/api/event.type";
import { useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Loader } from "lucide-react";

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

export function UpcomingEvents() {
  const { activeOrganization } = useOrganizationStore();

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats", activeOrganization?.id],
    queryFn: () => generateDashboardStats(activeOrganization?.id || 0),
    enabled: !!activeOrganization?.id,
  });

  if (isLoading) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Événements à venir</h2>
        <div className="flex justify-center items-center py-4">
          <Loader className="w-6 h-6" />
        </div>
      </div>
    );
  }

  if (!activeOrganization?.id || activeOrganization.id === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Événements à venir</h2>
        <div className="text-center py-4">Veuillez sélectionner une organisation</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">Événements à venir</h2>
      <CustomDataTable
        columns={eventColumns}
        data={data?.upcomingEvents || []}
        isLoading={isLoading}
        error={error}
        errorMessage="Une erreur est survenue lors du chargement des événements à venir."
        showPagination={false}
        showFilterInput={false}
        showColumnVisibility={false}
        rowsPerPage={5}
        filterColumn="title"
      />
    </div>
  );
}
