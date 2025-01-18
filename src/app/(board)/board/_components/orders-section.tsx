"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PiTicketDuotone } from "react-icons/pi";

export function OrdersSection() {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <Card>
        <CardHeader>
          <Link href={routes.board.orders} className="flex items-center gap-4 hover:text-primary hover:underline  underline-offset-8">
            <CardTitle className="text-xl hover:text-primary transition-colors">Commandes </CardTitle>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center gap-4 py-12">
          <PiTicketDuotone className="h-12 w-12 text-muted-foreground" />
          <p className="text-muted-foreground">Pas de commandes à venir</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
