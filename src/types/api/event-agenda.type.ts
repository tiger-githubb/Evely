export interface EventAgenda {
  id: number;
  title: string;
  sessions: EventSession[];
}

export interface EventSession {
  id: number;
  title: string;
  startTime: string;
  endTime: string;
}
