import { OrganizationFollower } from "@/types/api/organization-follower.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface FollowersResponse {
  data: OrganizationFollower[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchOrganizationFollowers = async (organizationId: string): Promise<FollowersResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get(`/organizations-followers/${organizationId}`, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<FollowersResponse>(error, "Une erreur est survenue lors de la récupération des followers");
  }
};

export const deleteOrganizationFollower = async (followerId: number): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/organizations-followers/${followerId}`, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la suppression du follower");
  }
};

export const followOrganization = async (organizationId: number): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.post(`/organizations/follow/${organizationId}`, null, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors du suivi de l'organisation");
  }
};

export const unfollowOrganization = async (organizationId: number): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/organizations/follow/${organizationId}`, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors du désabonnement de l'organisation");
  }
};
