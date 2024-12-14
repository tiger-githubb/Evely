import { ApiError } from "@/types/api-error.type";
import { AxiosError } from "axios";
import { toast } from "sonner";

export class ApiErrorHandler {
  static handle<T>(error: unknown, defaultMessage: string): T {
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiError;
      toast.error(apiError.message);
      throw new Error(apiError.message);
    }
    toast.error(defaultMessage);
    throw new Error(defaultMessage);
  }
}
