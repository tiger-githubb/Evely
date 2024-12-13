export const routes = {
  home: "/",
  events: "/evenements",
  createEvent: "/evenements/creer",

  board: {
    dashboard: "/tableau-de-bord",
    profile: "/tableau-de-bord/profil",
    myevents: "/tableau-de-bord/mes-evenements",
    organization: {
      all: "/tableau-de-bord/organisations",
      add: "/tableau-de-bord/organisations/ajouter",
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
