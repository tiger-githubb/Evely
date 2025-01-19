import { CreateEventType } from "@/schemas/event.schema";

import { Event } from "@/types/api/event.type";
import { Ticket } from "@/types/api/ticket.types";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface EventTicketsResponse {
  data: Ticket[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export interface EventsResponse {
  data: Event[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

// Fetch a single event by its slug
export const fetchEvent = async (eventSlug: string) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get(`/events/slug/${eventSlug}`, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la récupération de l'événement");
  }
};

export const fetchEventTickets = async (eventId: number, organizationId: number): Promise<Ticket[]> => {
  try {
    const { data } = await api.get(`/events-tickets/${organizationId}/${eventId}`);
    return data.data;
  } catch (error) {
    return ApiErrorHandler.handle<Ticket[]>(error, "Une erreur est survenue lors de la récupération des tickets");
  }
};

// Fetch all events
export const fetchEvents = async (): Promise<EventsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventsResponse>(error, "Une erreur est survenue lors de la récupération des événements");
  }
};

// Fetch draft events
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

// Fetch published events
export const fetchPublishedEvents = async (): Promise<EventsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events/published", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventsResponse>(error, "Une erreur est survenue lors de la récupération des événements publiés");
  }
};

export interface SearchParams {
  search?: string;
  categories?: string;
  formats?: string;
  languages?: string;
  types?: string;
  ticketTypes?: string;
  startDate?: string;
  endDate?: string;
  currentPage?: number;
}
export const fetchPublicEvents = async (params: SearchParams): Promise<EventsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const queryParams = new URLSearchParams();

    // Ajouter tous les paramètres de manière dynamique
    Object.entries(params).forEach(([key, value]) => {
      if (value) queryParams.set(key, value);
    });

    const { data } = await api.get(`/events/published?${queryParams.toString()}`, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventsResponse>(error, "Une erreur est survenue lors de la récupération des événements");
  }
};

// Fetch single public event by slug (no authentication required)
export const fetchPublicEventBySlug = async (slug: string) => {
  try {
    const { data } = await api.get(`/events/published/${slug}`);
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la récupération de l'événement");
  }
};
// Fetch all events for a specific organization
export const fetchOrganizationEvents = async (organizationId: number): Promise<EventsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data: events } = await api.get(`/events/organization/${organizationId}`, { headers });
    return events;
  } catch (error) {
    return ApiErrorHandler.handle<EventsResponse>(
      error,
      "Une erreur est survenue lors de la récupération des événements de l'organisation"
    );
  }
};

// Create a new event for an organization
export const createEvent = async (organizationId: number, eventData: CreateEventType) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.post(`/events/organization/${organizationId}`, eventData, {
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

// Update an event for an organization
export const updateEvent = async (organizationId: number, eventId: number, eventData: Partial<CreateEventType>) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.put(`/events/organization/${organizationId}/${eventId}`, eventData, {
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

// Delete an event for an organization
export const deleteEvent = async (organizationId: number, eventId: number): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/events/organization/${organizationId}/${eventId}`, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la suppression de l'événement");
  }
};

// Update media for an event
export const updateEventMedia = async (organizationId: number, eventId: number, mediaData: FormData) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.put(`/events/organization/media/${organizationId}/${eventId}`, mediaData, {
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

// Update the publish status of an event
export const updateEventPublishStatus = async (organizationId: number, eventId: number, draft: boolean) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.put(
      `/events/organization/publish/${organizationId}/${eventId}`,
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
