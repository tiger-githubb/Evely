import { Event } from "./event.type";

export interface OrderCartItem {
  uid?: string;
  ticketId: number;
  quantity?: number;
  ticket?: {
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
  };
}

export interface Order {
  id: number;
  amount: number;
  amountWithPromoCode: number;
  paid: boolean;
  promoCodeId: string | null;
  userId: number;
  eventId: number;
  createdAt: string;
  event: Event;
  cart: OrderCartItem[];
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: string;
  };
}
