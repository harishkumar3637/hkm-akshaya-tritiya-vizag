import { createHash, timingSafeEqual } from "node:crypto";

import { cookies } from "next/headers";
import type { NextRequest, NextResponse } from "next/server";

export const ADMIN_EMAIL = "admin@gmail.com";
export const ADMIN_PASSWORD = "Harekrishna@987";
export const ADMIN_LOGIN_PATH = "/admin/login";
export const ADMIN_SESSION_COOKIE = "admin-session";

function createSessionToken() {
  return createHash("sha256")
    .update(`${ADMIN_EMAIL}:${ADMIN_PASSWORD}:akshaya-tritiya-admin`)
    .digest("hex");
}

function matchesSessionToken(value: string | undefined) {
  if (!value) {
    return false;
  }

  const expected = Buffer.from(createSessionToken());
  const provided = Buffer.from(value);

  if (expected.length !== provided.length) {
    return false;
  }

  return timingSafeEqual(expected, provided);
}

export function verifyAdminCredentials(email: string, password: string) {
  return email.trim().toLowerCase() === ADMIN_EMAIL && password === ADMIN_PASSWORD;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return matchesSessionToken(cookieStore.get(ADMIN_SESSION_COOKIE)?.value);
}

export function isAdminRequestAuthorized(request: NextRequest) {
  const token = process.env.ADMIN_API_TOKEN;
  const bearerAuthorized = token
    ? request.headers.get("authorization") === `Bearer ${token}`
    : false;

  const sessionAuthorized = matchesSessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);

  return bearerAuthorized || sessionAuthorized;
}

export function attachAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: createSessionToken(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return response;
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set({
    name: ADMIN_SESSION_COOKIE,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
