export const routes = {
  home: "/",
  events: "/evenements",
  createEvent: "/evenements/creer",

  board: {
    dashboard: "/tableau-de-bord",
    profile: "/tableau-de-bord/profil",
    myevents: "/tableau-de-bord/mes-evenements",
    workspace: {
      home: (slug: string) => `/tableau-de-bord/${slug}`,
      events: {
        list: (slug: string) => `/tableau-de-bord/${slug}/evenements`,
        add: (slug: string) => `/tableau-de-bord/${slug}/evenements/ajouter`,
        show: (slug: string, eventId: string) => `/tableau-de-bord/${slug}/evenements/${eventId}`,
        edit: (slug: string, eventId: string) => `/tableau-de-bord/${slug}/evenements/${eventId}/modifier`,
      },
    },
    organization: {
      all: "/tableau-de-bord/organisations",
      add: "/tableau-de-bord/organisations/ajouter",
      show: (slug: string) => `/tableau-de-bord/organisations/${slug}`,
      edit: (slug: string) => `/tableau-de-bord/organisations/${slug}/modifier`,
      members: (slug: string) => `/tableau-de-bord/organisations/${slug}/membres`,
      invitations: (slug: string) => `/tableau-de-bord/organisations/${slug}/invitations`,
      roles: (slug: string) => `/tableau-de-bord/organisations/${slug}/roles`,
      followers: (slug: string) => `/tableau-de-bord/organisations/${slug}/followers`,
    },
  },
  help: {
    findTicket: "aide/trouver-billet",
    buyTicket: "aide/acheter-billet",
    contactOrganizer: "aide/contact-organisateur",
  },

  auth: {
    signUp: "/auth/inscription",
    mailVerifivation: "/auth/mail-verification",
    signIn: "/auth/connexion",
    forgotPassword: "/auth/mot-de-passe-oublie",
    resetPassword: "/auth/reinitialiser-mot-de-passe",
    congratulations: "/auth/reinitialiser-mot-de-passe/félicitations",
    otp: "/auth/otp",
  },

  search: "/recherche",

  faq: "/foires-aux-questions",
  contact: "/contact",
  terms: "/conditions-utilisation",
  privacy: "/politique-de-confidentialite",

  // Inactive Routes

  accessDenied: "/access-denied",

  notFound: "/not-found",
};
