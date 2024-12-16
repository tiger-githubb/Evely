import { Role } from "./role.type";

export interface Organization {
  id: number;
  name: string;
  logo: string;
  coverImage: string;
  description: string;
  website?: string;
  createdAt: string;
  _count: {
    users: number;
    followers: number;
  };
  roles: OrganizationRole[];
}

interface OrganizationRole {
  role: Role;
}
