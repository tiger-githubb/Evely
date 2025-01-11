import { z } from "zod";

export const ticketSchema = z.object({
  name: z.string().min(2, "Le nom du ticket doit contenir au moins 2 caractères"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  price: z
    .number({ invalid_type_error: "Le prix doit être un nombre" })
    .min(0, "Le prix doit être supérieur ou égal à 0"),
  availableQuantity: z
    .number({ invalid_type_error: "La quantité disponible doit être un nombre" })
    .min(1, "La quantité disponible doit être d'au moins 1"),
  minTicketsPerOrder: z
    .number({ invalid_type_error: "Le minimum de tickets par commande doit être un nombre" })
    .min(1, "Le minimum de tickets par commande doit être d'au moins 1"),
  maxTicketsPerOrder: z
    .number({ invalid_type_error: "Le maximum de tickets par commande doit être un nombre" })
    .min(1, "Le maximum de tickets par commande doit être d'au moins 1"),
  saleStartDate: z.string().optional(),
  saleStartTime: z.string().optional(),
  saleEndDate: z.string().optional(),
  saleEndTime: z.string().optional(),
  ticketTypeId: z.number({ invalid_type_error: "Le type de ticket doit être un nombre" }),
});

export const createTicketSchema = ticketSchema;

export type CreateTicketType = z.infer<typeof createTicketSchema>;
