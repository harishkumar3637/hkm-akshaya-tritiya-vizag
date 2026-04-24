import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ZodError } from "zod";

import { getCmsEventContent, saveCmsEventContent } from "@/lib/events-cms";

type RouteContext = {
  params: Promise<{
    slug: string;
  }>;
};

function isAuthorized(request: NextRequest) {
  const token = process.env.ADMIN_API_TOKEN;

  if (!token) {
    return true;
  }

  return request.headers.get("authorization") === `Bearer ${token}`;
}

export async function GET(_request: NextRequest, { params }: RouteContext) {
  const { slug } = await params;
  const { content, source } = await getCmsEventContent(slug);

  if (!content) {
    return NextResponse.json({ message: "Event not found." }, { status: 404 });
  }

  return NextResponse.json({ event: content, source });
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ message: "Unauthorized." }, { status: 401 });
  }

  const { slug } = await params;

  try {
    const body = await request.json();
    const saved = await saveCmsEventContent(slug, body.event ?? body);

    revalidatePath("/");
    revalidatePath(`/events/${slug}`);
    revalidatePath("/admin");

    return NextResponse.json({ event: saved, source: "database" });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Event content failed validation.", issues: error.issues },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unable to save event content." },
      { status: 500 },
    );
  }
}
