"use client";
import { routes } from "@/config/routes";
import { validateEmail } from "@/server/services/auth.service";
import { signOut, useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data: session } = useSession();
  const [status, setStatus] = useState<"verifying" | "success" | "error">("verifying");

  useEffect(() => {
    const verifyEmail = async () => {
      if (!token || !session?.user?.id) {
        setStatus("error");
        return;
      }

      try {
        const result = await validateEmail(Number(session.user.id), token);
        if (result) {
          setStatus("success");
          setTimeout(() => {
            signOut();
            router.push(routes.auth.signIn);
          }, 3000);
        } else {
          setStatus("error");
        }
      } catch {
        setStatus("error");
      }
    };

    verifyEmail();
  }, [token, router, session]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        {status === "verifying" && (
          <div>
            <h1 className="text-2xl font-bold">Vérification de votre email...</h1>
            <p>Veuillez patienter pendant que nous vérifions votre adresse email.</p>
          </div>
        )}

        {status === "success" && (
          <div>
            <h1 className="text-2xl font-bold text-green-600">Email vérifié avec succès!</h1>
            <p>Vous allez être redirigé vers la page de connexion...</p>
          </div>
        )}

        {status === "error" && (
          <div>
            <h1 className="text-2xl font-bold text-red-600">Échec de la vérification</h1>
            <p>Le lien de vérification est invalide ou a expiré.</p>
          </div>
        )}
      </div>
    </div>
  );
}
