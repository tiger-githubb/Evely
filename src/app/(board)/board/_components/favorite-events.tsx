"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl"; // Import useTranslations for internationalization
import Link from "next/link";
import { PiStarDuotone } from "react-icons/pi";

export function FavoriteEvents() {
  const t = useTranslations("FavoriteEvents"); // Load the translations for this component

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <Link
            href={routes.board.favorites}
            className="flex items-center gap-4 hover:text-primary hover:underline  hover:underline-offset-8 "
          >
            <CardTitle className="text-xl hover:text-primary transition-colors">
              {t("favoriteEventsTitle")} {/* Use translation for title */}
            </CardTitle>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
          <PiStarDuotone className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">{t("noFavoritesText")}</p> {/* Use translation for the message */}
          <Link href={routes.events.list}>
            <Button variant="outline">{t("discoverEventsButton")}</Button> {/* Use translation for button */}
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
