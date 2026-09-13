import { promises as fs } from "fs";
import { blessingsFile } from "./paths";

export interface Blessing {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

async function ensureFile(): Promise<void> {
  try {
    await fs.access(blessingsFile);
  } catch {
    await fs.writeFile(blessingsFile, "[]\n", "utf8");
  }
}

async function readBlessings(): Promise<Blessing[]> {
  await ensureFile();
  const raw = await fs.readFile(blessingsFile, "utf8");
  return JSON.parse(raw) as Blessing[];
}

async function writeBlessings(blessings: Blessing[]): Promise<void> {
  await fs.writeFile(blessingsFile, `${JSON.stringify(blessings, null, 2)}\n`, "utf8");
}

export async function listBlessings(): Promise<Blessing[]> {
  const blessings = await readBlessings();
  return blessings.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function saveBlessing(input: { name: string; message: string }): Promise<Blessing> {
  const name = input.name.trim();
  const message = input.message.trim();
  if (!name) {
    throw new Error("Please add your name.");
  }
  if (!message) {
    throw new Error("Please write a blessing.");
  }
  if (message.length > 500) {
    throw new Error("Please keep the blessing under 500 characters.");
  }

  const blessing: Blessing = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    name,
    message,
    createdAt: new Date().toISOString(),
  };
  const blessings = await readBlessings();
  blessings.push(blessing);
  await writeBlessings(blessings);
  return blessing;
}
