import { Organization } from "./organization.type";
import { AppUser } from "../user.type";

export interface OrganizationFollower {
  id: number;
  organizationId: number;
  userId: number;
  createdAt: string | Date;
  organization: Organization;
  user: AppUser;
}
