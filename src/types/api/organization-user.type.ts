import { Organization } from "./organization.type";
import { Role } from "./role.type";

export interface OrganizationUser {
  createdAt: string;
  id: number;
  organizationId: number;
  userId: number;
  roleId: number;
  organization: Organization;
  user: {
    createdAt: string;
    id: number;
    email: string;
    lastName: string;
    firstName: string;
  };
  role: Role;
}
