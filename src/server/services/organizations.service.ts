import { CreateOrganizationDto } from "@/types/api/organization.type";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export const createOrganization = async (organizationData: CreateOrganizationDto) => {
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
};
