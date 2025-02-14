import { Event } from "@/types/api/event.type";
import { faker } from "@faker-js/faker/locale/fr";

const EVENT_TYPES = [
  { id: 1, name: "ONLINE", createdAt: new Date() },
  { id: 2, name: "PHYSICAL", createdAt: new Date() },
];

const EVENT_CATEGORIES = [
  { id: 1, name: "Musique", icon: "music", parentId: null, createdAt: new Date(), children: [] },
  { id: 2, name: "Gastronomie", icon: "utensils", parentId: null, createdAt: new Date(), children: [] },
  { id: 3, name: "Sport", icon: "running", parentId: null, createdAt: new Date(), children: [] },
  { id: 4, name: "Art", icon: "palette", parentId: null, createdAt: new Date(), children: [] },
  { id: 5, name: "Technologie", icon: "laptop", parentId: null, createdAt: new Date(), children: [] },
];

const EVENT_FORMATS = [
  { id: 1, name: "Conférence", createdAt: new Date() },
  { id: 2, name: "Concert", createdAt: new Date() },
  { id: 3, name: "Festival", createdAt: new Date() },
];

const EVENT_LANGUAGES = [
  { id: 1, name: "Français", createdAt: new Date() },
  { id: 2, name: "Anglais", createdAt: new Date() },
];

export const generateMockEvents = (count: number = 10): Event[] => {
  return Array.from(
    { length: count },
    (_, index): Event => ({
      id: index + 1,
      title: faker.company.catchPhrase(),
      slug: faker.helpers.slugify(faker.company.catchPhrase()).toLowerCase(),
      summary: faker.lorem.sentence(30),
      content: faker.lorem.paragraphs(3),
      date: faker.date.future(),
      startTime: faker.date.future().toISOString(),
      endTime: faker.date.future().toISOString(),

      draft: faker.datatype.boolean(),
      covers: Array.from({ length: 2 }, () => faker.image.url()),
      video: faker.helpers.arrayElement([null, faker.internet.url()]),
      createdAt: faker.date.past(),
      organizationId: faker.number.int({ min: 1, max: 10 }),
      typeId: faker.number.int({ min: 1, max: 2 }),
      formatId: faker.number.int({ min: 1, max: 3 }),
      categoryId: faker.number.int({ min: 1, max: 5 }),
      languageId: faker.number.int({ min: 1, max: 2 }),
      isFree: faker.datatype.boolean(),
      organization: {
        id: faker.number.int({ min: 1, max: 10 }),
        name: faker.company.name(),
        slug: faker.helpers.slugify(faker.company.name()).toLowerCase(),
        logo: faker.image.avatar(),
        coverImage: faker.image.url(),
        description: faker.company.catchPhrase(),
        createdAt: faker.date.past().toISOString(),
        _count: {
          users: faker.number.int({ min: 1, max: 100 }),
          followers: faker.number.int({ min: 1, max: 1000 }),
          events: faker.number.int({ min: 1, max: 100 }),
        },
        roles: [],
      },
      type: EVENT_TYPES[faker.number.int({ min: 0, max: 1 })],
      category: EVENT_CATEGORIES[faker.number.int({ min: 0, max: 4 })],
      language: EVENT_LANGUAGES[faker.number.int({ min: 0, max: 1 })],
      format: EVENT_FORMATS[faker.number.int({ min: 0, max: 2 })],
      location: {
        id: faker.number.int({ min: 1, max: 10 }),
        name: faker.location.streetAddress(),
        lat: faker.location.latitude().toString(),
        long: faker.location.longitude().toString(),
        createdAt: faker.date.past().toISOString(),
      },
      faq: Array.from({ length: 3 }, () => ({
        id: faker.number.int(),
        question: faker.lorem.sentence() + "?",
        answer: faker.lorem.paragraph(),
        response: faker.lorem.paragraph(),
        eventId: index + 1,
        createdAt: faker.date.past().toISOString(),
      })),
      tags: Array.from({ length: 3 }, () => ({
        id: faker.number.int(),
        name: faker.word.sample(),
        createdAt: faker.date.past(),
      })),
      agendas: Array.from({ length: 2 }, () => ({
        id: faker.number.int(),
        title: faker.lorem.sentence(),
        startTime: faker.date.future().toISOString(),
        endTime: faker.date.future().toISOString(),
        sessions: [],
      })),
    })
  );
};

export const fetchEventBySlug = (slug: string) => {
  const events = generateMockEvents(12);
  return events.find((event) => event.slug === slug) || events[0];
};

export const generateMockOrganization = (slug: string) => {
  return {
    id: faker.number.int(),
    name: faker.company.name(),
    slug,
    logo: faker.image.avatar(),
    coverImage: faker.image.url(),
    description: faker.company.catchPhrase(),
    website: faker.internet.url(),
    createdAt: faker.date.past().toISOString(),
    socialLinks: {
      facebook: faker.internet.url(),
      twitter: faker.internet.url(),
      instagram: faker.internet.url(),
      linkedin: faker.internet.url(),
    },
    _count: {
      users: faker.number.int({ min: 1, max: 100 }),
      followers: faker.number.int({ min: 100, max: 10000 }),
      events: faker.number.int({ min: 5, max: 50 }),
    },
    roles: [],
    upcomingEvents: generateMockEvents(3),
    pastEvents: generateMockEvents(5),
  };
};

export const fetchOrganizationBySlug = (slug: string) => {
  return generateMockOrganization(slug);
};

export const generateDashboardStats = (organizationId: number) => {
  return {
    totalEvents: faker.number.int({ min: 10, max: 100 }),
    totalParticipants: faker.number.int({ min: 100, max: 10000 }),
    totalRevenue: faker.number.int({ min: 100000, max: 1000000 }),
    satisfactionRate: faker.number.int({ min: 80, max: 100 }),

    recentEvents: generateMockEvents(3).filter((event) => event.organizationId === organizationId),
    upcomingEvents: generateMockEvents(3).filter((event) => event.organizationId === organizationId),
    monthlyRevenue: Array.from({ length: 12 }, () => ({
      month: faker.date.month(),
      revenue: faker.number.int({ min: 10000, max: 100000 }),
      organizationId,
    })),
  };
};
