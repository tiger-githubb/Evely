"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { routes } from "@/config/routes";
import { createOrder } from "@/server/services/orders.service";
import { Event } from "@/types/api/event.type";
import { Ticket } from "@/types/api/ticket.types";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { CheckoutForm } from "./checkout-form";

interface CheckoutModalProps {
  isOpen: boolean;
  onCloseAction: () => void; // Renamed from onClose
  eventId: number;
  event: Event;
  cart: { [key: number]: number };
  tickets: Ticket[];
}

export function CheckoutModal({ isOpen, onCloseAction, eventId, cart, event }: CheckoutModalProps) {
  const t = useTranslations("checkoutModal");
  const router = useRouter();

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      router.push(routes.events.payment(event.slug, data.data.uid));
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onCloseAction}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
        </DialogHeader>
        <CheckoutForm
          eventId={eventId}
          cart={cart}
          onNextAction={(formData) => createOrderMutation.mutate(formData)}
          isLoading={createOrderMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
