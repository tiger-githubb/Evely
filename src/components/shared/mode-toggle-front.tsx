"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ModeToggleFront() {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleToggleTheme}
        className="p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? (
          <Sun className="h-6 w-6 text-white" />
        ) : (
          <Moon className="h-6 w-6 text-black" />
        )}
      </button>
    </div>
  );
}
