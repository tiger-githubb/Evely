"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, RefreshCcw } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PaymentFailedPage() {
  const t = useTranslations("paymentFailed");

  return (
    <div className="grid h-[90vh] lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-red-500/20 to-red-600/40" />
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-2xl font-bold">{t("leftSection.title")}</h2>
          <p className="mt-2">{t("leftSection.description")}</p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center p-6 text-center md:p-10">
        <Card className="w-full max-w-md p-8">
          <AlertCircle className="mx-auto h-16 w-16 text-red-500" />

          <h1 className="mt-6 text-2xl font-bold">{t("title")}</h1>

          <div className="mt-4 space-y-2 text-muted-foreground">
            <p>{t("message1")}</p>
            <p>{t("message2")}</p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            <Button className="w-full gap-2">
              <RefreshCcw size={16} />
              {t("retryButton")}
            </Button>

            <Link href=".">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft size={16} />
                {t("backButton")}
              </Button>
            </Link>
          </div>
        </Card>

        <p className="mt-8 text-sm text-muted-foreground">{t("supportMessage")}</p>
      </div>
    </div>
  );
}
