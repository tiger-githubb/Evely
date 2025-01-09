"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {  deleteEvent, fetchOrganizationEvents } from "@/server/services/events.service";
import { CustomDataTable } from "@/components/ui/custom/custom-table";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import { Eye, Trash } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";

const columns = (onView: (slug: string) => void, onDelete: (id: number) => void): ColumnDef<any, any>[] => [
  {
    accessorKey: "title",
    header: "Titre",
    cell: ({ row }: { row: { original: { title: string } } }) => (
      <span className="font-medium">{row.original.title}</span>
    ),
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }: { row: { original: { date: string } } }) => new Date(row.original.date).toLocaleDateString(),
  },
  {
    accessorKey: "summary",
    header: "Résumé",
    cell: ({ row }: { row: { original: { summary: string } } }) => (
      <span title={row.original.summary} className="truncate">
        {row.original.summary.slice(0, 50)}...
      </span>
    ),
  },
  {
    accessorKey: "tags",
    header: "Tags",
    cell: ({ row }: { row: { original: { tags: { id: number; name: string }[] } } }) =>
      row.original.tags.map((tag: { id: number; name: string }) => (
        <span key={tag.id} className="bg-muted text-xs px-2 py-1 rounded-full mr-2">
          {tag.name}
        </span>
      )),
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }: { row: { original: { slug: string; id: number } } }) => {
      const event = row.original;
      return (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(event.slug)}
          >
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

export default function EventsPage({ params }: { params: { slug: string } }) {
  const organizationSlug = params.slug;
  const queryClient = useQueryClient();
  const router = useRouter();

  const { data, isLoading, error } = useQuery({
    queryKey: ["organization-events", organizationSlug],
    queryFn: () => fetchOrganizationEvents(organizationSlug),
  });

  const deleteMutation = useMutation({
    mutationFn: (eventId: number) => deleteEvent(organizationSlug, eventId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organization-events"] });
      toast.success("Événement supprimé avec succès");
    },
    onError: () => toast.error("Une erreur est survenue lors de la suppression"),
  });

  const handleDelete = (eventId: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet événement ?")) {
      deleteMutation.mutate(eventId);
    }
  };

  const handleView = (eventSlug: string) => {
    router.push(routes.board.workspace.events.show(organizationSlug, eventSlug));
  };

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mb-4">Liste des événements</h1>
      <Button onClick={() => router.push(routes.board.workspace.events.add(organizationSlug))}>
        Créer un événement
      </Button>
      <CustomDataTable
        columns={columns(handleView, handleDelete)}
        data={data?.data || []}
        isLoading={isLoading}
        error={error}
        errorMessage="Une erreur est survenue lors du chargement des événements."
        rowsPerPage={10}
        noResultsMessage="Aucun événement trouvé."
      />
    </div>
  );
}
