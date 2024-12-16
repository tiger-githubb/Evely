"use client";

import { getOrganizations } from "@/server/services/organizations.service";
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
import { Organization } from "@/types/api/organization.type";
import Link from "next/link";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();
  const { data: organizationsResponse } = useQuery({
    queryKey: ["organizations"],
    queryFn: getOrganizations,
  });

  const organizations = React.useMemo(() => organizationsResponse?.data || [], [organizationsResponse]);
  const [activeOrganization, setActiveOrganization] = React.useState<Organization | null>(null);

  React.useEffect(() => {
    if (organizations.length > 0 && !activeOrganization) {
      setActiveOrganization(organizations[0]);
    }
  }, [organizations, activeOrganization]);

  if (!activeOrganization) return null;

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
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
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
                    <span className="truncate text-xs">Membre</span>
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
            <DropdownMenuLabel className="text-xs text-muted-foreground">Mes organisations</DropdownMenuLabel>
            {organizations.map((org) => (
              <DropdownMenuItem key={org.id} onClick={() => setActiveOrganization(org)} className="gap-2 p-2">
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
                <Link href={routes.board.organization.add}>Ajouter une organisation</Link>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
