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
import { parsePhoneNumber } from "react-phone-number-input";

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
      indicatif: "",
      phone: "",
      cart: Object.entries(cart).map(([ticketId, quantity]) => ({
        ticketId: Number(ticketId),
        quantity,
      })),
    },
  });

  // Handle phone input parsing
  const handlePhoneChange = (value: string | undefined) => {
    if (value) {
      const parsedPhone = parsePhoneNumber(value);
      if (parsedPhone) {
        // Update form values with parsed country code and national number
        form.setValue("indicatif", `+${parsedPhone.countryCallingCode}`);
        form.setValue("phone", parsedPhone.nationalNumber);
      }
    } else {
      form.setValue("indicatif", "");
      form.setValue("phone", "");
    }
  };

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

        <div className="grid gap-4">
          <FormItem>
            <FormLabel>{t("indicatifLabel")}</FormLabel>
            <FormControl>
              {/* TODO: Check the schema of the phone input */}
              <PhoneInput
                value={form.getValues("indicatif") + form.getValues("phone")}
                onChange={handlePhoneChange}
                className="w-full"
                placeholder={t("phonePlaceholder")}
                defaultCountry="TG"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? t("loadingButton") : t("submitButton")}
        </Button>
      </form>
    </Form>
  );
}
