"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useOrganizationStore } from "@/stores/organization-store";
import { useTranslations } from "next-intl";
import { useState } from "react";
import TicketGenerationForm from "./ticket-generation-form";

interface TicketGenerationFormDialogProps {
  eventSlug: string;
}

export default function TicketGenerationFormDialog({ eventSlug }: TicketGenerationFormDialogProps) {
  const [open, setOpen] = useState(false);
  const { activeOrganization } = useOrganizationStore();
  const organizationSlug = activeOrganization?.slug;
  const t = useTranslations("tickets.ticketGeneration");

  if (!organizationSlug) {
    return null;
  }

  return (
    <>
      <Button onClick={() => setOpen(true)}>{t("createTicket")}</Button>

      {/* Dialog for Ticket Creation Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{t("createTicket")}</DialogTitle>
          </DialogHeader>
          <TicketGenerationForm organizationSlug={organizationSlug} eventSlug={eventSlug} />
        </DialogContent>
      </Dialog>
    </>
  );
}
