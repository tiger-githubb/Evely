import { AppUser } from "../user.type";
import { Organization } from "./organization.type";
import { Role } from "./role.type";

export interface OrganizationInvitation {
  createdAt: string | Date;
  id: number;
  email: string;
  organizationId: number;
  roleId: number;
  invitedById: number;
  accepted: boolean;
  status: "pending" | "accepted" | "rejected";
  organization: Organization;
  role: Role;
  invitedBy: AppUser;
}
