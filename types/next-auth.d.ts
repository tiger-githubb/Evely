import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      roleId: number;
      role: {
        createdAt: string;
        id: number;
        name: string;
        permissionsPerModule: unknown[];
      };
      token: string;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    idToken?: string;
    user?: Session["user"];
    token?: string;
  }
}
