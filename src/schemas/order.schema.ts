import { z } from "zod";

export const createOrderSchema = (t: (key: string) => string) => {
  const orderCartItemSchema = z.object({
    ticketId: z.number(),
    quantity: z.number().min(1, t("cartQuantityMin")),
  });

  return z.object({
    eventId: z.number(),
    firstName: z.string().min(2, t("firstNameMin")),
    lastName: z.string().min(2, t("lastNameMin")),
    email: z.string().email(t("emailInvalid")),
    indicatif: z.string(),
    phone: z.string(),
    promoCodeId: z.string().optional(),
    cart: z.array(orderCartItemSchema),
  });
};

export type OrderSchema = ReturnType<typeof createOrderSchema>;
export type CreateOrderType = z.infer<OrderSchema>;
