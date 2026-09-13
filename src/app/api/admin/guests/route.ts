import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { deleteGuest, listGuests, upsertGuest } from "@/lib/guest-store";
import { listRsvps } from "@/lib/rsvp-store";
import type { Guest } from "@/types/guest";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [guests, rsvps] = await Promise.all([listGuests(), listRsvps()]);
  const rsvpByGuest = Object.fromEntries(rsvps.map((rsvp) => [rsvp.guestId, rsvp]));
  return NextResponse.json({
    guests: guests.map((guest) => ({
      ...guest,
      rsvp: rsvpByGuest[guest.guestId] ?? null,
    })),
  });
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const guest = (await request.json()) as Guest;
    const saved = await upsertGuest(guest);
    return NextResponse.json({ guest: saved });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save guest" },
      { status: 400 },
    );
  }
}

export async function DELETE(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const guestId = new URL(request.url).searchParams.get("guestId");
  if (!guestId) {
    return NextResponse.json({ error: "guestId is required" }, { status: 400 });
  }
  try {
    await deleteGuest(guestId);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not delete guest" },
      { status: 400 },
    );
  }
}
