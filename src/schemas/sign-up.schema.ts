import { z } from "zod";

export const createSignUpFormSchema = (t: (key: string) => string) =>
  z
    .object({
      firstName: z.string().min(1, t("firstNameRequired")),
      lastName: z.string().min(1, t("lastNameRequired")),
      email: z.string().email(t("emailInvalid")),
      password: z
        .string()
        .min(8, t("passwordMin"))
        .regex(/[!@#$%^&*(),.?":{}|<>]/, t("passwordSymbol")),
      password_confirmation: z.string().min(8, t("passwordConfirmationMin")),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("passwordMismatch"),
      path: ["password_confirmation"],
    });

export type SignUpFormSchema = ReturnType<typeof createSignUpFormSchema>;
export type SignUpFormType = z.infer<SignUpFormSchema>;
