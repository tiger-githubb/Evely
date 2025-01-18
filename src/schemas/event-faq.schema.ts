import { z } from "zod";

export const createEventFaqSchema = (t: (key: string) => string) =>
  z.object({
    question: z.string().min(1, t("questionRequired")),
    response: z.string().min(1, t("responseRequired")),
    eventId: z.number().positive(t("eventIdRequired")),
  });

export type EventFaqSchema = ReturnType<typeof createEventFaqSchema>;
export type CreateEventFaqType = z.infer<EventFaqSchema>;
export type UpdateEventFaqType = Partial<CreateEventFaqType>;
