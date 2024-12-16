import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  editable: z.boolean().default(true),
  organizationId: z.number(),
  permissionsPerModule: z.array(
    z.object({
      moduleId: z.number(),
      permissionId: z.number(),
    })
  ),
});

export const updateRoleSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  permissionsPerModule: z.array(
    z.object({
      moduleId: z.number(),
      permissionId: z.number(),
    })
  ),
});

export type CreateRoleType = z.infer<typeof createRoleSchema>;
export type UpdateRoleType = z.infer<typeof updateRoleSchema>;
