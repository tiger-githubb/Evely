import { AppUser } from "@/types/user.type";
import api from "@/utils/axios-instance";
import { User } from "next-auth";

export interface SignUpResponse {
  token: string;
  user: AppUser;
}

// Helper function to format user data for NextAuth
function formatUserForAuth(user: AppUser, token: string): User {
  return {
    id: String(user.id), // NextAuth expects string ID
    email: user.email,
    name: `${user.firstName} ${user.lastName}`,
    roleId: user.roleId,
    role: user.role,
    token: token,
  } as User;
}

export async function signUpUser(email: string, password: string, firstName: string, lastName: string) {
  try {
    const { data } = await api.post<SignUpResponse>("/auth/sign-up", {
      email,
      password,
      firstName,
      lastName,
    });

    return formatUserForAuth(data.user, data.token);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const { data } = await api.post("/auth/sign-in", { email, password });

    return formatUserForAuth(
      {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        roleId: data.user.roleId,
        role: data.user.role,
      } as AppUser,
      data.token
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}
