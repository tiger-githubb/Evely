"use client";

import { ActionButtons } from "@/components/shared/table/action-buttons";
import { DateCell } from "@/components/shared/table/date-cell";
import { Button } from "@/components/ui/button";
import { OrganizationFollower } from "@/types/api/organization-follower.type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface DeleteActions {
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export const columns = ({ onDelete, isDeleting }: DeleteActions): ColumnDef<OrganizationFollower>[] => [
  {
    id: "user",
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "name",
    header: "Nom",
    cell: ({ row }) => (
      <span>
        {row.original.user.firstName} {row.original.user.lastName}
      </span>
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Date d'abonnement",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionButtons
        onDelete={() => onDelete(row.original.id)}
        isDeleting={isDeleting}
        deleteMessage="Êtes-vous sûr de vouloir supprimer ce follower ?"
      />
    ),
  },
];
