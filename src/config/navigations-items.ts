import { BookOpen, Settings2 } from "lucide-react";
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
      title: "Tableau de Board",
      url: "#",
      icon: BookOpen,
      isActive: true,
      items: [
        {
          title: "Accueil",
          url: routes.board.dashboard,
        },
        {
          title: "Profil",
          url: routes.board.profile,
        },
        {
          title: "Mes événements",
          url: routes.board.myevents,
        },
      ],
    },
    {
      title: "Paramètres",
      url: "#",
      icon: Settings2,
      items: [
        {
          title: "Organisations",
          url: routes.board.organization.all,
        },
        {
          title: "Compte",
          url: "#",
        },
        {
          title: "Ticket Fees",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    // {
    //   name: "Design Engineering",
    //   url: "#",
    //   icon: Frame,
    // },
    // {
    //   name: "Sales & Marketing",
    //   url: "#",
    //   icon: PieChart,
    // },
    // {
    //   name: "Travel",
    //   url: "#",
    //   icon: Map,
    // },
  ],
};
