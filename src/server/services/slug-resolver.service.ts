import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface OrganizationResponse {
  id: string;
  name: string;
  slug: string;
}

export interface EventResponse {
  id: string;
  title: string;
  slug: string;
}

/**
 * Fetch organization by slug
 * @param organizationSlug - The slug of the organization
 * @returns OrganizationResponse
 */
export const fetchOrganizationBySlug = async (organizationSlug: string): Promise<OrganizationResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get<OrganizationResponse>(`/organizations/slug/${organizationSlug}`, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<OrganizationResponse>(
      error,
      "Erreur lors de la récupération de l'organisation par slug"
    );
  }
};

/**
 * Fetch event by slug within a specific organization
 * @param organizationId - The ID of the organization
 * @param eventSlug - The slug of the event
 * @returns EventResponse
 */
export const fetchEventBySlug = async (
  organizationId: string,
  eventSlug: string
): Promise<EventResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get<EventResponse>(
      `/events/organization/${organizationId}/slug/${eventSlug}`,
      { headers }
    );
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<EventResponse>(error, "Erreur lors de la récupération de l'événement par slug");
  }
};


/**
 * Fetch organization ID by slug
 * @param slug - The slug of the organization
 * @returns number
 */
export async function resolveSlug(entity: "organization" | "event", slug: string): Promise<number> {
  try {
    const headers = await getAuthHeaders();

    const endpoint =
      entity === "organization"
        ? `/organizations/slug/${slug}`
        : `/events/slug/${slug}`;

    const { data } = await api.get(endpoint, { headers });

    if (entity === "organization") {
      return data.data.id; // Return the organization ID
    } else if (entity === "event") {
      return data.data.id; // Return the event ID
    }

    throw new Error("Invalid entity type provided.");
  } catch (error) {
    return ApiErrorHandler.handle<number>(
      error,
      `Une erreur est survenue lors de la résolution du slug pour ${entity}.`
    );
  }
}
