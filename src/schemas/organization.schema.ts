import { z } from "zod";

export const createOrganizationSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),

  logo: z.union([z.instanceof(File), z.string()]),
  coverImage: z.union([z.instanceof(File), z.string()]),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  website: z.string().url("L'URL n'est pas valide").optional(),
});

export type CreateOrganizationType = z.infer<typeof createOrganizationSchema>;
