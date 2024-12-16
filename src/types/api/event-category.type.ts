export interface EventCategory {
  id: number;
  name: string;
  icon: string;
  parentId: number | null;
  createdAt: string | Date;
  parent?: EventCategory | null;
  children: EventCategory[];
}
