import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import Link from "next/link";
import EventsTable from "./_components/data-table";

interface EventPageProps {
  params: Promise<{
    organizationSlug: string;
  }>;
}

export default async function EventsPage({ params }: EventPageProps) {
  const { organizationSlug } = await params;

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mb-4">Liste des événements</h1>
      <Link href={routes.board.workspace.events.add(organizationSlug)}>
        <Button>Créer un événement</Button>
      </Link>
      <EventsTable/>
    </div>
  );
}
