import { EventCategory } from "@/types/api/event-category.type";
import { ApiErrorHandler } from "@/utils/api-error";
import api from "@/utils/axios-instance";

export interface EventCategoriesResponse {
  data: EventCategory[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchEventCategories = async (): Promise<EventCategoriesResponse> => {
  try {
    const { data } = await api.get("/events-categories");
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventCategoriesResponse>(
      error,
      "Une erreur est survenue lors de la récupération des catégories d'événements"
    );
  }
};
