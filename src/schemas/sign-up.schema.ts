import { z } from "zod";

export const signUpFormSchema = z
  .object({
    npi: z.string(),
    lastname: z.string().min(1, "Le nom est requis"),
    firstname: z.string().min(1, "Le prénom est requis"),
    email: z.string().email("Adresse e-mail invalide"),
    phone: z.string().min(1, "Le numéro de téléphone est requis"),
    region_id: z.string().min(1, "L'identifiant de la région est requis"),
    city: z.string().min(1, "La ville est requise"),
    address: z.string().min(1, "L'adresse est requise"),
    gender: z.enum(["M", "F"], {
      errorMap: () => ({ message: "Le genre est requis" }),
    }),
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères")
      .regex(
        /[!@#$%^&*(),.?":{}|<>]/,
        "Le mot de passe doit contenir au moins un symbole",
      ),
    password_confirmation: z
      .string()
      .min(
        8,
        "La confirmation du mot de passe doit contenir au moins 8 caractères",
      ),
    conditions: z
      .boolean()
      .refine(
        (val) => val === true,
        "Vous devez accepter les conditions d'utilisation",
      ),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Les mots de passe ne correspondent pas",
    path: ["password_confirmation"],
  });
