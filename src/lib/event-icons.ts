import { Flower2, Landmark, Soup, Sparkles, type LucideIcon } from "lucide-react";

export const eventIconNames = ["flower", "soup", "landmark", "sparkles"] as const;

export type EventIconName = (typeof eventIconNames)[number];

export const eventIconMap = {
  flower: Flower2,
  soup: Soup,
  landmark: Landmark,
  sparkles: Sparkles,
} satisfies Record<EventIconName, LucideIcon>;

export function getEventIcon(iconName: string | null | undefined): LucideIcon {
  return eventIconMap[(iconName as EventIconName) || "flower"] ?? eventIconMap.flower;
}
