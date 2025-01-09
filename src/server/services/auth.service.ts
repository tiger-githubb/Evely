import { AppUser } from "@/types/user.type";
import { getAuthHeaders } from "@/utils/auth-utils";
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
    emailVerified: user.emailVerified, // Add this line
    active: user.active,
    roleId: user.roleId,
    role: user.role,
    token: token,
  } as User;
}

export async function signUpUser(email: string, password: string, firstName: string, lastName: string) {
  try {
    const { data } = await api.post<SignUpResponse>("/auth/email/sign-up", {
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
    const { data } = await api.post("/auth/email/sign-in", { email, password });

    return formatUserForAuth(
      {
        id: data.user.id,
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        roleId: data.user.roleId,
        role: data.user.role,
        emailVerified: data.user.emailVerified,
        active: data.user.active,
      } as AppUser,
      data.token
    );
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function validateEmail(userId: number, verificationToken: string) {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.put(
      `/auth/validate-email/${userId}`,
      { verificationToken },
      {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
