import { EventTag } from "@/types/api/event-tag.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface EventTagsResponse {
  data: EventTag[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchEventTags = async (): Promise<EventTagsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events-tags", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventTagsResponse>(error, "Une erreur est survenue lors de la récupération des tags d'événements");
  }
};

export const fetchTopEventTags = async (): Promise<EventTagsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events-tags/top", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventTagsResponse>(error, "Une erreur est survenue lors de la récupération des tags populaires");
  }
};
