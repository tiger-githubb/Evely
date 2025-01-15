import React from "react";
import { AppSidebar } from "@/components/shared/board/app-sidebar";
import { DynamicBreadcrumb } from "@/components/shared/board/breadcrumb";
import { ModeToggle } from "@/components/shared/mode-toggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Home } from "lucide-react";
import { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Yala",
  description:
    "Gérez les paramètres de votre compte et définissez les préférences. ",
};

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default async function SettingsLayout({
  children,
}: SettingsLayoutProps) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <ModeToggle />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <DynamicBreadcrumb />
          </div>
          <div className="flex items-center gap-2 px-4">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm "
            >
              <Button variant="ghost" size={"sm"}>
                <Home className="h-4 w-4" />
                Aller à l&apos;accueil{" "}
              </Button>
            </Link>
          </div>
        </header>

        <section className="p-6">{children}</section>
      </SidebarInset>
    </SidebarProvider>
  );
}
