import { CreateOrderType } from "@/schemas/order.schema";
import { Order } from "@/types/api/order.type";
import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

export interface OrdersResponse {
  data: Order[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const previewOrder = async (orderData: CreateOrderType) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.post("/users-events-tickets-orders/preview", orderData, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la prévisualisation de la commande");
  }
};

export const createOrder = async (orderData: CreateOrderType) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.post("/users-events-tickets-orders", orderData, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la création de la commande");
  }
};

export const fetchOrders = async (): Promise<OrdersResponse> => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.get("/users-events-tickets-orders", { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<OrdersResponse>(error, "Une erreur est survenue lors de la récupération des commandes");
  }
};

export const deleteOrder = async (orderId: number): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await api.delete(`/users-events-tickets-orders/${orderId}`, { headers });
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la suppression de la commande");
  }
};
