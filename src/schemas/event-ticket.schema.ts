import { z } from "zod";

export const createTicketSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t("nameMin")),
    description: z.string().min(10, t("descriptionMin")),
    price: z.number({ invalid_type_error: t("priceType") }).min(0, t("priceMin")),
    availableQuantity: z.number({ invalid_type_error: t("availableQuantityType") }).min(1, t("availableQuantityMin")),
    minTicketsPerOrder: z.number({ invalid_type_error: t("minTicketsType") }).min(1, t("minTicketsMin")),
    maxTicketsPerOrder: z.number({ invalid_type_error: t("maxTicketsType") }).min(1, t("maxTicketsMin")),
    saleStartDate: z.string().optional(),
    saleStartTime: z.string().optional(),
    saleEndDate: z.string().optional(),
    saleEndTime: z.string().optional(),
    ticketTypeId: z.number({ invalid_type_error: t("ticketTypeIdType") }),
  });

export type TicketSchema = ReturnType<typeof createTicketSchema>;
export type CreateTicketType = z.infer<TicketSchema>;
