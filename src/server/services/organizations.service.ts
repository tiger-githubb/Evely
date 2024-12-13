import { CreateOrganizationType } from "@/schemas/organization.schema";
import { Organization } from "@/types/api/organization.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface OrganizationResponse {
  data: Organization[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const getOrganizations = async (): Promise<OrganizationResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/organizations", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<OrganizationResponse>(error, "Une erreur est survenue lors de la récupération des organisations");
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
