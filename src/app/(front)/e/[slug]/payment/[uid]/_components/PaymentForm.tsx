"use client";
import { Card } from "@/components/ui/card";
import { createPayment, fetchPaymentMethods } from "@/server/services/payments.service";
import { getImageUrl } from "@/utils/image-utils";
import sideImage from "@public/images/sliders/women-fiesta.jpg";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function PaymentForm({ uid }: { uid: string }) {
  const { data: paymentMethodsResponse } = useQuery({
    queryKey: ["paymentMethods"],
    queryFn: fetchPaymentMethods,
  });

  const paymentMethods =
    paymentMethodsResponse?.data.map((method) => ({
      id: method.id,
      name: `Payer avec ${method.name}`,
      description: "Carte bancaire, Mobile Money, Transfert bancaire",
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

  return (
    <div className="grid h-[90vh] lg:grid-cols-2">
      <div className="relative hidden bg-muted lg:block">
        <Image
          src={sideImage.src}
          alt="Image"
          fill
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
        <div className="absolute inset-0 " />
        <div className="absolute bottom-6 left-6 text-white">
          <h2 className="text-2xl font-bold text-white">Paiement sécurisé</h2>
          <p className="mt-2">Vos transactions sont protégées par un cryptage de bout en bout</p>
        </div>
      </div>

      <div className="flex flex-col p-6 md:p-10">
        <Link href=".." className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft size={20} />
          <span>Retour</span>
        </Link>

        <h1 className="text-2xl font-bold mb-6">Choisissez votre mode de paiement</h1>

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

        <div className="mt-auto pt-8 text-center text-sm text-muted-foreground">
          <p>En effectuant ce paiement, vous acceptez nos conditions générales de vente</p>
        </div>
      </div>
    </div>
  );
}
