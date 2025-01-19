"use client";

import { BadgeCell } from "@/components/shared/table/badge-cell";
import { DateCell } from "@/components/shared/table/date-cell";
import { OrganizationDetailsSkeleton } from "@/components/shared/ui-skeletons";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { routes } from "@/config/routes";
import { fetchOrganization } from "@/server/services/organizations.service";
import { getImageUrl } from "@/utils/image-utils";
import { useQuery } from "@tanstack/react-query";
import { Building2, Calendar, ExternalLink, Shield, Users, XCircle } from "lucide-react";
import { useTranslations } from "next-intl"; // Import for translations
import Image from "next/image";
import Link from "next/link";

interface OrganizationDetailsDialogProps {
  organizationId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrganizationDetailsDialog({ organizationId, open, onOpenChange }: OrganizationDetailsDialogProps) {
  const t = useTranslations("OrganizationDetailsDialog"); // Fetch translations for the dialog
  const {
    data: organizationResponse,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["organization", organizationId],
    queryFn: () => fetchOrganization(organizationId),
    enabled: open,
  });

  const organization = organizationResponse?.data;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{t("organizationProfile")}</DialogTitle>

          <Link href={routes.board.organization.show(organizationId)} rel="noopener noreferrer">
            <Button variant="link" className="text-muted-foreground m-0 p-0">
              {t("openOrganizationPage")} <ExternalLink className="h-4 w-4" />
            </Button>
          </Link>
        </DialogHeader>

        {isLoading ? (
          <OrganizationDetailsSkeleton />
        ) : error ? (
          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-destructive">
                <XCircle className="h-5 w-5" />
                {t("error")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{t("errorMessage")}</p>
            </CardContent>
          </Card>
        ) : (
          organization && (
            <div className="space-y-8">
              {/* Cover Image Section */}
              <div className="relative h-48 w-full rounded-xl ">
                <Image src={getImageUrl(organization.coverImage)} alt="Cover" fill className="object-cover" priority />
                <div className="absolute -bottom-16 left-8">
                  <div className="h-32 w-32 rounded-full overflow-hidden border-4 border-background">
                    <Image
                      src={getImageUrl(organization.logo)}
                      alt={organization.name}
                      width={128}
                      height={128}
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>

              {/* Organization Info */}
              <div className="pt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="space-y-2 md:col-span-2">
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle>{organization.name}</CardTitle>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        <span className="text-sm">
                          {t("memberSince")} <DateCell date={organization.createdAt} />
                        </span>
                      </div>
                    </CardHeader>
                  </Card>

                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Building2 className="h-5 w-5" />
                        {t("about")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{organization.description}</p>
                    </CardContent>
                  </Card>

                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        {t("roles")}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        {organization.roles.map((role) => (
                          <div key={role.role.id} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                            <span>{role.role.name}</span>
                            {!role.role.editable && <BadgeCell value={t("system")} variant="secondary" />}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column - Stats & Links */}
                <div className="space-y-6">
                  <Card className="border-none shadow-none">
                    <CardHeader>
                      <CardTitle>{t("statistics")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span>{t("members")}</span>
                        </div>
                        <BadgeCell value={organization._count.users} variant="secondary" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-muted-foreground" />
                          <span>{t("followers")}</span>
                        </div>
                        <BadgeCell value={organization._count.followers} variant="secondary" />
                      </div>
                    </CardContent>
                  </Card>

                  {organization.website && (
                    <Card className="border-none shadow-none">
                      <CardHeader>
                        <CardTitle>{t("links")}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <a
                          href={organization.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary hover:underline"
                        >
                          <ExternalLink className="h-4 w-4" />
                          {t("website")}
                        </a>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
