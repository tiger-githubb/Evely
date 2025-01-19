"use client";

import { routes } from "@/config/routes";
import { validateEmail } from "@/server/services/auth.service";
import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function EmailVerificationPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const { data: session } = useSession();
  const t = useTranslations("emailVerification");
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
            <h1 className="text-2xl font-bold">{t("verifying.title")}</h1>
            <p>{t("verifying.description")}</p>
          </div>
        )}

        {status === "success" && (
          <div>
            <h1 className="text-2xl font-bold text-green-600">{t("success.title")}</h1>
            <p>{t("success.description")}</p>
          </div>
        )}

        {status === "error" && (
          <div>
            <h1 className="text-2xl font-bold text-red-600">{t("error.title")}</h1>
            <p>{t("error.description")}</p>
          </div>
        )}
      </div>
    </div>
  );
}
