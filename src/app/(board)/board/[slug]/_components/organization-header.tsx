"use client";

import { CustomButton } from "@/components/ui/custom/custom-button";
import { routes } from "@/config/routes";
import { useTranslations } from "next-intl"; // Import the useTranslations hook
import Link from "next/link";

interface OrganizationHeaderProps {
  organizationSlug: string;
}

export function OrganizationHeader({ organizationSlug }: OrganizationHeaderProps) {
  const t = useTranslations("OrganizationHeader"); // Use the translation hook for this component

  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold">{t("title", { organizationSlug })}</h1> {/* Translate the title */}
        <p className="text-muted-foreground">{t("description")}</p> {/* Translate the description */}
      </div>
      <div className="flex gap-4">
        <Link href={routes.board.workspace.events.add(organizationSlug)}>
          <CustomButton>{t("createEvent")}</CustomButton> {/* Translate the button text */}
        </Link>
        <Link href={routes.board.workspace.events.list(organizationSlug)}>
          <CustomButton>{t("viewAllEvents")}</CustomButton> {/* Translate the button text */}
        </Link>
      </div>
    </div>
  );
}
