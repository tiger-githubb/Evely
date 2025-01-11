export interface TicketType {
  id: number;
  name: string;
  icon: string;
  description: string;
  paid: boolean;
  free: boolean;
  donation: boolean;
  createdAt: string;
}

export interface Ticket {
  id: number;
  name: string;
  availableQuantity: number;
  price: number;
  description: string;
  minTicketsPerOrder: number;
  maxTicketsPerOrder: number;
  saleStartDate: string;
  saleStartTime: string;
  saleEndDate: string;
  saleEndTime: string;
  ticketTypeId: number;
  eventId: number;
  createdAt: string;
  ticketType: TicketType;
  _count?: {
    inscriptions: number;
  };
}
