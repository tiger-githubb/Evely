import { Toaster } from "@/components/ui/sonner";
import ReactQueryProvider from "@/utils/providers/ReactQueryProvider";
import type { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import localFont from "next/font/local";
import { authOptions } from "./api/auth/[...nextauth]/auth-options";
import AuthProvider from "./api/auth/[...nextauth]/auth-provider";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Evely",
  description: "Découvrez, organisez et réservez vos événements en toute simplicité",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <AuthProvider session={session}>
            {children}
            <Toaster richColors />
          </AuthProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
