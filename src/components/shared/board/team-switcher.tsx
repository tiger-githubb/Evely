"use client";

import { fetchOrganizations } from "@/server/services/organizations.service";
import { getImageUrl } from "@/utils/image-utils";
import { useQuery } from "@tanstack/react-query";
import { ChevronsUpDown, Plus } from "lucide-react";
import Image from "next/image";
import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "@/components/ui/sidebar";
import { routes } from "@/config/routes";
import { useOrganizationStore } from "@/stores/organization-store";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { TeamSwitcherSkeleton } from "../ui-skeletons";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { activeOrganization, setActiveOrganization } = useOrganizationStore();
  const t = useTranslations("teamSwitcher");

  const {
    data: organizationsResponse,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["organizations"],
    queryFn: fetchOrganizations,
  });

  const organizations = React.useMemo(() => organizationsResponse?.data || [], [organizationsResponse]);

  React.useEffect(() => {
    if (organizations.length > 0 && !activeOrganization) {
      setActiveOrganization(organizations[0]);
    }
  }, [organizations, activeOrganization, setActiveOrganization]);

  if (isLoading) {
    return <TeamSwitcherSkeleton />;
  }

  if (isError) {
    return <div className="p-4 text-sm text-destructive">{t("errorLoading")}</div>;
  }

  if (organizations.length === 0) {
    return <AddOrganizationButton />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {activeOrganization && (
                <>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-accent text-sidebar-primary-foreground">
                    <Image
                      src={getImageUrl(activeOrganization.logo)}
                      alt={activeOrganization.name}
                      width={32}
                      height={32}
                      className="rounded-lg object-cover"
                    />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-semibold">{activeOrganization.name}</span>
                    <span className="truncate text-xs">{t("member")}</span>
                  </div>
                  <ChevronsUpDown className="ml-auto" />
                </>
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">{t("myOrganizations")}</DropdownMenuLabel>
            {organizations.map((org) => (
              <DropdownMenuItem
                key={org.id}
                onClick={() => {
                  setActiveOrganization(org);
                  window.location.href = routes.board.workspace.home(org.slug.toString());
                }}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-sm border">
                  <Image src={getImageUrl(org.logo)} alt={org.name} width={24} height={24} className="rounded-sm object-cover" />
                </div>
                {org.name}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                <Link href={routes.board.organization.add}>{t("addOrganization")}</Link>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

function AddOrganizationButton() {
  const t = useTranslations("teamSwitcher");

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Link href={routes.board.organization.add}>
          <SidebarMenuButton size="lg" className="hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <Plus className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{t("newOrganization")}</span>
              <span className="truncate text-xs text-muted-foreground">{t("createOrganization")}</span>
            </div>
          </SidebarMenuButton>
        </Link>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
