"use client";

import { Button } from "@/components/ui/button";
import Section from "@/components/ui/custom/section";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PiWarningDuotone } from "react-icons/pi";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();
  const t = useTranslations(); // Using the useTranslations hook

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="flexflex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6">
        <PiWarningDuotone className="text-9xl text-red-500" />
        <h2 className="text-2xl font-bold text-gray-800">{t("error.title")}</h2>
        <p className="text-center text-gray-600">{t("error.description")}</p>
        <ul className="list-inside list-disc text-gray-600">
          <li>{t("error.action1")}</li>
          <li>{t("error.action2")}</li>
          <li>{t("error.action3")}</li>
        </ul>
        <div className="mt-4 flex gap-4">
          <Button onClick={() => router.push("/")}>{t("error.goHomeButton")}</Button>
          <Button onClick={() => reset()}>{t("error.retryButton")}</Button>
        </div>
      </div>
    </Section>
  );
}
