import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

const cookieName = "arun_dashboard_auth";

async function tokenFor(password: string, secret: string) {
  const bytes = new TextEncoder().encode(`${password}:${secret}`);
  const digest = await crypto.subtle.digest("SHA-256", bytes);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

async function expectedToken() {
  const password = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.DASHBOARD_SESSION_SECRET;
  if (!password || !secret) return null;
  return tokenFor(password, secret);
}

export async function GET(request: NextRequest) {
  const expected = await expectedToken();
  if (!expected) {
    return NextResponse.json({ authorized: false, configured: false });
  }

  return NextResponse.json({
    authorized: request.cookies.get(cookieName)?.value === expected,
    configured: true,
  });
}

export async function POST(request: NextRequest) {
  const password = process.env.DASHBOARD_PASSWORD;
  const secret = process.env.DASHBOARD_SESSION_SECRET;

  if (!password || !secret) {
    return NextResponse.json(
      { ok: false, message: "Dashboard security is not configured yet." },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => ({}));
  if (typeof body?.password !== "string" || body.password !== password) {
    return NextResponse.json({ ok: false, message: "Incorrect password." }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, await tokenFor(password, secret), {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  return response;
}
