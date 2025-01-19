"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface EventNavProps {
  eventId: string;
  organizationId: string;
}

export function EventNav({ eventId, organizationId }: EventNavProps) {
  const pathname = usePathname();
  const t = useTranslations("eventNav");

  const eventNavItems = [
    {
      title: t("overview"),
      href: routes.board.workspace.events.show(organizationId, eventId),
    },
    {
      title: t("agendas"),
      href: routes.board.workspace.events.agendas(organizationId, eventId),
    },
    {
      title: t("media"),
      href: routes.board.workspace.events.media(organizationId, eventId),
    },
    {
      title: t("stats"),
      href: routes.board.workspace.events.stats(organizationId, eventId),
    },
    {
      title: t("faq"),
      href: routes.board.workspace.events.faq(organizationId, eventId),
    },
    {
      title: t("tickets"),
      href: routes.board.workspace.events.tickets(organizationId, eventId),
    },
  ];

  return (
    <ScrollArea className="w-full">
      <nav className="flex border-b">
        {eventNavItems.map((item) => (
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
