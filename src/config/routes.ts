export const routes = {
  home: "/",
  search: "/recherche",

  faq: "/foires-aux-questions",
  contact: "/contact",
  terms: "/conditions-utilisation",
  privacy: "/politique-de-confidentialite",

  auth: {
    signUp: "/auth/inscription",
    mailVerifivation: "/auth/mail-verification",
    signIn: "/auth/connexion",
    forgotPassword: "/auth/mot-de-passe-oublie",
    resetPassword: "/auth/reinitialiser-mot-de-passe",
    congratulations: "/auth/reinitialiser-mot-de-passe/félicitations",
    otp: "/auth/otp",
  },

  // Inactive Routes

  accessDenied: "/access-denied",

  notFound: "/not-found",
};
