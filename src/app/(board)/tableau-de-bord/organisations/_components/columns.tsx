"use client";

import { Organization } from "@/types/api/organization.type";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Organization>[] = [
  {
    accessorKey: "name",
    header: "Nom",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "website",
    header: "Site web",
  },
  {
    accessorKey: "_count.users",
    header: "Membres",
  },
  {
    accessorKey: "createdAt",
    header: "Date de création",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
];
