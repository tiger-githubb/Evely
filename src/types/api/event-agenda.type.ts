export interface EventAgenda {
  title: string;
  sessions: EventSession[];
}

export interface EventSession {
  title: string;
  startTime: string;
  endTime: string;
}
