"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle({ isTransparentOnDark = false }: { isTransparentOnDark?: boolean }) {
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-5 h-5 flex items-center justify-center p-2">
        <div className="w-5 h-5" />
      </div>
    );
  }

  return (
    <button
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={`group p-2 flex items-center justify-center transition-colors hover:text-[#C5A059] ${
        isTransparentOnDark ? "text-white" : "text-[#141414] dark:text-[#EAEAEA]"
      }`}
      aria-label="Toggle Dark Mode"
    >
      <div className="relative flex items-center justify-center overflow-hidden w-5 h-5 transition-transform duration-500 ease-[0.22,1,0.36,1] group-hover:rotate-12 group-hover:scale-110">
        {resolvedTheme === "dark" ? (
          <Sun className="w-5 h-5" strokeWidth={1.5} />
        ) : (
          <Moon className="w-5 h-5" strokeWidth={1.5} />
        )}
      </div>
    </button>
  );
}
