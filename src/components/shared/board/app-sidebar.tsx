"use client";

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from "@/components/ui/sidebar";
import { OrganisationNavigationItems, UserMainNavigationItems } from "@/config/navigations-items";
import { routes } from "@/config/routes";
import { useOrganizationStore } from "@/stores/organization-store";
import { useSession } from "next-auth/react";
import * as React from "react";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const activeOrganization = useOrganizationStore((state) => state.activeOrganization);
  const userRole = session?.user?.role.id;

  const navigationItems = React.useMemo(() => {
    if (userRole === 2) {
      return UserMainNavigationItems.navMain;
    }

    // Update the events URL with the active organization
    return OrganisationNavigationItems.navMain.map((item) => {
      if (item.title === "Événements" && activeOrganization) {
        return {
          ...item,
          url: routes.board.workspace.events.list(activeOrganization.slug),
        };
      }
      return item;
    });
  }, [userRole, activeOrganization]);

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
