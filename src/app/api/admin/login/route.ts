import { NextResponse } from "next/server";
import { adminPassword, setAdminCookie } from "@/lib/auth";

export async function POST(request: Request) {
  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (!body.password || body.password !== adminPassword()) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }
  await setAdminCookie();
  return NextResponse.json({ ok: true });
}
