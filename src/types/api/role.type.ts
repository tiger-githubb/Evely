import { PermissionModule } from "./permission-module.type";

export interface Role {
  createdAt: string;
  id: number;
  name: string;
  editable: boolean;
  permissionsPerModule: PermissionModule[];
}
