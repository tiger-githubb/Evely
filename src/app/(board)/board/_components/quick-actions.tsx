"use client";

import { motion } from "framer-motion";
import { CalendarPlus, Store, Users } from "lucide-react";
import Link from "next/link";

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
    <div className="sticky top-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-lg bg-white dark:bg-gray-800 shadow-sm"
      >
        <div className="p-4 border-b dark:border-gray-700">
          <h3 className="font-medium text-base dark:text-gray-100">Actions rapides</h3>
        </div>
        <div className="p-2">
          {actions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200 dark:text-gray-200"
            >
              <action.icon className="h-4 w-4 text-primary/80" />
              <span className="text-sm">{action.title}</span>
            </Link>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
