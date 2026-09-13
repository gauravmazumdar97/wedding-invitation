import type { Guest } from "@/types/guest";
import { wedding } from "@/config/wedding";

export function inviteUrl(guestId: string, origin = ""): string {
  const base = origin || wedding.social.siteUrl.replace(/\/$/, "");
  return `${base}/invite/${guestId}`;
}

export function whatsappShareText(guest: Guest, origin = ""): string {
  const url = inviteUrl(guest.guestId, origin);
  return `${guest.inviteTextBn}\n${guest.guestName}\n${url}`;
}

export function coupleDisplay() {
  const brideFirst = wedding.couple.nameOrder === "bride-first";
  const first = brideFirst ? wedding.couple.bride : wedding.couple.groom;
  const second = brideFirst ? wedding.couple.groom : wedding.couple.bride;
  return { first, second };
}
