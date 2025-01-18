"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PiStarDuotone } from "react-icons/pi";

export function FavoriteEvents() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <Link
            href={routes.board.favorites}
            className="flex items-center gap-4 hover:text-primary hover:underline  hover:underline-offset-8 "
          >
            <CardTitle className="text-xl hover:text-primary transition-colors">Événements favoris</CardTitle>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
          <PiStarDuotone className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">Vous n&apos;avez pas encore d&apos;événements favoris</p>
          <Link href={routes.events.list}>
            <Button variant="outline">Découvrir des événements</Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
