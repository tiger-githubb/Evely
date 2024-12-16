"use client";

import { ActionButtons } from "@/components/shared/table/action-buttons";
import { BadgeCell } from "@/components/shared/table/badge-cell";
import { DateCell } from "@/components/shared/table/date-cell";
import { Button } from "@/components/ui/button";
import { OrganizationInvitation } from "@/types/api/organization-invitation.type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

interface DeleteActions {
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export const columns = ({ onDelete, isDeleting }: DeleteActions): ColumnDef<OrganizationInvitation>[] => [
  {
    id: "email",
    accessorKey: "email",
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
    id: "role",
    accessorKey: "role.name",
    header: "Rôle",
    cell: ({ row }) => <BadgeCell value={row.original.role.name} variant="outline" />,
  },
  {
    id: "status",
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => <BadgeCell value={row.original.status} variant="secondary" />,
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Date d'invitation",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionButtons
        onDelete={() => onDelete(row.original.id)}
        isDeleting={isDeleting}
        deleteMessage="Êtes-vous sûr de vouloir supprimer cette invitation ?"
      />
    ),
  },
];
