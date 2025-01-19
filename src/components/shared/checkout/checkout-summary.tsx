"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslations } from "next-intl";

interface CheckoutSummaryProps {
  onConfirm: () => void;
}

export function CheckoutSummary({ onConfirm }: CheckoutSummaryProps) {
  const t = useTranslations("checkoutSummary");

  return (
    <div className="space-y-6">
      <Card className="p-4">
        {/* Replace with the summary content, e.g., */}
        <p>{t("orderSummary")}</p>
      </Card>
      <Button className="w-full" onClick={onConfirm}>
        {t("confirmAndPay")}
      </Button>
    </div>
  );
}
