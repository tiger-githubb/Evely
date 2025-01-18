import { z } from "zod";

export const createOrganizationInvitationSchema = (t: (key: string) => string) => ({
  create: z.object({
    email: z.string().email(t("emailInvalid")),
    roleId: z.number().min(1, t("roleIdRequired")),
  }),
  update: z.object({
    roleId: z.number().min(1, t("roleIdRequired")),
  }),
});

export type OrganizationInvitationSchemas = ReturnType<typeof createOrganizationInvitationSchema>;
export type CreateOrganizationInvitationType = z.infer<OrganizationInvitationSchemas["create"]>;
export type UpdateOrganizationInvitationType = z.infer<OrganizationInvitationSchemas["update"]>;
