"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  createSemanticTokens,
  defaultThemeName,
  getTheme,
  themeOptions,
  type ThemeName,
} from "@/lib/themes";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: typeof themeOptions;
  mounted: boolean;
};

const storageKey = "akshaya-theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

const applyTheme = (themeName: ThemeName) => {
  const theme = getTheme(themeName);
  const root = document.documentElement;

  root.dataset.theme = theme.name;

  Object.entries(createSemanticTokens(theme)).forEach(([name, value]) => {
    root.style.setProperty(name, value);
  });
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(defaultThemeName);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(storageKey);
    const initialTheme = getTheme(savedTheme).name;
    const frame = window.requestAnimationFrame(() => {
      setThemeState(initialTheme);
      setMounted(true);
    });

    applyTheme(initialTheme);

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const setTheme = (nextTheme: ThemeName) => {
    const themeName = getTheme(nextTheme).name;

    setThemeState(themeName);
    applyTheme(themeName);
    window.localStorage.setItem(storageKey, themeName);
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      themes: themeOptions,
      mounted,
    }),
    [mounted, theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider");
  }

  return context;
}
