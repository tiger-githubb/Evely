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
        href: routes.events,
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
