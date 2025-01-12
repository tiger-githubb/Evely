"use client";
import { Card } from "@/components/ui/card";
import { createPayment } from "@/server/services/payments.service";
import MixYasLogo from "@public/images/logos/mix.png";
import MoovMoneyLogo from "@public/images/logos/moov-money.png";
import StripeLogo from "@public/images/logos/stripe.png";
import sideImage from "@public/images/sliders/women-fiesta.jpg";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PAYMENT_METHODS = [
  {
    id: 1,
    name: "Payer avec Stripe",
    description: "Carte bancaire, Apple Pay, Google Pay",
    logo: StripeLogo.src,
    isAvailable: true,
  },
  {
    id: 2,
    name: "Payer avec Moov Money",
    description: "Mobile Money",
    logo: MoovMoneyLogo.src,
    isAvailable: false,
  },
  {
    id: 3,
    name: "Payer avec Mix by Yass",
    description: "Mobile Money",
    logo: MixYasLogo.src,
    isAvailable: false,
  },
] as const;

export function PaymentForm({ uid }: { uid: string }) {
  const paymentMutation = useMutation({
    mutationFn: createPayment,
    onSuccess: (data) => {
      window.location.href = data.data.metadata.url;
    },
  });

  const handlePayment = (methodId: number) => {
    paymentMutation.mutate({
      paiementMethodId: methodId,
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
          {PAYMENT_METHODS.map((method) => (
            <Card
              key={method.id}
              className={`p-6 transition-all ${
                method.isAvailable ? "cursor-pointer hover:shadow-lg hover:scale-[1.02]" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => method.isAvailable && handlePayment(method.id)}
            >
              <div className="flex items-center gap-6">
                <Image src={method.logo} alt={method.name} width={40} height={40} className="h-10" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{method.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {method.description} {!method.isAvailable && "(Bientôt disponible)"}
                  </p>
                </div>
                {paymentMutation.isPending && method.id === 1 && <Loader2 className="h-6 w-6 animate-spin" />}
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
