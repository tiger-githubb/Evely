import { CreateEventType } from "@/schemas/event.schema";
import { fetchOrganizationIdBySlug } from "@/server/services/organizations.service";
import { Event, EventTicket } from "@/types/api/event.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface EventTicketsResponse {
  data: EventTicket[];
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

export const fetchEvent = async (slug: string) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get(`/events/slug/${slug}`, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la récupération de l'événement");
  }
};

export const fetchPublicEvents = async (): Promise<EventsResponse> => {
  try {
    const { data } = await api.get("/events/published");
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

export const fetchEventTickets = async (eventId: number, organizationId: number): Promise<EventTicket[]> => {
  try {
    const { data } = await api.get(`/events-tickets/${eventId}/${organizationId}`);
    return data.data;
  } catch (error) {
    return ApiErrorHandler.handle<EventTicket[]>(error, "Une erreur est survenue lors de la récupération des tickets");
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

export const fetchOrganizationEvents = async (organizationSlug: string): Promise<EventsResponse> => {
  try {
    if (!organizationSlug) {
      throw new Error("Organization slug is required but was not provided.");
    }

    const organizationId = await fetchOrganizationIdBySlug(organizationSlug);
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
export const createEvent = async (organizationSlug: string, eventData: CreateEventType) => {
  try {
    const organizationId = await fetchOrganizationIdBySlug(organizationSlug);
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
export const updateEvent = async (organizationSlug: string, eventId: number, eventData: Partial<CreateEventType>) => {
  try {
    const organizationId = await fetchOrganizationIdBySlug(organizationSlug);
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
export const deleteEvent = async (organizationSlug: string, eventId: number): Promise<void> => {
  try {
    const organizationId = await fetchOrganizationIdBySlug(organizationSlug);
    const headers = await getAuthHeaders();
    await api.delete(`/events/organization/${organizationId}/${eventId}`, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la suppression de l'événement");
  }
};

// Update media for an event
export const updateEventMedia = async (organizationSlug: string, eventId: number, mediaData: FormData) => {
  try {
    const organizationId = await fetchOrganizationIdBySlug(organizationSlug);
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
export const updateEventPublishStatus = async (organizationSlug: string, eventId: number, draft: boolean) => {
  try {
    const organizationId = await fetchOrganizationIdBySlug(organizationSlug);
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
