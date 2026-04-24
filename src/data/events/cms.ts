import type { EventPageData, SevaContent, SevaItemContent } from "@/data/events/types";
import { getEventIcon, type EventIconName } from "@/lib/event-icons";
import { themes } from "@/lib/themes";

export type CmsSevaItemContent = Omit<SevaItemContent, "icon"> & {
  iconName: EventIconName;
};

export type CmsSevaContent = Omit<SevaContent, "items"> & {
  items: CmsSevaItemContent[];
};

export type EventCmsContent = Omit<EventPageData, "theme" | "seva"> & {
  themeName?: keyof typeof themes;
  seva: CmsSevaContent;
};

export function toEventCmsContent(event: EventPageData): EventCmsContent {
  return {
    ...event,
    themeName: event.theme.name,
    seva: {
      ...event.seva,
      items: event.seva.items.map(({ icon: _icon, iconName, ...item }) => ({
        ...item,
        iconName: iconName ?? "flower",
      })),
    },
  };
}

export function hydrateEventCmsContent(content: EventCmsContent): EventPageData {
  const themeName = content.themeName ?? "akshaya-tritiya";

  return {
    ...content,
    theme: themes[themeName] ?? themes["akshaya-tritiya"],
    seva: {
      ...content.seva,
      items: content.seva.items.map((item) => ({
        ...item,
        icon: getEventIcon(item.iconName),
      })),
    },
  };
}
