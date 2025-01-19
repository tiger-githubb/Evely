"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { OrganisationNavigationItems, UserMainNavigationItems } from "@/config/navigations-items";
import { routes } from "@/config/routes";
import { useOrganizationStore } from "@/stores/organization-store";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import * as React from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const activeOrganization = useOrganizationStore((state) => state.activeOrganization);
  const userRole = session?.user?.role.id;
  const t = useTranslations("OrganisationNavigationItems");
  const t2 = useTranslations("UserMainNavigationItems");

  // Function to get navigation items based on the user role and active organization
  const getNavigationItems = () => {
    if (userRole === 2) {
      return UserMainNavigationItems(t2).navMain;
    }

    return OrganisationNavigationItems(t).navMain.map((item) => {
      if (item.title === "Événements" && activeOrganization) {
        return {
          ...item,
          url: routes.board.workspace.events.list(activeOrganization.slug),
        };
      }
      return item;
    });
  };

  const navigationItems = getNavigationItems(); // Get the updated navigation items

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navigationItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
