"use client";

import { Header } from "@/components/shared/header";
import { Button } from "@/components/ui/button";
import { routes } from "@/config/routes";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function NotFound() {
  const t = useTranslations("notFound");

  const importantPages = [
    {
      title: t("pages.home.title"),
      path: routes.home,
      description: t("pages.home.description"),
    },
    {
      title: t("pages.search.title"),
      path: routes.search,
      description: t("pages.search.description"),
    },
    {
      title: t("pages.contact.title"),
      path: routes.contact,
      description: t("pages.contact.description"),
    },
  ];

  return (
    <>
      <Header />
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4 sm:p-6 lg:p-8">
        <div className="mx-auto w-full max-w-4xl space-y-4 text-center sm:space-y-6">
          <h1 className="text-6xl font-bold text-primary sm:text-7xl lg:text-9xl">{t("title")}</h1>
          <div className="space-y-2 sm:space-y-4">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">{t("subtitle")}</h2>
            <p className="mb-4 text-sm text-muted-foreground sm:mb-8 sm:text-base">{t("description")}</p>
            <div className="grid grid-cols-1 gap-3 text-left sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
              {importantPages.map((page) => (
                <Link href={page.path} key={page.path}>
                  <div className="h-full rounded-lg border p-3 transition-colors hover:border-primary sm:p-4">
                    <h3 className="text-sm font-semibold text-foreground sm:text-base">{page.title}</h3>
                    <p className="text-xs text-muted-foreground sm:text-sm">{page.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
          <div className="pt-6 sm:pt-8">
            <Link href={routes.home}>
              <Button variant="default" size="lg" className="text-sm sm:text-base">
                {t("returnHome")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
