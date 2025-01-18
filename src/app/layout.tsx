import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import { ThemeProvider } from "@/utils/providers/theme-provider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Plus_Jakarta_Sans } from "next/font/google";
import { authOptions } from "./api/auth/[...nextauth]/auth-options";
import AuthProvider from "./api/auth/[...nextauth]/auth-provider";
import NextTopLoader from "nextjs-toploader";

import "./globals.css";

// Import the Plus Jakarta Sans Google Font
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
});

export const metadata: Metadata = {
  title: "Yala",
  description: "Découvrez, organisez et réservez vos événements en toute simplicité",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${plusJakartaSans.variable} antialiased`}>
        <NextTopLoader showSpinner={false} color="#e95d41" />

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <ReactQueryProvider>
              <AuthProvider session={session}>
                {children}
                <Toaster richColors />
              </AuthProvider>
            </ReactQueryProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
