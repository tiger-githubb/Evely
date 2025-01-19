"use client";

import { BadgeCell } from "@/components/shared/table/badge-cell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Organization } from "@/types/api/organization.type";
import { Users } from "lucide-react";
import { useTranslations } from "next-intl"; // Import useTranslations

interface OrganizationStatsProps {
  organization: Organization;
}

export function OrganizationStats({ organization }: OrganizationStatsProps) {
  const t = useTranslations("OrganizationStats"); // Fetch translations for this component

  return (
    <div className="space-y-6">
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle>{t("detailedStats")}</CardTitle> {/* Translated Title */}
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{t("members")}</span> {/* Translated Members */}
            </div>
            <BadgeCell value={organization._count.users} variant="secondary" />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-gray-500" />
              <span className="text-gray-700">{t("followers")}</span> {/* Translated Followers */}
            </div>
            <BadgeCell value={organization._count.followers} variant="secondary" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
