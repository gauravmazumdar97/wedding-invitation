import { NextResponse } from "next/server";
import { getGuest } from "@/lib/guest-store";
import { getRsvp, saveRsvp } from "@/lib/rsvp-store";
import type { DietaryPreference, RsvpStatus } from "@/types/wedding";

interface RsvpBody {
  guestId?: string;
  status?: RsvpStatus;
  attendingCount?: number;
  attendingEvents?: string[];
  dietary?: DietaryPreference | "";
  dietaryNote?: string;
  message?: string;
  travelHelp?: boolean;
  travelNote?: string;
}

export async function GET(request: Request) {
  const guestId = new URL(request.url).searchParams.get("guestId");
  if (!guestId) {
    return NextResponse.json({ error: "guestId is required" }, { status: 400 });
  }
  const rsvp = await getRsvp(guestId);
  return NextResponse.json({ rsvp });
}

export async function POST(request: Request) {
  let body: RsvpBody;
  try {
    body = (await request.json()) as RsvpBody;
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const guestId = body.guestId?.trim();
  if (!guestId) {
    return NextResponse.json({ error: "guestId is required" }, { status: 400 });
  }

  const guest = await getGuest(guestId);
  if (!guest) {
    return NextResponse.json({ error: "Unknown invitation" }, { status: 404 });
  }

  const status = body.status;
  if (status !== "accepted" && status !== "declined") {
    return NextResponse.json({ error: "Choose accept or decline" }, { status: 400 });
  }

  const attendingCount = status === "accepted" ? Number(body.attendingCount || 0) : 0;
  if (status === "accepted" && (attendingCount < 1 || attendingCount > guest.allowedGuests)) {
    return NextResponse.json(
      { error: `This invitation is for up to ${guest.allowedGuests} guests.` },
      { status: 400 },
    );
  }

  const attendingEvents = status === "accepted" ? (body.attendingEvents ?? []) : [];
  if (attendingEvents.some((id) => !guest.events.includes(id))) {
    return NextResponse.json({ error: "An event is outside this invitation." }, { status: 400 });
  }

  const rsvp = await saveRsvp({
    guestId,
    status,
    attendingCount,
    attendingEvents,
    dietary: body.dietary ?? "",
    dietaryNote: body.dietaryNote ?? "",
    message: body.message ?? "",
    travelHelp: Boolean(body.travelHelp),
    travelNote: body.travelNote ?? "",
    updatedAt: new Date().toISOString(),
  });

  return NextResponse.json({ rsvp });
}
