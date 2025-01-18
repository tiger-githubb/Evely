"use client";

import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

export function UserInfo() {
  const { data: session } = useSession();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 p-4"
    >
      <motion.h2 className="text-2xl font-semibold" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        Yala, {session?.user?.name || "Guest"} !
        <motion.span animate={{ rotate: [0, 14, -8, 14, 0] }} transition={{ duration: 0.6, repeat: Infinity, repeatDelay: 2 }}>
          👋
        </motion.span>
      </motion.h2>
    </motion.div>
  );
}
