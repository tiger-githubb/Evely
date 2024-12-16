import { z } from "zod";

export const createOrganizationInvitationSchema = z.object({
  email: z.string().email("L'email n'est pas valide"),
  roleId: z.number().min(1, "Le rôle est requis"),
});

export const updateOrganizationInvitationSchema = z.object({
  roleId: z.number().min(1, "Le rôle est requis"),
});

export type CreateOrganizationInvitationType = z.infer<typeof createOrganizationInvitationSchema>;
export type UpdateOrganizationInvitationType = z.infer<typeof updateOrganizationInvitationSchema>;
