import { Event } from "./event.type";
import { Role } from "./role.type";

export interface Organization {
  id: number;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  description: string;
  website?: string;
  createdAt: string;
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  _count: {
    users: number;
    followers: number;
    events: number;
  };
  roles: OrganizationRole[];
  upcomingEvents?: Event[];
  pastEvents?: Event[];
}

interface OrganizationRole {
  role: Role;
}
