"use client";

import { ActionButtons } from "@/components/shared/table/action-buttons";
import { AvatarCell } from "@/components/shared/table/avatar-cell";
import { BadgeCell } from "@/components/shared/table/badge-cell";
import { DateCell } from "@/components/shared/table/date-cell";
import { Button } from "@/components/ui/button";
import { Organization } from "@/types/api/organization.type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
interface DeleteActions {
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export const columns = ({ onDelete, isDeleting }: DeleteActions): ColumnDef<Organization>[] => [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Organisation
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2 justify-center ">
        <AvatarCell image={row.original.logo} name={row.original.name} description={row.original.description} />
      </div>
    ),
  },
  {
    id: "description",
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "website",
    accessorKey: "website",
    header: "Site web",
    cell: ({ row }) =>
      row.original.website && (
        <a href={row.original.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          {row.original.website}
        </a>
      ),
  },
  {
    id: "members",
    accessorKey: "_count.users",
    header: "Membres",
    cell: ({ row }) => <BadgeCell value={row.original._count.users} variant="secondary" />,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Date de création",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const organization = row.original;

      return (
        <ActionButtons
          onView={() => console.log("View", organization.id)}
          onEdit={() => console.log("Edit", organization.id)}
          onDelete={() => onDelete(organization.id)}
          isDeleting={isDeleting}
          deleteMessage="Êtes-vous sûr de vouloir supprimer cette organisation ?"
        />
      );
    },
  },
];
