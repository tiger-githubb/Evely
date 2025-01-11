"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useOrganizationStore } from "@/stores/organization-store";
import { useState } from "react";
import TicketGenerationForm from "./ticket-generation-form";

interface TicketGenerationFormDialogProps {
  eventSlug: string;
}

export default function TicketGenerationFormDialog({ eventSlug }: TicketGenerationFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { activeOrganization } = useOrganizationStore();
  const organizationSlug = activeOrganization?.slug;

  if (!organizationSlug) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>Créer un ticket</Button>

      {/* Dialog for Ticket Creation Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Créer un ticket</DialogTitle>
          </DialogHeader>
          <TicketGenerationForm organizationSlug={organizationSlug} eventSlug={eventSlug} />
        </DialogContent>
      </Dialog>
    </>
  );
}
