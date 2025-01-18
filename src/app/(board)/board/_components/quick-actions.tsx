"use client";

import { motion } from "framer-motion";
import { CalendarPlus, Store, Users } from "lucide-react";

export function QuickActions() {
  const actions = [
    {
      title: "Créer un événement",
      icon: CalendarPlus,
      href: "/create-event",
    },
    {
      title: "Devenir organisateur",
      icon: Users,
      href: "/become-organizer",
    },
    {
      title: "Devenir vendeur",
      icon: Store,
      href: "/become-seller",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="sticky top-4 rounded-xl border bg-card p-6 shadow-sm"
    >
      <h3 className="mb-4 text-lg font-semibold">Actions rapides</h3>
      <div className="flex flex-col gap-3">
        {actions.map((action) => (
          <a
            key={action.title}
            href={action.href}
            className="flex items-center gap-3 rounded-lg border p-3 transition-colors hover:bg-muted"
          >
            <action.icon className="h-4 w-4 text-primary" />
            <span>{action.title}</span>
          </a>
        ))}
      </div>
    </motion.div>
  );
}
