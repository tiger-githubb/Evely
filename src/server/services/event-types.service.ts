import { EventType } from "@/types/api/event-type.type";
import { ApiErrorHandler } from "@/utils/api-error";
import api from "@/utils/axios-instance";

export interface EventTypesResponse {
  data: EventType[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchEventTypes = async (): Promise<EventTypesResponse> => {
  try {
    const { data } = await api.get("/events-types");
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventTypesResponse>(error, "Une erreur est survenue lors de la récupération des types d'événements");
  }
};
