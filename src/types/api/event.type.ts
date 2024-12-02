export type EventType = {
  id: string;
  title: string;
  description: string;
  date: Date;
  price: number;
  category: string;
  location: string;
  image: string;
  organizer: {
    name: string;
    avatar: string;
  };
  attendees: number;
};
