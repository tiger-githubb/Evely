"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { acceptOrganizationInvitation } from "@/server/services/organizations.service";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AcceptInvitationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Token d'invitation invalide");
      router.push(routes.board.dashboard);
    }
  }, [token, router]);

  const handleAcceptInvitation = async () => {
    try {
      setIsLoading(true);
      if (!token) return;

      console.log(token);
      const result = await acceptOrganizationInvitation(token);

      if (result) {
        toast.success("Invitation acceptée avec succès");
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
          <CardTitle>Accepter l&apos;invitation</CardTitle>
          <CardDescription>
            Vous êtes sur le point de rejoindre une organisation. Cliquez sur le bouton ci-dessous pour accepter l&apos;invitation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleAcceptInvitation} disabled={isLoading} className="w-full">
            {isLoading ? "Traitement en cours..." : "Accepter l'invitation"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
