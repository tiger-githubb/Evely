import { Permission } from "@/types/api/permission.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface PermissionsResponse {
  data: Permission[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchOrganizationPermissions = async (): Promise<PermissionsResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/organizations-permissions", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<PermissionsResponse>(error, "Une erreur est survenue lors de la récupération des permissions");
  }
};
