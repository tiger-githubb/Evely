"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import TicketGenerationForm from "./ticket-generation-form";

interface TicketGenerationFormDialogProps {
  organizationSlug: string;
  eventSlug: string;
}

export default function TicketGenerationFormDialog({
  organizationSlug,
  eventSlug,
}: TicketGenerationFormDialogProps) {
  const [open, setOpen] = useState(false);

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
