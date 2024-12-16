import { z } from "zod";

export const createOrganizationUserSchema = z.object({
  email: z.string().email("L'email n'est pas valide"),
  roleId: z.number().min(1, "Le rôle est requis"),
});

export type CreateOrganizationUserType = z.infer<typeof createOrganizationUserSchema>;
