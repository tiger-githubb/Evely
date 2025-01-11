"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CreateOrderType } from "@/schemas/order.schema";
import { createOrderSchema } from "@/schemas/order.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface CheckoutFormProps {
  eventId: number;
  cart: { [key: number]: number };
  onNext: (data: CreateOrderType) => void;
  isLoading?: boolean;
}

export function CheckoutForm({ eventId, cart, onNext, isLoading }: CheckoutFormProps) {
  const form = useForm<CreateOrderType>({
    resolver: zodResolver(createOrderSchema),
    defaultValues: {
      eventId,
      firstName: "",
      lastName: "",
      email: "",
      indicatif: "+228",
      phone: "",
      cart: Object.entries(cart).map(([ticketId, quantity]) => ({
        ticketId: Number(ticketId),
        quantity,
      })),
    },
  });
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onNext)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="indicatif"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Indicatif</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Création de la commande..." : "Vérifier la commande"}
        </Button>
      </form>
    </Form>
  );
}
