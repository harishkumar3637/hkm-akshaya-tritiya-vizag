import { notFound } from "next/navigation";

import { EventTemplate } from "@/components/event-template";
import { eventSlugs, getEventData } from "@/data/events";

type EventPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return eventSlugs.map((slug) => ({ slug }));
}

export default async function EventPage({ params }: EventPageProps) {
  const { slug } = await params;
  const event = getEventData(slug);

  if (!event) {
    notFound();
  }

  return <EventTemplate event={event} />;
}
