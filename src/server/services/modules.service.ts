import { Module } from "@/types/api/module.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface ModulesResponse {
  data: Module[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchOrganizationModules = async (): Promise<ModulesResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/organizations-modules", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<ModulesResponse>(error, "Une erreur est survenue lors de la récupération des modules");
  }
};
