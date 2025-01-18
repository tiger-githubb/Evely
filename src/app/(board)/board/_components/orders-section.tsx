"use client";

import { motion } from "framer-motion";
import { Package } from "lucide-react";

export function OrdersSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-xl border bg-card p-6 shadow-sm"
    >
      <div className="flex flex-col items-center justify-center gap-4 py-12">
        <Package className="h-12 w-12 text-muted-foreground" />
        <h3 className="text-xl font-semibold">Commandes</h3>
        <p className="text-muted-foreground">Pas de commandes à venir</p>
      </div>
    </motion.div>
  );
}
