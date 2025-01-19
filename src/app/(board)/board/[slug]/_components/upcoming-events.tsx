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
import { useTranslations } from "next-intl";

export function UpcomingEvents() {
  const { activeOrganization } = useOrganizationStore();
  const t = useTranslations("upcomingEvents"); // Namespace for translations

  // Define columns with translated headers
  const eventColumns: ColumnDef<Event, string>[] = [
    {
      accessorKey: "title",
      header: t("titleColumn"), // Translate the column header
      cell: ({ row }) => <div className="font-medium">{row.original.title}</div>,
    },
    {
      accessorKey: "date",
      header: t("dateColumn"), // Translate the column header
      cell: ({ row }) => format(new Date(row.original.date), "dd MMMM yyyy", { locale: fr }),
    },
    {
      accessorKey: "category.name",
      header: t("categoryColumn"), // Translate the column header
      cell: ({ row }) => row.original.category.name,
    },
  ];

  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-stats", activeOrganization?.id],
    queryFn: () => generateDashboardStats(activeOrganization?.id || 0),
    enabled: !!activeOrganization?.id,
  });

  if (isLoading) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
        <div className="flex justify-center items-center py-4">
          <Loader className="w-6 h-6" />
        </div>
      </div>
    );
  }

  if (!activeOrganization?.id || activeOrganization.id === 0) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
        <div className="text-center py-4">{t("selectOrganization")}</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">{t("title")}</h2>
      <CustomDataTable
        columns={eventColumns}
        data={data?.upcomingEvents || []}
        isLoading={isLoading}
        error={error}
        errorMessage={t("errorLoading")}
        showPagination={false}
        showFilterInput={false}
        showColumnVisibility={false}
        rowsPerPage={5}
        filterColumn="title"
      />
    </div>
  );
}
