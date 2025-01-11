import { z } from "zod";

const orderCartItemSchema = z.object({
  ticketId: z.number(),
  quantity: z.number().min(1),
});

export const createOrderSchema = z.object({
  eventId: z.number(),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  indicatif: z.string(),
  phone: z.string(),
  promoCodeId: z.string().optional(),
  cart: z.array(orderCartItemSchema),
});

export type CreateOrderType = z.infer<typeof createOrderSchema>;
