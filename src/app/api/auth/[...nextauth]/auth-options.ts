import { signInUser, signUpUser } from "@/server/services/auth.service";
import { useOrganizationStore } from "@/stores/organization-store";
import { Session, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { pagesOptions } from "./pages-options";

export const authOptions: NextAuthOptions = {
  pages: {
    ...pagesOptions,
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async session({ session, token }) {
      // Clear organization store when session is created/updated
      useOrganizationStore.getState().clearActiveOrganization();

      return {
        ...session,
        user: token.user as Session["user"],
      };
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { type: "text" },
        password: { type: "password" },
        firstName: { type: "text" },
        lastName: { type: "text" },
        action: { type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;

        if (credentials.action === "signup") {
          return await signUpUser(credentials.email, credentials.password, credentials.firstName, credentials.lastName);
        }

        if (credentials.email && credentials.password) {
          return await signInUser(credentials.email, credentials.password);
        }

        return null;
      },
    }),
  ],
};
