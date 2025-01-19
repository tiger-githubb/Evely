"use client";

import { motion } from "framer-motion";
import { CalendarPlus, Store, Users } from "lucide-react";
import { useTranslations } from "next-intl"; // Import the useTranslations hook
import Link from "next/link";

export function QuickActions() {
  const t = useTranslations("QuickActions"); // Load translations for this component

  const actions = [
    {
      title: t("createEvent"), // Use translation for the title
      icon: CalendarPlus,
      href: "/create-event",
    },
    {
      title: t("becomeOrganizer"), // Use translation for the title
      icon: Users,
      href: "/become-organizer",
    },
    {
      title: t("becomeSeller"), // Use translation for the title
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
          <h3 className="font-medium text-base dark:text-gray-100">{t("quickActions")}</h3> {/* Use translation for the header */}
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
