import { EventTemplate } from "@/components/event-template";
import { getPublishedEventData } from "@/lib/events-cms";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const event = await getPublishedEventData("akshaya-tritiya");

  if (!event) {
    return null;
  }

  return <EventTemplate event={event} />;
}
