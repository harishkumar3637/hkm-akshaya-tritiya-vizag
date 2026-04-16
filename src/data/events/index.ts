import type { EventPageData } from "@/data/events/types";
import { akshayaTritiyaEvent } from "@/data/events/akshaya-tritiya";

export const eventDataBySlug: Record<string, EventPageData> = {
  [akshayaTritiyaEvent.slug]: akshayaTritiyaEvent,
};

export const eventSlugs = Object.keys(eventDataBySlug);

export function getEventData(slug: string): EventPageData | undefined {
  return eventDataBySlug[slug];
}
