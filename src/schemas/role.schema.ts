import { z } from "zod";

export const createRoleSchema = (t: (key: string) => string) => ({
  create: z.object({
    name: z.string().min(2, t("nameMin")),
    editable: z.boolean().default(true),
    organizationId: z.number(),
    permissionsPerModule: z.array(
      z.object({
        moduleId: z.number(),
        permissionId: z.number(),
      })
    ),
  }),
  update: z.object({
    name: z.string().min(2, t("nameMin")),
    permissionsPerModule: z.array(
      z.object({
        moduleId: z.number(),
        permissionId: z.number(),
      })
    ),
  }),
});

export type RoleSchemas = ReturnType<typeof createRoleSchema>;
export type CreateRoleType = z.infer<RoleSchemas["create"]>;
export type UpdateRoleType = z.infer<RoleSchemas["update"]>;
