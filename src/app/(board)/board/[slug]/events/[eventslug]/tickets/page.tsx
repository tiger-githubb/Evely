"use client";

import TicketGenerationFormDialog from "./_components/ticket-generation-form-dialog";
import TicketList from "./_components/ticket-list";

interface TicketsPageProps {
  params: {
    slug: string;
    eventslug: string;
  };
}

export default function TicketsPage({ params }: TicketsPageProps) {
  const { slug, eventslug } = params;

  return (
    <div className="space-y-6">

      {/* Ticket Generation Form Dialog */}
      <TicketGenerationFormDialog organizationSlug={slug} eventSlug={eventslug} />

      {/* Ticket List */}
      <TicketList organizationSlug={slug} eventSlug={eventslug} />
    </div>
  );
}
