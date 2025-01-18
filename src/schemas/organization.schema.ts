import { z } from "zod";

export const createOrganizationSchema = (t: (key: string) => string) =>
  z.object({
    name: z.string().min(2, t("nameMin")),
    logo: z.union([z.instanceof(File), z.string()]),
    coverImage: z.union([z.instanceof(File), z.string()]),
    description: z.string().min(10, t("descriptionMin")),
    website: z.string().url(t("websiteInvalid")).optional(),
  });

export type OrganizationSchema = ReturnType<typeof createOrganizationSchema>;
export type CreateOrganizationType = z.infer<OrganizationSchema>;
