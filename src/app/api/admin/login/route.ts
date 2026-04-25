import { NextRequest, NextResponse } from "next/server";

import { attachAdminSessionCookie, verifyAdminCredentials } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { email?: string; password?: string } | null;
  const email = body?.email ?? "";
  const password = body?.password ?? "";

  if (!verifyAdminCredentials(email, password)) {
    return NextResponse.json(
      { message: "Invalid email or password." },
      { status: 401 },
    );
  }

  const response = NextResponse.json({ success: true });
  return attachAdminSessionCookie(response);
}
