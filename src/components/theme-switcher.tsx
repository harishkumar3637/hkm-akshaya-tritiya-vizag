"use client";

import { Palette } from "lucide-react";

import { useTheme } from "@/components/theme-provider";
import type { ThemeName } from "@/lib/themes";

export function ThemeSwitcher() {
  const { theme, themes, setTheme, mounted } = useTheme();

  if (!mounted) {
    return (
      <div className="fixed bottom-5 right-5 z-50 h-12 w-44 rounded-full bg-cardBackground/80 shadow-[0_18px_50px_var(--shadowColor)]" />
    );
  }

  return (
    <label className="fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full border border-borderSubtle bg-cardBackground/92 px-4 py-3 text-sm font-semibold text-textHeading shadow-[0_18px_50px_var(--shadowColor)] backdrop-blur">
      <Palette className="h-4 w-4 text-buttonPrimary" aria-hidden="true" />
      <span className="sr-only">Choose theme</span>
      <select
        value={theme}
        onChange={(event) => setTheme(event.target.value as ThemeName)}
        className="cursor-pointer bg-transparent text-sm outline-none"
        aria-label="Choose theme"
      >
        {themes.map((option) => (
          <option key={option.name} value={option.name}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
