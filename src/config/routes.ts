export const routes = {
  home: "/",
  createEvent: "/events/create",
  events: {
    list: "/events",
    details: (slug: string) => `/e/${slug}`,
    create: "/events/create",
    payment: (slug: string, orderUid: string) => `/e/${slug}/payment/${orderUid}`,
  },

  organizations: {
    details: (slug: string) => `/o/${slug}`,
    events: (slug: string) => `/o/${slug}/events`,
    followers: (slug: string) => `/o/${slug}/followers`,
  },

  board: {
    dashboard: "/board",
    profile: "/board/profile",
    myevents: "/board/my-events",
    workspace: {
      home: (slug: string) => `/board/${slug}`,
      events: {
        list: (slug: string) => `/board/${slug}/events`,
        add: (slug: string) => `/board/${slug}/events/create`,
        show: (slug: string, eventSlug: string) => `/board/${slug}/events/${eventSlug}`,
        edit: (slug: string, eventSlug: string) => `/board/${slug}/events/${eventSlug}/edit`,
        agendas: (slug: string, eventSlug: string) => `/board/${slug}/events/${eventSlug}/agendas`,
        media: (slug: string, eventSlug: string) => `/board/${slug}/events/${eventSlug}/medias`,
        stats: (slug: string, eventSlug: string) => `/board/${slug}/events/${eventSlug}/stats`,
        faq: (slug: string, eventSlug: string) => `/board/${slug}/events/${eventSlug}/faq`,
        tickets: (slug: string, eventSlug: string) => `/board/${slug}/events/${eventSlug}/tickets`, 
      },
    },
    organization: {
      all: "/board/organizations",
      add: "/board/organizations/create",
      show: (slug: string) => `/board/organizations/${slug}`,
      edit: (slug: string) => `/board/organizations/${slug}/edit`,
      members: (slug: string) => `/board/organizations/${slug}/members`,
      invitations: (slug: string) => `/board/organizations/${slug}/invitations`,
      roles: (slug: string) => `/board/organizations/${slug}/roles`,
      followers: (slug: string) => `/board/organizations/${slug}/followers`,
    },
  },
  help: {
    findTicket: "help/find-ticket",
    buyTicket: "help/buy-ticket",
    contactOrganizer: "help/contact-organizer",
  },

  auth: {
    signUp: "/auth/sign-up",
    mailVerifivation: "/auth/mail-verification",
    signIn: "/auth/sign-in",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    congratulations: "/auth/reset-password/congratulations",
    otp: "/auth/otp",
  },

  search: "/search",

  faq: "/faq",
  contact: "/contact",
  terms: "/terms",
  privacy: "/privacy",

  // Inactive Routes

  accessDenied: "/access-denied",

  notFound: "/not-found",
};
