import { NextResponse } from "next/server";
import { listBlessings, saveBlessing } from "@/lib/blessing-store";

export async function GET() {
  const blessings = await listBlessings();
  return NextResponse.json({ blessings });
}

export async function POST(request: Request) {
  let body: { name?: string; message?: string };
  try {
    body = (await request.json()) as { name?: string; message?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  try {
    const blessing = await saveBlessing({
      name: body.name ?? "",
      message: body.message ?? "",
    });
    return NextResponse.json({ blessing });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Could not save blessing" },
      { status: 400 },
    );
  }
}
