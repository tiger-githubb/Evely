"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

export function ModeToggleFront() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const handleToggleTheme = useCallback(() => {
    // Your theme toggle logic here
    setTheme(theme === "light" ? "dark" : "light");
  }, [theme, setTheme]);

  useEffect(() => {
    setMounted(true);

    // Function to handle the theme toggle when 'L' is pressed
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === "l" && document.activeElement === document.body) {
        handleToggleTheme(); // Toggle the theme when 'L' is pressed and root (body) is focused
      }
    };

    // Add the keydown event listener for 'L'
    window.addEventListener("keydown", handleKeydown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  }, [handleToggleTheme]);

  if (!mounted) {
    return (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 animate-pulse" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={handleToggleTheme}
        className="p-2 rounded-full bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 transition"
        aria-label="Toggle theme"
      >
        {theme === "dark" ? <Sun className="h-5 w-5 text-white" /> : <Moon className="h-5 w-5 text-black" />}
      </button>
    </div>
  );
}
