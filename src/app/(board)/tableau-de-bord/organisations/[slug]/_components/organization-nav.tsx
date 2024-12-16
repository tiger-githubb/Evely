"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface OrganizationNavProps {
  organizationId: string;
}

export function OrganizationNav({ organizationId }: OrganizationNavProps) {
  const pathname = usePathname();

  const organizationNavItems = [
    {
      title: "Vue d'ensemble",
      href: routes.board.organization.show(organizationId),
    },
    {
      title: "Membres",
      href: routes.board.organization.members(organizationId),
    },
    {
      title: "Invitations",
      href: routes.board.organization.invitations(organizationId),
    },
    {
      title: "Rôles",
      href: routes.board.organization.roles(organizationId),
    },
  ];

  return (
    <ScrollArea className="w-full">
      <nav className="flex border-b">
        {organizationNavItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "min-w-fit border-b-2 border-transparent px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              "first:pl-0 last:pr-0",
              pathname === item.href && "border-primary text-foreground"
            )}
          >
            {item.title}
          </Link>
        ))}
      </nav>
      <ScrollBar orientation="horizontal" className="invisible" />
    </ScrollArea>
  );
}
