import { EventFormat } from "@/types/api/event-format.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface EventFormatsResponse {
  data: EventFormat[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchEventFormats = async (): Promise<EventFormatsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events-formats", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventFormatsResponse>(
      error,
      "Une erreur est survenue lors de la récupération des formats d'événements"
    );
  }
};
