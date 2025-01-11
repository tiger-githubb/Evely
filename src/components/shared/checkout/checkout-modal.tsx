"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { routes } from "@/config/routes";
import { createOrder } from "@/server/services/orders.service";
import { Event } from "@/types/api/event.type";
import { Ticket } from "@/types/api/ticket.types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CheckoutForm } from "./checkout-form";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  event: Event;
  cart: { [key: number]: number };
  tickets: Ticket[];
}

export function CheckoutModal({ isOpen, onClose, eventId, cart, event }: CheckoutModalProps) {
  const router = useRouter();

  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      router.push(routes.events.payment(event.slug, data.data.id));
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Finaliser votre commande</DialogTitle>
        </DialogHeader>
        <CheckoutForm
          eventId={eventId}
          cart={cart}
          onNext={(formData) => createOrderMutation.mutate(formData)}
          isLoading={createOrderMutation.isPending}
        />{" "}
      </DialogContent>
    </Dialog>
  );
}
