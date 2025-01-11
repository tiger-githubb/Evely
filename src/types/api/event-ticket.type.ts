export interface EventTicket {
    id: number;
    name: string;
    availableQuantity: number;
    price: number;
    description: string;
    minTicketsPerOrder: number;
    maxTicketsPerOrder: number;
    saleStartDate: string | null;
    saleStartTime: string;
    saleEndDate: string | null;
    saleEndTime: string;
    ticketTypeId: number;
  }
  