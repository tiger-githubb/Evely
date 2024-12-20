import { default as logoIconImg, default as logoImg } from "@public/logos/logo-dan-benin.png"; // TODO: Update with Evely logo
import { Metadata } from "next";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const siteConfig = {
  title: "Evely",
  description:
    "La plateforme innovante de gestion d'événements au Togo - Découvrez, organisez et réservez vos événements en toute simplicité",
  logo: logoImg,
  icon: logoIconImg,
  // TODO: Add Evely favicon
};

export const metaObject = (title?: string, openGraph?: OpenGraph, description: string = siteConfig.description): Metadata => {
  return {
    title: title ? `${title} - Evely` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Evely` : title,
      description,
      url: "https://evely.tg", // TODO: Update with actual domain
      siteName: "Evely",
      images: {
        url: logoImg.src, // TODO: Update with Evely brand image
        width: 1200,
        height: 630,
      },
      locale: "fr_TG",
      type: "website",
    },
  };
};
