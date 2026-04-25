import { MongoClient, type Collection, type Document } from "mongodb";
import { z } from "zod";

import { toEventCmsContent, hydrateEventCmsContent, type EventCmsContent } from "@/data/events/cms";
import { eventCmsContentSchema } from "@/data/events/schema";
import { getEventData } from "@/data/events";
import type { EventPageData } from "@/data/events/types";

const eventSectionKeys = [
  "themeName",
  "themeColors",
  "hero",
  "overview",
  "importance",
  "impact",
  "privileges",
  "donationHighlights",
  "gallery",
  "seva",
  "contributors",
  "donationForm",
] as const;

type EventSectionKey = (typeof eventSectionKeys)[number];

type EventSectionDocument = {
  slug: string;
  section: EventSectionKey;
  value: EventCmsContent[EventSectionKey];
  updatedAt: Date;
};

const sectionSchemas = {
  themeName: eventCmsContentSchema.shape.themeName,
  themeColors: eventCmsContentSchema.shape.themeColors,
  hero: eventCmsContentSchema.shape.hero,
  overview: eventCmsContentSchema.shape.overview,
  importance: eventCmsContentSchema.shape.importance,
  impact: eventCmsContentSchema.shape.impact,
  privileges: eventCmsContentSchema.shape.privileges,
  donationHighlights: eventCmsContentSchema.shape.donationHighlights,
  gallery: eventCmsContentSchema.shape.gallery,
  seva: eventCmsContentSchema.shape.seva,
  contributors: eventCmsContentSchema.shape.contributors,
  donationForm: eventCmsContentSchema.shape.donationForm,
} satisfies Record<EventSectionKey, z.ZodType>;

const mongoUri = process.env.MONGODB_URI;
const mongoDbName = process.env.MONGODB_DB_NAME ?? "event";
const eventSectionsCollectionName = process.env.MONGODB_EVENT_SECTIONS_COLLECTION ?? "event_sections";

let clientPromise: Promise<MongoClient> | null = null;

function getMongoClient() {
  if (!mongoUri) {
    return null;
  }

  if (!clientPromise) {
    clientPromise = new MongoClient(mongoUri, {
      serverSelectionTimeoutMS: 8000,
    })
      .connect()
      .catch((error) => {
        clientPromise = null;
        throw error;
      });
  }

  return clientPromise;
}

async function getEventSectionsCollection(): Promise<Collection<EventSectionDocument> | null> {
  const client = await getMongoClient();

  if (!client) {
    return null;
  }

  const collection = client
    .db(mongoDbName)
    .collection<EventSectionDocument>(eventSectionsCollectionName);

  await collection.createIndex({ slug: 1, section: 1 }, { unique: true });

  return collection;
}

function isEventSectionKey(section: string): section is EventSectionKey {
  return eventSectionKeys.includes(section as EventSectionKey);
}

function parseSectionDocument(document: Document): EventSectionDocument | null {
  if (
    typeof document.slug !== "string" ||
    typeof document.section !== "string" ||
    !isEventSectionKey(document.section)
  ) {
    return null;
  }

  try {
    return {
      slug: document.slug,
      section: document.section,
      value: sectionSchemas[document.section].parse(document.value) as EventCmsContent[EventSectionKey],
      updatedAt: document.updatedAt instanceof Date ? document.updatedAt : new Date(document.updatedAt),
    };
  } catch {
    return null;
  }
}

function mergeSectionDocuments(slug: string, sections: EventSectionDocument[]) {
  const staticContent = getStaticCmsContent(slug);
  const merged = {
    ...(staticContent ?? { slug }),
    slug,
  } as Partial<EventCmsContent> & Pick<EventCmsContent, "slug">;

  for (const section of sections) {
    merged[section.section] = section.value as never;
  }

  return eventCmsContentSchema.parse(merged);
}

export function getStaticCmsContent(slug: string): EventCmsContent | null {
  const event = getEventData(slug);

  return event ? toEventCmsContent(event) : null;
}

export async function getCmsEventContent(slug: string): Promise<{
  content: EventCmsContent | null;
  source: "database" | "static";
}> {
  const staticContent = getStaticCmsContent(slug);
  const collection = await getEventSectionsCollection().catch(() => null);

  if (!collection) {
    return {
      content: staticContent,
      source: "static",
    };
  }

  const documents = await collection
    .find({ slug, section: { $in: [...eventSectionKeys] } })
    .project({ _id: 0 })
    .toArray()
    .catch(() => []);

  const sections = documents.map(parseSectionDocument).filter((section): section is EventSectionDocument => Boolean(section));

  if (sections.length > 0) {
    return {
      content: mergeSectionDocuments(slug, sections),
      source: "database",
    };
  }

  return {
    content: staticContent,
    source: "static",
  };
}

export async function getCmsEventSection<K extends EventSectionKey>(
  slug: string,
  section: K,
): Promise<EventCmsContent[K] | null> {
  const staticContent = getStaticCmsContent(slug);
  const collection = await getEventSectionsCollection().catch(() => null);

  if (!collection) {
    return staticContent?.[section] ?? null;
  }

  const document = await collection
    .findOne(
      { slug, section },
      { projection: { _id: 0 } },
    )
    .catch(() => null);

  if (!document) {
    return staticContent?.[section] ?? null;
  }

  return sectionSchemas[section].parse(document.value) as EventCmsContent[K];
}

export async function getPublishedEventData(slug: string): Promise<EventPageData | null> {
  const { content } = await getCmsEventContent(slug);

  return content ? hydrateEventCmsContent(content) : null;
}

export async function saveCmsEventContent(slug: string, content: unknown) {
  const parsed = eventCmsContentSchema.parse({ ...(content as object), slug });
  const collection = await getEventSectionsCollection();

  if (!collection) {
    throw new Error("MONGODB_URI is required to save CMS content.");
  }

  const now = new Date();

  await collection.bulkWrite(
    eventSectionKeys.map((section) => {
      const value = parsed[section];

      if (typeof value === "undefined") {
        return {
          deleteOne: {
            filter: { slug: parsed.slug, section },
          },
        };
      }

      return {
        updateOne: {
          filter: { slug: parsed.slug, section },
          update: {
            $set: {
              slug: parsed.slug,
              section,
              value,
              updatedAt: now,
            },
          },
          upsert: true,
        },
      };
    }),
  );

  return parsed;
}
