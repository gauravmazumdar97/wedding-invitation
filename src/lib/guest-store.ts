import { promises as fs } from "fs";
import type { Guest, GuestMap } from "@/types/guest";
import { guestsFile } from "./paths";

async function readGuests(): Promise<GuestMap> {
  const raw = await fs.readFile(guestsFile, "utf8");
  return JSON.parse(raw) as GuestMap;
}

async function writeGuests(guests: GuestMap): Promise<void> {
  await fs.writeFile(guestsFile, `${JSON.stringify(guests, null, 2)}\n`, "utf8");
}

export async function listGuests(): Promise<Guest[]> {
  const guests = await readGuests();
  return Object.values(guests);
}

export async function getGuest(guestId: string): Promise<Guest | null> {
  if (!guestId) return null;
  const guests = await readGuests();
  return guests[guestId] ?? null;
}

export async function upsertGuest(guest: Guest): Promise<Guest> {
  if (!guest.guestId.trim()) {
    throw new Error("guestId is required");
  }
  if (!guest.guestName.trim()) {
    throw new Error("guestName is required");
  }
  if (guest.allowedGuests < 1) {
    throw new Error("allowedGuests must be at least 1");
  }

  const guests = await readGuests();
  guests[guest.guestId] = guest;
  await writeGuests(guests);
  return guest;
}

export async function deleteGuest(guestId: string): Promise<void> {
  const guests = await readGuests();
  if (!guests[guestId]) {
    throw new Error("Guest not found");
  }
  delete guests[guestId];
  await writeGuests(guests);
}

export function createDefaultGuest(guestId: string): Guest {
  return {
    guestId,
    guestName: "Dear Guest",
    familyName: "Guest",
    greetingBn: "প্রিয় অতিথি",
    inviteText: "We would be delighted to celebrate with you",
    inviteTextBn: "এসো, আমাদের আনন্দের সঙ্গী হও",
    allowedGuests: 2,
    events: ["wedding", "reception"],
    relationship: "other",
  };
}
