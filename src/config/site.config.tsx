import { default as logoIconImg, default as logoImg } from "@public/logos/logo-dan-benin.png"; // TODO: Update with Yala logo
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const siteConfig = {
  title: "Yala",
  description:
    "La plateforme innovante de gestion d'événements au Togo - Découvrez, organisez et réservez vos événements en toute simplicité",
  logo: logoImg,
  icon: logoIconImg,
  // TODO: Add Yala favicon
};

export const metaObject = (title?: string, openGraph?: OpenGraph, description: string = siteConfig.description): Metadata => {
  return {
    title: title ? `${title} - Yala` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Yala` : title,
      description,
      url: "https://yala.events", // TODO: Update with actual domain

      siteName: "Yala",
      images: {
        url: logoImg.src, // TODO: Update with Yala brand image
        width: 1200,
        height: 630,
      },
      locale: "fr_TG",
      type: "website",
    },
  };
};
