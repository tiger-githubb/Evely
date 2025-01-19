"use client";

import { Button } from "@/components/ui/button";
import { Event } from "@/types/api/event.type";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, RotateCcw, Trash, Upload } from "lucide-react";
import { useTranslations } from "next-intl";

export const Columns = (
  onView: (slug: string) => void,
  onDelete: (id: number) => void,
  onPublishToggle: (id: number, draft: boolean) => void
): ColumnDef<Event>[] => {
  const t = useTranslations("eventTable");

  return [
    {
      accessorKey: "title",
      header: t("title"),
      size: 300,
      cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
    },
    {
      accessorKey: "summary",
      header: t("summary"),
      cell: ({ row }) => (
        <span title={row.original.summary} className="truncate">
          {row.original.summary.slice(0, 50)}...
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: t("status"),
      size: 50,
      cell: ({ row }) => {
        const isDraft = row.original.draft;
        return (
          <span
            className={`px-2 py-1 text-xs font-semibold rounded-full ${
              isDraft ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"
            }`}
          >
            {isDraft ? t("draft") : t("published")}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: t("actions"),
      cell: ({ row }) => {
        const event = row.original;
        const isDraft = event.draft;

        return (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => onView(event.slug)}>
              <Eye size={16} />
            </Button>
            <Button variant="destructive" size="sm" onClick={() => onDelete(event.id)}>
              <Trash size={16} />
            </Button>
            {isDraft ? (
              <Button variant="default" size="sm" onClick={() => onPublishToggle(event.id, false)}>
                <Upload size={16} />
                <span className="ml-1">{t("publish")}</span>
              </Button>
            ) : (
              <Button variant="secondary" size="sm" onClick={() => onPublishToggle(event.id, true)}>
                <RotateCcw size={16} />
                <span className="ml-1">{t("unpublish")}</span>
              </Button>
            )}
          </div>
        );
      },
    },
  ];
};
