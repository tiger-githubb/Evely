"use client";

import { Button } from "@/components/ui/button";
import { Event } from "@/types/api/event.type";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash, Upload, RotateCcw } from "lucide-react";

export const columns = (
  onView: (slug: string) => void,
  onDelete: (id: number) => void,
  onPublishToggle: (id: number, draft: boolean) => void
): ColumnDef<Event>[] => [
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }) => <span className="font-medium">{row.original.title}</span>,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    accessorKey: "summary",
    header: "Résumé",
    cell: ({ row }) => (
      <span title={row.original.summary} className="truncate">
        {row.original.summary.slice(0, 50)}...
      </span>
    ),
  },
  {
    accessorKey: "status",
    header: "Statut",
    cell: ({ row }) => {
      const isDraft = row.original.draft;
      return (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            isDraft ? "bg-yellow-200 text-yellow-800" : "bg-green-200 text-green-800"
          }`}
        >
          {isDraft ? "Brouillon" : "Publié"}
        </span>
      );
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
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
            <Button variant="primary" size="sm" onClick={() => onPublishToggle(event.id, false)}>
              <Upload size={16} />
              <span className="ml-1">Publier</span>
            </Button>
          ) : (
            <Button variant="secondary" size="sm" onClick={() => onPublishToggle(event.id, true)}>
              <RotateCcw size={16} />
              <span className="ml-1">Dépublier</span>
            </Button>
          )}
        </div>
      );
    },
  },
];
