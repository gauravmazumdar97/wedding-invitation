import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { listGuests } from "@/lib/guest-store";
import { listRsvps } from "@/lib/rsvp-store";

function csvCell(value: string | number | boolean): string {
  const text = String(value ?? "");
  if (/[",\n]/.test(text)) return `"${text.replace(/"/g, '""')}"`;
  return text;
}

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [guests, rsvps] = await Promise.all([listGuests(), listRsvps()]);
  const rsvpByGuest = Object.fromEntries(rsvps.map((rsvp) => [rsvp.guestId, rsvp]));
  const header = [
    "guestId",
    "guestName",
    "familyName",
    "allowedGuests",
    "invitedEvents",
    "status",
    "attendingCount",
    "attendingEvents",
    "dietary",
    "message",
    "travelHelp",
    "updatedAt",
  ];
  const rows = guests.map((guest) => {
    const rsvp = rsvpByGuest[guest.guestId];
    return [
      guest.guestId,
      guest.guestName,
      guest.familyName,
      guest.allowedGuests,
      guest.events.join("|"),
      rsvp?.status ?? "pending",
      rsvp?.attendingCount ?? "",
      (rsvp?.attendingEvents ?? []).join("|"),
      rsvp?.dietary ?? "",
      rsvp?.message ?? "",
      rsvp?.travelHelp ?? "",
      rsvp?.updatedAt ?? "",
    ].map(csvCell).join(",");
  });

  return new NextResponse([header.join(","), ...rows].join("\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": "attachment; filename=rsvps.csv",
    },
  });
}
