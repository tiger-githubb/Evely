"use client";

import { useQuery } from "@tanstack/react-query";

import { getOrganizations } from "@/server/services/organizations.service";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default function OrganizationsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Organisations</h1>
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
}
