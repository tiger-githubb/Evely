import { EventType } from "@/types/api/event.type";
import { faker } from "@faker-js/faker";

const categories = ["Musique", "Gastronomie", "Sport", "Art", "Technologie", "Bien-être", "Œuvres de bienfaisance", "Business"];
const baseDate = new Date("2024-01-01");

export const generateEvents = (count: number): EventType[] => {
  faker.seed(123); // Add a fixed seed

  return Array.from({ length: count }, (_, index) => ({
    id: `event-${index + 1}`, // Use predictable IDs
    title: faker.company.catchPhrase(),
    description: faker.lorem.paragraph(),
    date: new Date(baseDate.getTime() + index * 24 * 60 * 60 * 1000), // Increment by 1 day each time
    price: faker.helpers.arrayElement([0, ...Array.from({ length: 5 }, () => faker.number.int({ min: 10, max: 200 }))]),
    category: faker.helpers.arrayElement(categories),
    location: faker.helpers.arrayElement([faker.location.city(), "En ligne"]),
    image: faker.image.urlLoremFlickr({ category: "event" }),
    organizer: {
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
    },
    attendees: faker.number.int({ min: 5, max: 1000 }),
  }));
};
