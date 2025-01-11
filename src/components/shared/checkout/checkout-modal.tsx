"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Ticket } from "@/types/api/ticket.types";
import { useState } from "react";
import { CheckoutCart } from "./checkout-cart";
import { CheckoutForm } from "./checkout-form";
import { CheckoutSummary } from "./checkout-summary";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: number;
  cart: { [key: number]: number };
  tickets: Ticket[];
}

export function CheckoutModal({ isOpen, onClose, eventId, cart, tickets }: CheckoutModalProps) {
  const [activeTab, setActiveTab] = useState("cart");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Finaliser votre commande</DialogTitle>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="cart">Panier</TabsTrigger>
            <TabsTrigger value="info">Informations</TabsTrigger>
            <TabsTrigger value="summary">Résumé</TabsTrigger>
          </TabsList>
          <TabsContent value="cart">
            <CheckoutCart tickets={tickets} cart={cart} onNext={() => setActiveTab("info")} />
          </TabsContent>
          <TabsContent value="info">
            <CheckoutForm eventId={eventId} cart={cart} onNext={() => setActiveTab("summary")} />
          </TabsContent>
          <TabsContent value="summary">
            <CheckoutSummary onConfirm={onClose} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
