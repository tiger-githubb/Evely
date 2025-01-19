"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Home, Timer } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const t = useTranslations("paymentSuccess");

  return (
    <div className="grid h-[90vh] lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-green-600/40" />
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-2xl font-bold">{t("leftSection.title")}</h2>
          <p className="mt-2">{t("leftSection.description")}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6 text-center md:p-10">
        <Card className="w-full max-w-md p-8">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />

          <h1 className="mt-6 text-2xl font-bold">{t("title")}</h1>

          <div className="mt-4 space-y-2 text-muted-foreground">
            <p>{t("thanksMessage")}</p>
            <p>{t("emailConfirmation")}</p>
          </div>

          <div className="mt-6 flex items-center justify-center gap-2 text-sm">
            <Timer size={16} />
            <span>{t("processingTime")}</span>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Link href="/tickets">
              <Button className="w-full">{t("viewTicketsButton")}</Button>
            </Link>

            <Link href="/">
              <Button variant="outline" className="w-full gap-2">
                <Home size={16} />
                {t("returnHomeButton")}
              </Button>
            </Link>
          </div>
        </Card>

        <p className="mt-8 text-sm text-muted-foreground">{t("supportMessage")}</p>
      </div>
    </div>
  );
}
