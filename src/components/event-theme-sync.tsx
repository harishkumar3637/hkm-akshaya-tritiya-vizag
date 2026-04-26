"use client";

import { useEffect } from "react";

import type { EventTheme } from "@/data/events/types";
import { createSemanticTokens } from "@/lib/themes";

type EventThemeSyncProps = {
  theme: EventTheme;
};

export function EventThemeSync({ theme }: EventThemeSyncProps) {
  useEffect(() => {
    const root = document.documentElement;

    root.dataset.theme = theme.name;

    Object.entries(createSemanticTokens(theme)).forEach(([name, value]) => {
      root.style.setProperty(name, value);
    });
  }, [theme]);

  return null;
}
