import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface EventTicketsResponse {
  data: {
    id: number;
    name: string;
    availableQuantity: number;
    price: number;
    description: string;
    minTicketsPerOrder: number;
    maxTicketsPerOrder: number;
    saleStartDate: string | null;
    saleStartTime: string | null;
    saleEndDate: string | null;
    saleEndTime: string | null;
    ticketTypeId: number;
    eventId: number;
    _count: {
      inscriptions: number;
    };
    ticketType: {
      id: number;
      name: string;
      icon: string | null;
      description: string;
      paid: boolean;
      free: boolean;
      donation: boolean;
    };
  }[];
}

export interface CreateTicketType {
  name: string;
  description: string;
  price: number;
  availableQuantity: number;
  minTicketsPerOrder: number;
  maxTicketsPerOrder: number;
  saleStartDate: string | null;
  saleStartTime: string | null;
  saleEndDate: string | null;
  saleEndTime: string | null;
  ticketTypeId: number;
}


// Fetch event tickets
export const fetchEventTickets = async (organizationId: number, eventId: number): Promise<EventTicketsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get(`/events-tickets/${organizationId}/${eventId}`, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventTicketsResponse>(error, "Error fetching event tickets.");
  }
};

// Create a new event ticket
export const createEventTicket = async (
  organizationId: string,
  eventId: string,
  ticketData: CreateTicketType
): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.post(`/events-tickets/${organizationId}/${eventId}`, ticketData, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Error creating event ticket.");
  }
};

export const updateEventTicket = async (
  organizationId: string,
  eventId: string,
  ticketId: number,
  ticketData: Partial<CreateTicketType>
): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.put(`/events-tickets/${organizationId}/${eventId}/${ticketId}`, ticketData, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Error updating event ticket.");
  }
};

export const deleteEventTicket = async (organizationId: string, eventId: string, ticketId: number): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/events-tickets/${organizationId}/${eventId}/${ticketId}`, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Error deleting event ticket.");
  }
};

export const fetchEventTicket = async (
  organizationId: string,
  eventId: string,
  ticketId: number
): Promise<CreateTicketType> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get(`/events-tickets/${organizationId}/${eventId}/${ticketId}`, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<CreateTicketType>(error, "Error fetching event ticket.");
  }
};
