import { Organization } from "./organization.type";
import { Role } from "./role.type";
import { AppUser } from "../user.type";

export interface OrganizationInvitation {
  createdAt: string | null;
  id: number;
  email: string;
  organizationId: number;
  roleId: number;
  invitedById: number;
  organization: Organization;
  role: Role;
  invitedBy: AppUser;
}
