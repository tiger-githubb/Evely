import slider1 from "@public/images/sliders/afrique-event.jpg";
import slider3 from "@public/images/sliders/evenement-fete.jpeg";
import slider2 from "@public/images/sliders/evenement-mode.jpeg";

export const signInSlides = [
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

export const LOCALE = "fr";

export const ROLES = {
  Administrator: "Administrator",
  Customer: "Customer",
} as const;

export const EVENT_TYPE = {
  ONLINE: "En ligne",
  IN_PERSON: "En présentiel",
};
