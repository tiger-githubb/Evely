import { default as logoImg } from "@public/logos/logo-dan-benin.png"; // TODO: Update with Yala logo
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { OpenGraph } from "next/dist/lib/metadata/types/opengraph-types";

export const useSiteTranslations = () => {
  return useTranslations("Config.Site");
};

export const siteConfig = {
  logo: logoImg,
  icon: logoImg,
};

type MetaObjectParams = {
  title?: string;
  description: string;
  openGraph?: OpenGraph;
  t: (key: string) => string;
};

export const createMetaObject = ({ title, description, openGraph, t }: MetaObjectParams): Metadata => {
  return {
    title: title ? `${title} - ${t("title")}` : t("title"),
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - ${t("title")}` : t("title"),
      description,
      url: t("url"),
      siteName: t("title"),
      images: {
        url: siteConfig.logo.src,
        width: 1200,
        height: 630,
      },
      locale: t("locale"),
      type: "website",
    },
  };
};
