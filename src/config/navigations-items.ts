import { BadgeCheck, Bell, Building, CreditCard, Home, LogOut, Settings2, SquareChartGantt } from "lucide-react";
import { routes } from "./routes";

export const navigationItems = [
  {
    title: "Accueil",
    href: routes.home,
    description: "Page d'accueil",
  },
  {
    title: "Événements",
    description: "Découvrez et gérez vos événements",
    items: [
      {
        title: "Tous les événements",
        href: routes.events.list,
      },
      {
        title: "Créer un événement",
        href: routes.createEvent,
      },
      {
        title: "Rechercher",
        href: routes.search,
      },
    ],
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

export const boardNavigationItems = {
  navMain: [
    {
      title: "Accueil",
      url: routes.board.dashboard,
      icon: Home,
    },
    {
      title: "Mes événements",
      url: routes.board.myevents,
      icon: SquareChartGantt,
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
