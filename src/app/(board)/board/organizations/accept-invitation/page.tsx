"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { acceptOrganizationInvitation } from "@/server/services/organizations.service";
import { useTranslations } from "next-intl";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const token = searchParams.get("token");
  const t = useTranslations("AcceptInvitationPage"); // Fetch translations for this page

  useEffect(() => {
    if (!token) {
      toast.error(t("invalidToken"));
      router.push(routes.board.dashboard);
    }
  }, [token, router, t]);

  const handleAcceptInvitation = async () => {
    try {
      setIsLoading(true);
      if (!token) return;

      console.log(token);
      const result = await acceptOrganizationInvitation(token);

      if (result) {
        toast.success(t("invitationAccepted"));
        router.push(routes.board.organization.all);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>{t("acceptInvitationTitle")}</CardTitle>
          <CardDescription>{t("acceptInvitationDescription")}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAcceptInvitation} disabled={isLoading} className="w-full">
            {isLoading ? t("processing") : t("acceptInvitationButton")}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
