import { cookies } from "next/headers";

const COOKIE = "invitation_admin";

export function adminPassword(): string {
  return process.env.ADMIN_PASSWORD || "shubho-bibaho";
}

export function adminSessionSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "invitation-admin-session";
}

export async function isAdmin(): Promise<boolean> {
  const jar = await cookies();
  return jar.get(COOKIE)?.value === adminSessionSecret();
}

export async function setAdminCookie(): Promise<void> {
  const jar = await cookies();
  jar.set(COOKIE, adminSessionSecret(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearAdminCookie(): Promise<void> {
  const jar = await cookies();
  jar.delete(COOKIE);
}
