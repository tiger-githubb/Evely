import { Role } from "@/types/api/role.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface RolesResponse {
  data: Role[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchOrganizationRoles = async (): Promise<RolesResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/organizations-roles", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<RolesResponse>(error, "Une erreur est survenue lors de la récupération des rôles");
  }
};
