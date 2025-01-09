"use client";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { useRouter } from "next/navigation";
import EventsTable from "./_components/data-table";

export default function EventsPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const organizationSlug = params.slug;

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mb-4">Liste des événements</h1>
      <Button onClick={() => router.push(routes.board.workspace.events.add(organizationSlug))}>Créer un événement</Button>
      <EventsTable organizationSlug={organizationSlug} />
    </div>
  );
}
