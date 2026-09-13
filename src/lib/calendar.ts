import { wedding } from "@/config/wedding";

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

function toUtcStamp(iso: string): string {
  const date = new Date(iso);
  return [
    date.getUTCFullYear(),
    pad(date.getUTCMonth() + 1),
    pad(date.getUTCDate()),
    "T",
    pad(date.getUTCHours()),
    pad(date.getUTCMinutes()),
    pad(date.getUTCSeconds()),
    "Z",
  ].join("");
}

function addHours(iso: string, hours: number): string {
  return new Date(new Date(iso).getTime() + hours * 60 * 60 * 1000).toISOString();
}

export function buildGoogleCalendarUrl(): string {
  const start = toUtcStamp(wedding.date.iso);
  const end = toUtcStamp(addHours(wedding.date.iso, 4));
  const { first, second } = {
    first: wedding.couple.nameOrder === "bride-first" ? wedding.couple.bride : wedding.couple.groom,
    second: wedding.couple.nameOrder === "bride-first" ? wedding.couple.groom : wedding.couple.bride,
  };
  const text = `${first.fullName} & ${second.fullName} Wedding`;
  const details = `${wedding.hero.kicker}\n${wedding.location.city}`;
  const location = wedding.venues.find((venue) => venue.id === "mandap")?.address ?? wedding.location.city;
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text,
    dates: `${start}/${end}`,
    details,
    location,
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function buildIcs(): string {
  const start = toUtcStamp(wedding.date.iso);
  const end = toUtcStamp(addHours(wedding.date.iso, 4));
  const { first, second } = {
    first: wedding.couple.nameOrder === "bride-first" ? wedding.couple.bride : wedding.couple.groom,
    second: wedding.couple.nameOrder === "bride-first" ? wedding.couple.groom : wedding.couple.bride,
  };
  const title = `${first.fullName} & ${second.fullName} Wedding`;
  const location = wedding.venues.find((venue) => venue.id === "mandap")?.address ?? wedding.location.city;
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Bengali Wedding Invitation//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${title}`,
    `DESCRIPTION:${wedding.hero.kicker}`,
    `LOCATION:${location}`,
    "END:VEVENT",
    "END:VCALENDAR",
    "",
  ].join("\r\n");
}

export function downloadIcs(): void {
  const blob = new Blob([buildIcs()], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "wedding.ics";
  anchor.click();
  URL.revokeObjectURL(url);
}
