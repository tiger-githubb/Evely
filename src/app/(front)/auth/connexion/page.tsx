import { routes } from "@/config/routes";
import slider1 from "@public/images/sliders/afrique-event.jpg";
import slider3 from "@public/images/sliders/evenement-fete.jpeg";
import slider2 from "@public/images/sliders/evenement-mode.jpeg";
import { Metadata } from "next";
import { AuthWrapper } from "../_components/auth-wrapper";
import { SignInForm } from "./_components/sign-in-form";

export const metadata: Metadata = {
  title: "Connexion | Evely",
  description: "Connectez-vous à votre compte Evely pour gérer vos événements au Togo.",
};

const slides = [
  {
    quote: "Evely simplifie l'organisation et la découverte d'événements au Togo. Rejoignez notre communauté!",
    author: "L'équipe Evely",
    image: slider1.src,
  },
  {
    quote: "Découvrez les meilleurs événements culturels du Togo en un clic.",
    author: "Marie K.",
    image: slider2.src,
  },
  {
    quote: "Une nouvelle façon de vivre les événements au Togo.",
    author: "John D.",
    image: slider3.src,
  },
];

export default function AuthenticationPage() {
  return (
    <AuthWrapper
      title="Connexion"
      description="Entrez vos identifiants pour vous connecter"
      linkText="Inscription"
      linkHref={routes.auth.signUp}
      slides={slides}
    >
      <SignInForm />
    </AuthWrapper>
  );
}
