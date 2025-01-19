"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { PiHeartDuotone } from "react-icons/pi";

export function UserInterests() {
  const t = useTranslations("UserInterests");

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <Link
            href={routes.board.interests}
            className="flex items-center gap-4 hover:text-primary hover:underline  underline-offset-8"
          >
            <CardTitle className="text-xl hover:text-primary transition-colors">{t("interests")}</CardTitle>{" "}
            {/* Translate the title */}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-12 ">
          <PiHeartDuotone className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground max-w-96 text-center">
            {t("description")} {/* Translate the description */}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
