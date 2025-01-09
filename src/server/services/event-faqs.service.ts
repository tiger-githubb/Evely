import { CreateEventFaqType, UpdateEventFaqType } from "@/schemas/event-faq.schema";
import { EventFaq } from "@/types/api/event-faq.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface EventFaqsResponse {
  data: EventFaq[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export interface EventFaqResponse {
  data: EventFaq;
}






export const fetchEventFaqs = async (): Promise<EventFaqsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/events-faqs", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventFaqsResponse>(error, "Une erreur est survenue lors de la récupération des FAQs");
  }
};

export const createEventFaq = async (faqData: CreateEventFaqType): Promise<EventFaqResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.post("/events-faqs", faqData, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventFaqResponse>(error, "Une erreur est survenue lors de la création de la FAQ");
  }
};

export const updateEventFaq = async (id: number, faqData: UpdateEventFaqType): Promise<EventFaqResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.put(`/events-faqs/${id}`, faqData, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventFaqResponse>(error, "Une erreur est survenue lors de la modification de la FAQ");
  }
};

export const deleteEventFaq = async (id: number): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/events-faqs/${id}`, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la suppression de la FAQ");
  }
};
