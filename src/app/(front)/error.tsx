"use client";

import { Button } from "@/components/ui/button";
import Section from "@/components/ui/custom/section";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PiWarningDuotone } from "react-icons/pi";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Section className="flexflex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4 rounded-lg bg-white p-6">
        <PiWarningDuotone className="text-9xl text-red-500" />
        <h2 className="text-2xl font-bold text-gray-800">Oups ! Quelque chose s&apos;est mal passé.</h2>
        <p className="text-center text-gray-600">
          Nous avons rencontré une erreur inattendue. Veuillez essayer les actions suivantes :
        </p>
        <ul className="list-inside list-disc text-gray-600">
          <li>Vérifiez votre connexion Internet.</li>
          <li>Rafraîchissez la page.</li>
          <li>Contactez le support si le problème persiste.</li>
        </ul>
        <div className="mt-4 flex gap-4">
          <Button onClick={() => router.push("/")}>Aller à la page d&apos;accueil</Button>
          <Button onClick={() => reset()}>Réessayer</Button>
        </div>
      </div>
    </Section>
  );
}
