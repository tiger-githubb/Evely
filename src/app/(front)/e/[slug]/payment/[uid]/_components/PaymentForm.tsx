"use client";
import { PaymentMethodsSkeleton } from "@/components/shared/ui-skeletons";
import { Card } from "@/components/ui/card";
import { createPayment, fetchPaymentMethods } from "@/server/services/payments.service";
import { getImageUrl } from "@/utils/image-utils";
import sideImage from "@public/images/sliders/women-fiesta.jpg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";

function EmptyPaymentMethods() {
  const t = useTranslations("paymentForm.empty");

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold">{t("title")}</h3>
      <p className="text-sm text-muted-foreground mt-2">{t("description")}</p>
    </div>
  );
}

function ErrorPaymentMethods() {
  const t = useTranslations("paymentForm.error");

  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <AlertCircle className="h-12 w-12 text-destructive mb-4" />
      <h3 className="text-lg font-semibold">{t("title")}</h3>
      <p className="text-sm text-muted-foreground mt-2">{t("description")}</p>
      <button onClick={() => window.location.reload()} className="mt-4 text-sm text-primary hover:underline">
        {t("retry")}
      </button>
    </div>
  );
}

export function PaymentForm({ uid }: { uid: string }) {
  const t = useTranslations("paymentForm");
  const {
    data: paymentMethodsResponse,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: fetchPaymentMethods,
  });

  const paymentMethods =
    paymentMethodsResponse?.data.map((method) => ({
      id: method.id,
      name: t("methodName", { name: method.name }),
      description: t("methodDescription"),
      logo: method.icon,
      isAvailable: true,
    })) || [];

  const paymentMutation = useMutation({
    mutationFn: createPayment,
    onSuccess: (data) => {
      window.location.href = data.data.metadata.url;
    },
  });

  const handlePayment = (methodId: number) => {
    paymentMutation.mutate({
      paymentMethodId: methodId,
      uid: uid,
    });
  };

  const renderContent = () => {
    if (isLoading) return <PaymentMethodsSkeleton />;
    if (isError) return <ErrorPaymentMethods />;
    if (!paymentMethods.length) return <EmptyPaymentMethods />;

    return (
      <div className="flex flex-col gap-4">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className="p-6 transition-all cursor-pointer hover:shadow-lg hover:scale-[1.02]"
            onClick={() => handlePayment(method.id)}
          >
            <div className="flex items-center gap-6">
              <Image src={getImageUrl(method.logo)} alt={method.name} width={40} height={40} className="h-10" />
              <div className="flex-1">
                <h3 className="font-semibold text-lg">{method.name}</h3>
                <p className="text-sm text-muted-foreground">{method.description}</p>
              </div>
              {paymentMutation.isPending && <Loader2 className="h-6 w-6 animate-spin" />}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="grid h-[90vh] lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image src={sideImage.src} alt="Image" fill className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.6]" />
        <div className="absolute inset-0" />
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-2xl font-bold text-white">{t("leftSection.title")}</h2>
          <p className="mt-2">{t("leftSection.description")}</p>
        </div>
      </div>

      <div className="flex flex-col p-6 md:p-10">
        <Link href=".." className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={20} />
          <span>{t("back")}</span>
        </Link>

        <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>

        {renderContent()}

        <div className="mt-auto pt-8 text-center text-sm text-muted-foreground">
          <p>{t("terms")}</p>
        </div>
      </div>
    </div>
  );
}
