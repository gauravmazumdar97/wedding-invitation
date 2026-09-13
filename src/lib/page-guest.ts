import { createDefaultGuest, getGuest } from "@/lib/guest-store";
import { getRsvp } from "@/lib/rsvp-store";
import type { Guest, RsvpRecord } from "@/types/guest";

export async function resolveInvitation(guestId?: string | null): Promise<{
  guest: Guest;
  rsvp: RsvpRecord | null;
}> {
  if (!guestId) {
    return { guest: createDefaultGuest("guest"), rsvp: null };
  }
  const guest = (await getGuest(guestId)) ?? createDefaultGuest(guestId);
  const rsvp = await getRsvp(guest.guestId);
  return { guest, rsvp };
}
