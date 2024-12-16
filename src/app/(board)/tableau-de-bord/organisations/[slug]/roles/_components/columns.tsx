"use client";

import { ActionButtons } from "@/components/shared/table/action-buttons";
import { BadgeCell } from "@/components/shared/table/badge-cell";
import { DateCell } from "@/components/shared/table/date-cell";
import { Button } from "@/components/ui/button";
import { Role } from "@/types/api/role.type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { RoleDetailsDialog } from "./item-details-dialog";
import { RoleForm } from "./role-form";

interface DeleteActions {
  onDelete: (id: number) => void;
  isDeleting: boolean;
  organizationId: string;
}

export const columns = ({ onDelete, isDeleting, organizationId }: DeleteActions): ColumnDef<Role>[] => [
  {
    id: "name",
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Nom
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    id: "editable",
    accessorKey: "editable",
    header: "Type",
    cell: ({ row }) => (
      <BadgeCell
        value={row.original.editable ? "Personnalisé" : "Système"}
        variant={row.original.editable ? "default" : "secondary"}
      />
    ),
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Date de création",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
  {
    id: "actions",
    cell: ({ row }) => <ActionCell role={row.original} onDelete={onDelete} isDeleting={isDeleting} organizationId={organizationId} />,
  },
];

function ActionCell({
  role,
  onDelete,
  isDeleting,
  organizationId,
}: {
  role: Role;
  onDelete: (id: number) => void;
  isDeleting: boolean;
  organizationId: string;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="flex gap-2">
        <ActionButtons
          onView={() => setShowDetails(true)}
          onDelete={role.editable ? () => onDelete(role.id) : undefined}
          isDeleting={isDeleting}
          deleteMessage="Êtes-vous sûr de vouloir supprimer ce rôle ?"
        />
        {role.editable && <RoleForm organizationId={organizationId} role={role} />}
      </div>
      <RoleDetailsDialog roleId={role.id.toString()} open={showDetails} onOpenChange={setShowDetails} />
    </>
  );
}
