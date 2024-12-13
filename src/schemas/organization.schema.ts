import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createOrganizationSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  logo: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Le fichier doit faire moins de 5MB")
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Format accepté: .jpg, .jpeg, .png et .webp"),
  coverImage: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Le fichier doit faire moins de 5MB")
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), "Format accepté: .jpg, .jpeg, .png et .webp"),
  description: z.string().min(10, "La description doit contenir au moins 10 caractères"),
  website: z.string().url("L'URL n'est pas valide").optional(),
});

export type CreateOrganizationSchema = z.infer<typeof createOrganizationSchema>;
