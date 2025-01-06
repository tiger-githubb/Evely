import { ApiError } from "@/types/api-error.type";
import { AxiosError } from "axios";
import { toast } from "sonner";

export class ApiErrorHandler {
  static handle<T>(error: unknown, defaultMessage: string): T {
    if (typeof window === "undefined") {
      // Server-side handling
      console.error(defaultMessage, error);
      return null as T;
    }

    // Client-side handling
    if (error instanceof AxiosError && error.response?.data) {
      const apiError = error.response.data as ApiError;
      toast.error(apiError.message);
      return null as T;
    }
    toast.error(defaultMessage);
    return null as T;
  }
}
