export interface AppUser {
  id: number;
  email: string;
  lastName: string;
  firstName: string;
  isSuperAdmin?: boolean;
  active?: boolean;
  emailVerified?: boolean;
  roleId: number;
  role: UserRole;
  createdAt?: string;
}

export interface UserRole {
  id: number;
  name: string;
  createdAt: string;
  permissionsPerModule: Array<{
    moduleName: string;
    permissions: string[];
  }>;
}
