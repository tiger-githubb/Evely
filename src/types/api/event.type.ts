import { EventAgenda } from "./event-agenda.type";
import { EventCategory } from "./event-category.type";
import { EventFaq } from "./event-faq.type";
import { EventFormat } from "./event-format.type";
import { EventLanguage } from "./event-language.type";
import { EventLocation } from "./event-location.type";
import { EventTag } from "./event-tag.type";
import { EventType } from "./event-type.type";
import { Organization } from "./organization.type";

export interface Event {
  id: number;
  title: string;
  slug: string;

  summary: string;
  content: string;
  date: string | Date;
  startTime: string;
  endTime: string;
  draft: boolean;
  covers: string[];
  video: string | null;
  createdAt: string | Date;
  organizationId: number;
  typeId: number;
  formatId: number;
  categoryId: number;
  languageId: number;
  organization: Organization;
  type: EventType;
  category: EventCategory;
  language: EventLanguage;
  format: EventFormat;
  location: EventLocation;
  faq: EventFaq[];
  tags: EventTag[];
  agendas: EventAgenda[];
}
