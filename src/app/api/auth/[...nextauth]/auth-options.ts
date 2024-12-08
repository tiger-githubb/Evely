import { signInUser, signUpUser } from "@/server/services/auth.service";
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

        // Si c'est une demande d'inscription
        if (credentials.action === "signup") {
          return await signUpUser(credentials.email, credentials.password, credentials.firstName, credentials.lastName);
        }

        // Si c'est une demande de connexion
        if (credentials.email && credentials.password) {
          return await signInUser(credentials.email, credentials.password);
        }

        return null;
      },
    }),
  ],
};
