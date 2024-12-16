import { CreateEventType } from "@/schemas/event.schema";
import { Event } from "@/types/api/event.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface EventsResponse {
  data: Event[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchEvents = async (): Promise<EventsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventsResponse>(error, "Une erreur est survenue lors de la récupération des événements");
  }
};

export const fetchDraftEvents = async (): Promise<EventsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events/draft", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventsResponse>(
      error,
      "Une erreur est survenue lors de la récupération des brouillons d'événements"
    );
  }
};

export const fetchPublishedEvents = async (): Promise<EventsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events/published", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventsResponse>(error, "Une erreur est survenue lors de la récupération des événements publiés");
  }
};

export const fetchOrganizationEvents = async (organizationId: string): Promise<EventsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get(`/events/${organizationId}`, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventsResponse>(
      error,
      "Une erreur est survenue lors de la récupération des événements de l'organisation"
    );
  }
};

export const createEvent = async (organizationId: string, eventData: CreateEventType) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.post(`/events/${organizationId}`, eventData, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la création de l'événement");
  }
};

export const updateEvent = async (organizationId: string, eventId: number, eventData: Partial<CreateEventType>) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.put(`/events/${organizationId}/${eventId}`, eventData, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la modification de l'événement");
  }
};

export const deleteEvent = async (organizationId: string, eventId: number): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/events/${organizationId}/${eventId}`, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la suppression de l'événement");
  }
};

export const updateEventMedia = async (organizationId: string, eventId: number, mediaData: FormData) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.put(`/events/media/${organizationId}/${eventId}`, mediaData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la mise à jour des médias");
  }
};

export const updateEventPublishStatus = async (organizationId: string, eventId: number, draft: boolean) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.put(
      `/events/publish/${organizationId}/${eventId}`,
      { draft },
      {
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
      }
    );
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la modification du statut de publication");
  }
};
