import { z } from "zod";

export const createEventSchema = (t: (key: string) => string) => ({
  create: z.object({
    title: z.string().min(3, t("titleMin")),
    content: z.string().min(10, t("contentMin")),
    summary: z.string().min(10, t("summaryMin")),
    date: z.coerce.date(),
    endTime: z.string().optional(),
    startTime: z.string().optional(),
    typeId: z.number(),
    categoryId: z.number(),
    languageId: z.number(),
    formatId: z.number(),
    tags: z.array(z.number()).optional(),
    newTags: z.array(z.string()).optional(),
    faq: z
      .array(
        z.object({
          question: z.string().min(5, t("faqQuestionMin")),
          response: z.string().min(5, t("faqResponseMin")),
        })
      )
      .optional(),
    agendas: z
      .array(
        z.object({
          title: z.string().min(2, t("agendaTitleMin")),
          sessions: z.array(
            z.object({
              title: z.string().min(2, t("sessionTitleMin")),
              startTime: z.string(),
              endTime: z.string(),
            })
          ),
        })
      )
      .optional(),
    location: z
      .object({
        name: z.string().min(2, t("locationNameMin")),
        lat: z.string(),
        long: z.string(),
      })
      .optional(),
    covers: z.array(z.instanceof(File)).optional(),
    video: z.string().optional(),
  }),
  update: z.object({
    title: z.string().min(3, t("titleMin")).optional(),
    content: z.string().min(10, t("contentMin")).optional(),
    summary: z.string().min(10, t("summaryMin")).optional(),
    date: z.coerce.date().optional(),
    endTime: z.string().optional(),
    startTime: z.string().optional(),
    typeId: z.number().optional(),
    categoryId: z.number().optional(),
    languageId: z.number().optional(),
    formatId: z.number().optional(),
    tags: z.array(z.number()).optional(),
    newTags: z.array(z.string()).optional(),
    faq: z
      .array(
        z.object({
          question: z.string().min(5, t("faqQuestionMin")),
          response: z.string().min(5, t("faqResponseMin")),
        })
      )
      .optional(),
    agendas: z
      .array(
        z.object({
          title: z.string().min(2, t("agendaTitleMin")),
          sessions: z.array(
            z.object({
              title: z.string().min(2, t("sessionTitleMin")),
              startTime: z.string(),
              endTime: z.string(),
            })
          ),
        })
      )
      .optional(),
    location: z
      .object({
        name: z.string().min(2, t("locationNameMin")),
        lat: z.string(),
        long: z.string(),
      })
      .optional(),
    covers: z.array(z.instanceof(File)).optional(),
    video: z.string().optional(),
  }),
});

export type EventSchemas = ReturnType<typeof createEventSchema>;
export type CreateEventType = z.infer<EventSchemas["create"]>;
export type UpdateEventType = z.infer<EventSchemas["update"]>;
