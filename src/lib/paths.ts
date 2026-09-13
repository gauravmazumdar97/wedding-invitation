import path from "path";

export const dataDir = path.join(process.cwd(), "data");
export const guestsFile = path.join(dataDir, "guests.json");
export const rsvpsFile = path.join(dataDir, "rsvps.json");
export const blessingsFile = path.join(dataDir, "blessings.json");
