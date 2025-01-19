"use client";
import { useTranslations } from "next-intl";

export const HeroSection = () => {
  const t = useTranslations("ttd");

  return (
    <div className="relative overflow-hidden">
      <div className="animate-gradient-x bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 h-[400px] flex items-center justify-center">
        <div className="text-center text-white space-y-4 px-4">
          <h1 className="text-4xl md:text-6xl font-bold">{t("hero.title")}</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">{t("hero.description")}</p>
        </div>
      </div>
    </div>
  );
};
