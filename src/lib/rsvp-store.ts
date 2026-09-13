import { promises as fs } from "fs";
import type { RsvpRecord } from "@/types/guest";
import { rsvpsFile } from "./paths";

type RsvpMap = Record<string, RsvpRecord>;

async function ensureFile(): Promise<void> {
  try {
    await fs.access(rsvpsFile);
  } catch {
    await fs.writeFile(rsvpsFile, "{}\n", "utf8");
  }
}

async function readRsvps(): Promise<RsvpMap> {
  await ensureFile();
  const raw = await fs.readFile(rsvpsFile, "utf8");
  return JSON.parse(raw) as RsvpMap;
}

async function writeRsvps(rsvps: RsvpMap): Promise<void> {
  await fs.writeFile(rsvpsFile, `${JSON.stringify(rsvps, null, 2)}\n`, "utf8");
}

export async function getRsvp(guestId: string): Promise<RsvpRecord | null> {
  const rsvps = await readRsvps();
  return rsvps[guestId] ?? null;
}

export async function listRsvps(): Promise<RsvpRecord[]> {
  const rsvps = await readRsvps();
  return Object.values(rsvps);
}

export async function saveRsvp(record: RsvpRecord): Promise<RsvpRecord> {
  const rsvps = await readRsvps();
  rsvps[record.guestId] = record;
  await writeRsvps(rsvps);
  return record;
}

export function emptyRsvp(guestId: string): RsvpRecord {
  return {
    guestId,
    status: "pending",
    attendingCount: 0,
    attendingEvents: [],
    dietary: "",
    dietaryNote: "",
    message: "",
    travelHelp: false,
    travelNote: "",
    updatedAt: new Date().toISOString(),
  };
}
