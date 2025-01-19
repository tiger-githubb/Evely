"use client";

import { useTranslations } from "next-intl";

export function RevenueChart() {
  const t = useTranslations();

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-xl font-semibold mb-4">{t("revenueChart.title")}</h2>
      {/* Integrate revenue chart here */}
    </div>
  );
}
