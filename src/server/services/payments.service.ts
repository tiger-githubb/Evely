import { PaymentMethod } from "@/types/api/payment.type";
import { ApiErrorHandler } from "@/utils/api-error";
import api from "@/utils/axios-instance";

interface CreatePaymentParams {
  paymentMethodId: number;
  uid: string;
}

interface PaymentMethodsResponse {
  data: PaymentMethod[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
}

export const fetchPaymentMethods = async (): Promise<PaymentMethodsResponse> => {
  try {
    const { data } = await api.get("/payments-methods");
    return data;
  } catch (error) {
    return ApiErrorHandler.handle<PaymentMethodsResponse>(
      error,
      "Une erreur est survenue lors de la récupération des moyens de paiement"
    );
  }
};

export const createPayment = async ({ paymentMethodId, uid }: CreatePaymentParams) => {
  try {
    const { data } = await api.post("/events-tickets-payments", { paymentMethodId, uid });
    return data;
  } catch (error) {
    return ApiErrorHandler.handle(error, "Une erreur est survenue lors de la création du paiement");
  }
};
