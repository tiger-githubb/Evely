"use client";

import { ActionButtons } from "@/components/shared/table/action-buttons";
import { BadgeCell } from "@/components/shared/table/badge-cell";
import { DateCell } from "@/components/shared/table/date-cell";
import InfoCard from "@/components/shared/table/info-cell";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { Organization } from "@/types/api/organization.type";
import { getImageUrl } from "@/utils/image-utils";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { useTranslations } from "next-intl"; // Import for translations
import { useState } from "react";
import { OrganizationDetailsDialog } from "./item-details-dialog";

interface DeleteActions {
  onDelete: (id: number) => void;
  isDeleting: boolean;
}

export const Columns = ({ onDelete, isDeleting }: DeleteActions): ColumnDef<Organization>[] => {
  const t = useTranslations("OrganizationPage"); // Fetch translations for the organization page

  return [
    {
      id: "name",
      accessorKey: "name",
      size: 400,
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            {t("organization")} {/* Use the translation for "Organization" */}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <InfoCard imageSrc={getImageUrl(row.original.logo)} name={row.original.name} description={row.original.description} />
      ),
    },

    {
      id: "members",
      accessorKey: "_count.users",
      header: t("members"), // Translate "Members"
      size: 30,
      cell: ({ row }) => <BadgeCell value={row.original._count.users} variant="secondary" />,
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: t("createdAt"), // Translate "Date Created"
      cell: ({ row }) => <DateCell date={row.original.createdAt} />,
    },
    {
      size: 30,
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => <ActionCell organization={row.original} onDelete={onDelete} isDeleting={isDeleting} />,
    },
  ];
};

function ActionCell({
  organization,
  onDelete,
  isDeleting,
}: {
  organization: Organization;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}) {
  const [showDetails, setShowDetails] = useState(false);
  const t = useTranslations("OrganizationPage"); // Fetch translations for the actions

  return (
    <>
      <ActionButtons
        onView={() => setShowDetails(true)}
        onEdit={routes.board.organization.edit(organization.id.toString())}
        onDelete={() => onDelete(organization.id)}
        isDeleting={isDeleting}
        deleteMessage={t("deleteMessage")} // Translate the delete confirmation message
      />
      <OrganizationDetailsDialog organizationId={organization.id.toString()} open={showDetails} onOpenChange={setShowDetails} />
    </>
  );
}
