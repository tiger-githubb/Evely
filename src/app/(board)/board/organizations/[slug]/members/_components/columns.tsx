"use client";

import { ActionButtons } from "@/components/shared/table/action-buttons";
import { DateCell } from "@/components/shared/table/date-cell";
import InfoCard from "@/components/shared/table/info-cell";
import { Button } from "@/components/ui/button";
import { OrganizationUser } from "@/types/api/organization-user.type";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { MemberDetailsDialog } from "./item-details-dialog";

interface DeleteActions {
  onDelete: (userId: number) => void;
  isDeleting: boolean;
}

export const columns = ({ onDelete, isDeleting }: DeleteActions): ColumnDef<OrganizationUser>[] => [
  {
    id: "user",
    accessorKey: "user.firstName",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Membre
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <InfoCard name={`${row.original.user.firstName} ${row.original.user.lastName}`} description={row.original.user.email} />
    ),
  },
  {
    id: "role",
    accessorKey: "role.name",
    header: "Rôle",
  },
  {
    id: "createdAt",
    accessorKey: "createdAt",
    header: "Date d'ajout",
    cell: ({ row }) => <DateCell date={row.original.createdAt} />,
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ActionCell
        member={row.original}
        onDelete={onDelete}
        isDeleting={isDeleting}
        organizationId={row.original.organizationId.toString()}
      />
    ),
  },
];

function ActionCell({
  member,
  onDelete,
  isDeleting,
  organizationId,
}: {
  member: OrganizationUser;
  onDelete: (userId: number) => void;
  isDeleting: boolean;
  organizationId: string;
}) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <ActionButtons
        onView={() => setShowDetails(true)}
        onDelete={() => onDelete(member.userId)}
        isDeleting={isDeleting}
        deleteMessage="Êtes-vous sûr de vouloir retirer ce membre ?"
      />
      <MemberDetailsDialog
        memberId={member.id.toString()}
        organizationId={organizationId}
        open={showDetails}
        onOpenChange={setShowDetails}
      />
    </>
  );
}
