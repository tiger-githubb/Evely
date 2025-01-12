import { ApiErrorHandler } from "@/utils/api-error";
import { getAuthHeaders } from "@/utils/auth-utils";
import api from "@/utils/axios-instance";

interface CreatePaymentParams {
  paiementMethodId: number;
  uid: string;
}

export const createPayment = async ({ paiementMethodId, uid }: CreatePaymentParams) => {
  try {
    const headers = await getAuthHeaders();
    const { data } = await api.post("/events-tickets-paiements", { paiementMethodId, uid }, { headers });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la création du paiement");
  }
};
