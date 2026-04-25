import type { EventPageData } from "@/data/events/types";
import type { CoreThemeColors } from "@/lib/themes";
import { themes } from "@/lib/themes";

export type EventCmsContent = Omit<EventPageData, "theme"> & {
  themeName?: keyof typeof themes;
  themeColors?: CoreThemeColors;
};

export function toEventCmsContent(event: EventPageData): EventCmsContent {
  return {
    ...event,
    themeName: event.theme.name,
    themeColors: event.theme.colors,
  };
}

export function hydrateEventCmsContent(content: EventCmsContent): EventPageData {
  const themeName = content.themeName ?? "akshaya-tritiya";
  const baseTheme = themes[themeName] ?? themes["akshaya-tritiya"];

  return {
    ...content,
    theme: {
      ...baseTheme,
      colors: content.themeColors ?? baseTheme.colors,
    },
  };
}
