import { notFound } from "next/navigation";

import { EventTemplate } from "@/components/event-template";
import { eventSlugs } from "@/data/events";
import { getPublishedEventData } from "@/lib/events-cms";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return eventSlugs.map((slug) => ({ slug }));
}

export const dynamic = "force-dynamic";

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = await getPublishedEventData(slug);

  if (!event) {
    notFound();
  }

  return <EventTemplate event={event} />;
}
