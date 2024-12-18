import { z } from "zod";

export const createEventFaqSchema = z.object({
  question: z.string().min(1, "La question est requise"),
  response: z.string().min(1, "La réponse est requise"),
  eventId: z.number().positive("L'ID de l'événement est requis"),
});

export const updateEventFaqSchema = createEventFaqSchema.partial();

export type CreateEventFaqType = z.infer<typeof createEventFaqSchema>;
export type UpdateEventFaqType = z.infer<typeof updateEventFaqSchema>;
