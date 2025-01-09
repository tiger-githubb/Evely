"use client";

import { Button } from "@/components/ui/button";
import { Event } from "@/types/api/event.type";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";

export const columns = (onView: (slug: string) => void, onDelete: (id: number) => void): ColumnDef<Event>[] => [
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
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }) =>
      row.original.tags.map((tag) => (
        <span key={tag.id} className="bg-muted text-xs px-2 py-1 rounded-full mr-2">
          {tag.name}
        </span>
      )),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const event = row.original;
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => onView(event.slug)}>
            <Eye size={16} />
          </Button>
          <Button variant="destructive" size="sm" onClick={() => onDelete(event.id)}>
            <Trash size={16} />
          </Button>
        </div>
      );
    },
  },
];
