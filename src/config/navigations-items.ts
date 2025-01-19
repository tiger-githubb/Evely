"use client";

import { BadgeCheck, Bell, Building, Calendar, CreditCard, Heart, Home, LogOut, Settings2, SquareChartGantt } from "lucide-react";
import { routes } from "./routes";

export const navigationItems = (t: (key: string) => string) => {
  return [
    {
      title: t("createEvent"),
      href: routes.createEvent,
    },
    {
      title: t("help.title"),
      description: t("help.description"),
      items: [
        {
          title: t("help.items.findTicket"),
          href: routes.help.findTicket,
        },
        {
          title: t("help.items.buyTicket"),
          href: routes.help.buyTicket,
        },
        {
          title: t("help.items.contactOrganizer"),
          href: routes.help.contactOrganizer,
        },
      ],
    },
  ];
};

export const OrganisationNavigationItems = (t: (key: string) => string) => {
  return {
    navMain: [
      {
        title: t("navMain.dashboard"),
        url: routes.board.dashboard,
        icon: Home,
      },
      {
        title: t("navMain.myTickets"),
        url: routes.board.mytickets,
        icon: SquareChartGantt,
      },
      {
        title: t("navMain.events"),
        url: "/board/events", // Default path
        icon: Calendar,
      },
      {
        title: t("navMain.settings.title"),
        url: "#",
        icon: Settings2,
        items: [
          {
            title: t("navMain.settings.items.ticketFees"),
            url: "#",
          },
        ],
      },
    ],
    projects: [],
  };
};

export const UserMainNavigationItems = (t: (key: string) => string) => {
  return {
    navMain: [
      {
        title: t("navMain.dashboard"),
        url: routes.board.dashboard,
        icon: Home,
      },
      {
        title: t("navMain.myTickets"),
        url: routes.board.mytickets,
        icon: SquareChartGantt,
      },
      {
        title: t("navMain.favorites"),
        url: routes.board.favorite,
        icon: Heart,
      },
    ],
  };
};

export const userNavigationItems = (t: (key: string) => string) => {
  return [
    {
      title: t("account"),
      url: routes.board.profile,
      icon: BadgeCheck,
    },
    {
      title: t("organizations"),
      url: routes.board.organization.all,
      icon: Building,
    },
    {
      title: t("billing"),
      url: routes.board.profile,
      icon: CreditCard,
    },
    {
      title: t("notifications"),
      url: routes.board.profile,
      icon: Bell,
    },
    {
      title: t("logout"),
      url: "#",
      icon: LogOut,
      action: "signOut",
    },
  ];
};
