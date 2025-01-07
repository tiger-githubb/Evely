import { routes } from "@/config/routes";

import { signInSlides } from "@/config/constants";
import { Metadata } from "next";
import { AuthWrapper } from "../_components/auth-wrapper";
import { SignInForm } from "./_components/sign-in-form";

export const metadata: Metadata = {
  title: "Connexion | Yala",
  description: "Connectez-vous à votre compte Yala pour gérer vos événements au Togo.",
};

export default function AuthenticationPage() {
  return (
    <AuthWrapper
      title="Connexion"
      description="Entrez vos identifiants pour vous connecter"
      linkText="Inscription"
      linkHref={routes.auth.signUp}
      slides={signInSlides}
      showLegalNotice={false}
    >
      <SignInForm />
    </AuthWrapper>
  );
}
