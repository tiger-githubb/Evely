"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { Building2, Home } from "lucide-react";
import { useTranslations } from "next-intl"; // Import useTranslations
import Link from "next/link";

export default function OrganizationNotFound() {
  const t = useTranslations("OrganizationNotFound"); // Fetch translations for this component

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-20vh)]">
      <Card className="w-full max-w-2xl mx-4 border-none">
        <CardHeader className="text-center">
          <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <CardTitle className="text-2xl">{t("organizationNotFoundTitle")}</CardTitle> {/* Translated Title */}
          <CardDescription>{t("organizationNotFoundDescription")}</CardDescription> {/* Translated Description */}
        </CardHeader>
        <CardContent className="flex justify-center gap-4">
          <Link href={routes.board.organization.all}>
            <Button variant="outline" className="gap-2">
              <Building2 className="w-4 h-4" />
              {t("viewOrganizations")} {/* Translated Button Text */}
            </Button>
          </Link>
          <Link href={routes.board.dashboard}>
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              {t("backToDashboard")} {/* Translated Button Text */}
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
