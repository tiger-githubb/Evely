import { z } from "zod";

export const createOrganizationUserSchema = (t: (key: string) => string) =>
  z.object({
    email: z.string().email(t("emailInvalid")),
    roleId: z.number().min(1, t("roleIdRequired")),
  });

export type OrganizationUserSchema = ReturnType<typeof createOrganizationUserSchema>;
export type CreateOrganizationUserType = z.infer<OrganizationUserSchema>;
