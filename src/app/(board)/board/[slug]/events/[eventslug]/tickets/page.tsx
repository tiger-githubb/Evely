import TicketGenerationFormDialog from "./_components/ticket-generation-form-dialog";
import TicketList from "./_components/ticket-list";

interface TicketsPageProps {
  params: Promise<{
    eventslug: string;
  }>;
}

export default async function TicketsPage({ params }: TicketsPageProps) {
  const { eventslug } = await params;

  return (
    <div className="space-y-6">
      {/* Ticket Generation Form Dialog */}
      <TicketGenerationFormDialog eventSlug={eventslug} />

      {/* Ticket List */}
      <TicketList eventSlug={eventslug} />
    </div>
  );
}
