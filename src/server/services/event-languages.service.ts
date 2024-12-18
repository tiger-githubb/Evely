import { EventLanguage } from "@/types/api/event-language.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface EventLanguagesResponse {
  data: EventLanguage[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchEventLanguages = async (): Promise<EventLanguagesResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events-languages", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventLanguagesResponse>(
      error,
      "Une erreur est survenue lors de la récupération des langues d'événements"
    );
  }
};
