import { z } from "zod";

const eventSessionSchema = z.object({
  title: z.string().min(2, "Le titre de la session doit contenir au moins 2 caractères"),
  startTime: z.string(),
  endTime: z.string(),
});

const eventAgendaSchema = z.object({
  title: z.string().min(2, "Le titre de l'agenda doit contenir au moins 2 caractères"),
  sessions: z.array(eventSessionSchema),
});

const eventLocationSchema = z.object({
  name: z.string().min(2, "Le nom du lieu doit contenir au moins 2 caractères"),
  lat: z.string(),
  long: z.string(),
});

const eventFAQSchema = z.object({
  question: z.string().min(5, "La question doit contenir au moins 5 caractères"),
  response: z.string().min(5, "La réponse doit contenir au moins 5 caractères"),
});

export const createEventSchema = z.object({
  title: z.string().min(3, "Le titre doit contenir au moins 3 caractères"),
  content: z.string().min(10, "Le contenu doit contenir au moins 10 caractères"),
  summary: z.string().min(10, "Le résumé doit contenir au moins 10 caractères"),
  date: z.coerce.date(),
  endTime: z.string().optional(),
  startTime: z.string().optional(),
  typeId: z.number(),
  categoryId: z.number(),
  languageId: z.number(),
  formatId: z.number(),
  tags: z.array(z.number()).optional(),
  newTags: z.array(z.string()).optional(),
  faq: z.array(eventFAQSchema).optional(),
  agendas: z.array(eventAgendaSchema).optional(),
  location: eventLocationSchema.optional(),
  covers: z.array(z.instanceof(File)).optional(),
  video: z.instanceof(File).optional(),
});

export type CreateEventType = z.infer<typeof createEventSchema>;
