import { useOrganizationStore } from "@/stores/organization-store";
import { BadgeCheck, Bell, Building, Calendar, CreditCard, Home, LogOut, Settings2, SquareChartGantt } from "lucide-react";
import { routes } from "./routes";

export const navigationItems = [
  {
    title: "Trouver des événements",
    href: routes.events.list,
  },
  {
    title: "Créer un événement",
    href: routes.createEvent,
  },

  {
    title: "Aide",
    description: "Centre d'aide et support",
    items: [
      {
        title: "Trouver mon billet",
        href: routes.help.findTicket,
      },
      {
        title: "Acheter un billet",
        href: routes.help.buyTicket,
      },
      {
        title: "Contacter l'organisateur",
        href: routes.help.contactOrganizer,
      },
    ],
  },
];

export const OrganisationNavigationItems = {
  navMain: [
    {
      title: "Yala",
      url: routes.board.dashboard,
      icon: Home,
    },
    {
      title: "My Tickets",
      url: routes.board.myevents,
      icon: SquareChartGantt,
    },
    {
      title: "Événements",
      url: routes.board.workspace.events.list(useOrganizationStore.getState().activeOrganization?.slug || ""),
      icon: Calendar,
    },

    {
      title: "Paramètres",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Ticket Fees",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
  ],
};
export const UserMainNavigationItems = {
  navMain: [
    {
      title: "Yala",
      url: routes.board.dashboard,
      icon: Home,
    },
    {
      title: "My Tickets",
      url: routes.board.myevents,
      icon: SquareChartGantt,
    },
    {
      title: "Favorites",
      url: routes.board.favorite,
      icon: Bell,
    },
  ],
};

export const userNavigationItems = [
  {
    title: "Account",
    url: routes.board.profile,
    icon: BadgeCheck,
  },
  {
    title: "Organisations",
    url: routes.board.organization.all,
    icon: Building,
  },
  {
    title: "Billing",
    url: routes.board.profile,
    icon: CreditCard,
  },
  {
    title: "Notifications",
    url: routes.board.profile,
    icon: Bell,
  },
  {
    title: "Log out",
    url: "#",
    icon: LogOut,
    action: "signOut",
  },
];
