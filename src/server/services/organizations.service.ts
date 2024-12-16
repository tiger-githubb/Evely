import { CreateOrganizationType } from "@/schemas/organization.schema";
import { Organization } from "@/types/api/organization.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface OrganizationsResponse {
  data: Organization[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export interface OrganizationResponse {
  data: Organization;
}

export const getOrganizations = async (): Promise<OrganizationsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/organizations", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<OrganizationsResponse>(error, "Une erreur est survenue lors de la récupération des organisations");
  }
};
export const getOrganization = async (id: string): Promise<OrganizationResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get<OrganizationResponse>(`/organizations/${id}`, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<OrganizationResponse>(error, "Une erreur est survenue lors de la récupération de l'organisation");
  }
};

export const createOrganization = async (organizationData: CreateOrganizationType) => {
  try {
    const formData = new FormData();
    formData.append("name", organizationData.name);
    formData.append("logo", organizationData.logo);
    formData.append("coverImage", organizationData.coverImage);
    formData.append("description", organizationData.description);
    if (organizationData.website) {
      formData.append("website", organizationData.website);
    }

    const headers = await getAuthHeaders();
    const { data } = await api.post("/organizations", formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la création de l'organisation");
  }
};

export const updateOrganization = async (id: string, organizationData: CreateOrganizationType) => {
  try {
    const formData = new FormData();
    formData.append("name", organizationData.name);
    formData.append("description", organizationData.description);

    // Only append logo if it's a File object
    if (organizationData.logo instanceof File) {
      formData.append("logo", organizationData.logo);
    } else if (typeof organizationData.logo === "string") {
      formData.append("logo", organizationData.logo);
    }

    // Only append coverImage if it's a File object
    if (organizationData.coverImage instanceof File) {
      formData.append("coverImage", organizationData.coverImage);
    } else if (typeof organizationData.coverImage === "string") {
      formData.append("coverImage", organizationData.coverImage);
    }

    if (organizationData.website) {
      formData.append("website", organizationData.website);
    }

    const headers = await getAuthHeaders();
    const { data } = await api.put(`/organizations/${id}`, formData, {
      headers: {
        ...headers,
        "Content-Type": "multipart/form-data",
      },
    });

    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la modification de l'organisation");
  }
};

export const deleteOrganization = async (organizationId: number): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/organizations/${organizationId}`, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la suppression de l'organisation");
  }
};
