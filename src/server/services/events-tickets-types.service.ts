import { EventTicketType } from "@/types/api/event-ticket-type.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface EventTicketTypesResponse {
  data: EventTicketType[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchEventTicketTypes = async (): Promise<EventTicketTypesResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events-tickets-types", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventTicketTypesResponse>(
      error,
      "Une erreur est survenue lors de la récupération des types de tickets"
    );
  }
};