// "use server";
// import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
// import { getServerSession } from "next-auth/next";
// import { useTranslations } from "next-intl";

// export const getAuthToken = async (): Promise<string> => {
//   const t = useTranslations("Auth");
//   const notAuthenticatedMessage = t("Auth.notAuthenticated");
//   const session = await getServerSession(authOptions);
//   if (!session || !session.user.token) {
//     throw new Error(notAuthenticatedMessage);
//   }
//   return session.user.token;
// };

// export const getAuthHeaders = async () => {
//   const token = await getAuthToken();
//   return {
//     Authorization: `Bearer ${token}`,
//   };
// };

"use server";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth-options";
import { getServerSession } from "next-auth/next";

export const getAuthToken = async (): Promise<string> => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    throw new Error("L'utilisateur n'est pas authentifié");
  }
  return session.user.token;
};

export const getAuthHeaders = async () => {
  const token = await getAuthToken();
  return {
    Authorization: `Bearer ${token}`,
  };
};
