import { CreateRoleType, UpdateRoleType } from "@/schemas/role.schema";
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

export const createRole = async (roleData: CreateRoleType) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.post("/organizations-roles", roleData, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la création du rôle");
  }
};

export const updateRole = async (id: number, roleData: UpdateRoleType) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.put(`/organizations-roles/${id}`, roleData, {
      headers: {
        ...headers,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la modification du rôle");
  }
};

export const deleteRole = async (id: number): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/organizations-roles/${id}`, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la suppression du rôle");
  }
};
