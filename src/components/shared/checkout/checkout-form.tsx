"use client";

import { Button } from "@/components/ui/button";
import { PhoneInput } from "@/components/ui/custom/phone-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { CreateOrderType } from "@/schemas/order.schema";
import { createOrderSchema } from "@/schemas/order.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";

interface CheckoutFormProps {
  eventId: number;
  cart: { [key: number]: number };
  onNextAction: (data: CreateOrderType) => void;
  isLoading?: boolean;
}

export function CheckoutForm({ eventId, cart, onNextAction, isLoading }: CheckoutFormProps) {
  const t = useTranslations("orderForm");

  const form = useForm<CreateOrderType>({
    resolver: zodResolver(createOrderSchema(t)),
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
      <form onSubmit={form.handleSubmit(onNextAction)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("firstNameLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("firstNamePlaceholder")} {...field} />
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
                <FormLabel>{t("lastNameLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("lastNamePlaceholder")} {...field} />
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
              <FormLabel>{t("emailLabel")}</FormLabel>
              <FormControl>
                <Input type="email" placeholder={t("emailPlaceholder")} {...field} />
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
                <FormLabel>{t("indicatifLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("indicatifPlaceholder")} {...field} />
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
                <FormLabel>{t("phoneLabel")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("phonePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <PhoneInput />

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("loadingButton") : t("submitButton")}
        </Button>
      </form>
    </Form>
  );
}
