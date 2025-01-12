import { ApiErrorHandler } from "@/utils/api-error";
import api from "@/utils/axios-instance";

interface CreatePaymentParams {
  paiementMethodId: number;
  uid: string;
}

export const createPayment = async ({ paiementMethodId, uid }: CreatePaymentParams) => {
  try {
    const { data } = await api.post("/events-tickets-paiements", { paiementMethodId, uid });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la création du paiement");
  }
};
