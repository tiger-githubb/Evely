"use client";

import { ChevronsUpDown, Info } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { userNavigationItems } from "@/config/navigations-items";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export function NavUser() {
  const { data: session } = useSession();
  const { isMobile } = useSidebar();
  const pathname = usePathname();

  const user = {
    name: session?.user?.name || "Guest",
    email: session?.user?.email || "",
    avatar: session?.user?.image || "",
    emailVerified: session?.user?.emailVerified || false,
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: routes.auth.signIn });
    toast.success("Déconnexion réussie", {
      description: "À bientôt sur Yala!",
    });
  };

  const isActiveLink = (url: string) => {
    return pathname === url || pathname.startsWith(url);
  };

  return (
    <SidebarMenu>
      {!user.emailVerified && (
        <SidebarMenuItem>
          <Alert className="mb-4 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:h-8 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:flex group-data-[collapsible=icon]:items-center group-data-[collapsible=icon]:justify-center">
            <Info className="h-4 w-4 text-destructive" color="red" />
            <AlertDescription className="text-destructive group-data-[collapsible=icon]:hidden">
              Your email is not verified. Please check your mailbox.
            </AlertDescription>
          </Alert>
        </SidebarMenuItem>
      )}

      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {userNavigationItems.map((item) => (
                <DropdownMenuItem
                  key={item.title}
                  asChild
                  className={cn(isActiveLink(item.url) && "bg-accent text-accent-foreground")}
                >
                  {item.action === "signOut" ? (
                    <button onClick={handleSignOut} className="w-full">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </button>
                  ) : (
                    <Link href={item.url} className="w-full">
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.title}
                    </Link>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
