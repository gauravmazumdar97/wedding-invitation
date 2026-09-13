"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { enabledEvents, wedding } from "@/config/wedding";
import { inviteUrl, whatsappShareText } from "@/lib/invite";
import type { Guest, RsvpRecord } from "@/types/guest";

interface AdminGuest extends Guest {
  rsvp: RsvpRecord | null;
}

const emptyGuest = (): Guest => ({
  guestId: `guest${Date.now().toString().slice(-4)}`,
  guestName: "",
  familyName: "",
  greetingBn: "প্রিয় অতিথি",
  inviteText: "We would be delighted to celebrate with you",
  inviteTextBn: "এসো, আমাদের আনন্দের সঙ্গী হও",
  allowedGuests: 2,
  events: ["wedding", "reception"],
  relationship: "family",
});

export function AdminDashboard({ guests }: { guests: AdminGuest[] }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [eventFilter, setEventFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [draft, setDraft] = useState<Guest>(emptyGuest());
  const [notice, setNotice] = useState("");

  const origin = typeof window !== "undefined" ? window.location.origin : wedding.social.siteUrl;

  const filtered = useMemo(() => {
    return guests.filter((guest) => {
      const haystack = `${guest.guestName} ${guest.familyName} ${guest.guestId}`.toLowerCase();
      if (query && !haystack.includes(query.toLowerCase())) return false;
      if (eventFilter !== "all" && !guest.events.includes(eventFilter)) return false;
      const status = guest.rsvp?.status ?? "pending";
      if (statusFilter !== "all" && status !== statusFilter) return false;
      return true;
    });
  }, [guests, query, eventFilter, statusFilter]);

  const accepted = guests.filter((guest) => guest.rsvp?.status === "accepted");
  const declined = guests.filter((guest) => guest.rsvp?.status === "declined");
  const pending = guests.filter((guest) => !guest.rsvp || guest.rsvp.status === "pending");
  const expected = accepted.reduce((sum, guest) => sum + (guest.rsvp?.attendingCount ?? 0), 0);

  const save = async () => {
    const response = await fetch("/api/admin/guests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(draft),
    });
    if (!response.ok) {
      const payload = (await response.json()) as { error?: string };
      setNotice(payload.error || "Could not save");
      return;
    }
    setNotice("Guest saved");
    router.refresh();
  };

  const copyLink = async (guest: Guest) => {
    await navigator.clipboard.writeText(inviteUrl(guest.guestId, origin));
    setNotice(`Copied link for ${guest.guestName}`);
  };

  const copyWhatsApp = async (guest: Guest) => {
    await navigator.clipboard.writeText(whatsappShareText(guest, origin));
    setNotice(`Copied WhatsApp text for ${guest.guestName}`);
  };

  return (
    <main className="min-h-dvh bg-[var(--color-ivory)] px-5 py-10 text-[var(--color-ink)]">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-serif text-xs tracking-[0.3em] uppercase text-[var(--color-gold)]">Private</p>
            <h1 className="font-serif text-4xl text-[var(--color-sindoor)]">Guest desk</h1>
          </div>
          <div className="flex gap-3">
            <a href="/api/admin/export" className="min-h-11 border border-[var(--color-sindoor)] px-4 py-2 font-serif text-sm">
              Export CSV
            </a>
            <form
              action="/api/admin/logout"
              method="post"
              onSubmit={async (event) => {
                event.preventDefault();
                await fetch("/api/admin/logout", { method: "POST" });
                router.push("/admin/login");
                router.refresh();
              }}
            >
              <button className="min-h-11 px-4 font-serif text-sm">Sign out</button>
            </form>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            ["Invited", guests.length],
            ["Accepted", accepted.length],
            ["Declined", declined.length],
            ["Pending", pending.length],
            ["Expected", expected],
          ].map(([label, value]) => (
            <div key={String(label)} className="border border-[var(--color-gold)]/30 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted)]">{label}</p>
              <p className="mt-2 font-serif text-3xl">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 md:grid-cols-3">
          <input
            className="min-h-11 border border-[var(--color-gold)]/40 bg-transparent px-3"
            placeholder="Search guest"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select className="min-h-11 border border-[var(--color-gold)]/40 bg-transparent px-3" value={eventFilter} onChange={(event) => setEventFilter(event.target.value)}>
            <option value="all">All events</option>
            {enabledEvents().map((event) => (
              <option key={event.id} value={event.id}>{event.name}</option>
            ))}
          </select>
          <select className="min-h-11 border border-[var(--color-gold)]/40 bg-transparent px-3" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
            <option value="all">All RSVP</option>
            <option value="accepted">Accepted</option>
            <option value="declined">Declined</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {notice ? <p className="mt-4 text-sm text-[var(--color-sindoor)]">{notice}</p> : null}

        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[52rem] text-left text-sm">
            <thead className="font-serif text-xs uppercase tracking-[0.16em] text-[var(--color-muted)]">
              <tr>
                <th className="py-3">Guest</th>
                <th>RSVP</th>
                <th>Count</th>
                <th>Events</th>
                <th>Message</th>
                <th>Link</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((guest) => (
                <tr key={guest.guestId} className="border-t border-[var(--color-gold)]/20">
                  <td className="py-3">
                    <button type="button" className="text-left" onClick={() => setDraft(guest)}>
                      <p className="font-serif text-lg">{guest.guestName}</p>
                      <p className="text-xs text-[var(--color-muted)]">{guest.guestId} · {guest.familyName}</p>
                    </button>
                  </td>
                  <td>{guest.rsvp?.status ?? "pending"}</td>
                  <td>{guest.rsvp?.attendingCount ?? "-"}</td>
                  <td className="max-w-[12rem]">{guest.events.join(", ")}</td>
                  <td className="max-w-[14rem]">{guest.rsvp?.message || "-"}</td>
                  <td className="space-x-2">
                    <button type="button" onClick={() => void copyLink(guest)}>Copy</button>
                    <button type="button" onClick={() => void copyWhatsApp(guest)}>WhatsApp</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <section className="mt-12 border border-[var(--color-gold)]/30 p-6">
          <h2 className="font-serif text-2xl">Add or edit guest</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {([
              ["guestId", "Guest ID"],
              ["guestName", "Guest name"],
              ["familyName", "Family name"],
              ["greetingBn", "Bengali greeting"],
              ["inviteText", "Invite text"],
              ["inviteTextBn", "Bengali invite text"],
            ] as const).map(([key, label]) => (
              <label key={key} className="block">
                <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">{label}</span>
                <input
                  className="mt-1 min-h-11 w-full border border-[var(--color-gold)]/40 bg-transparent px-3"
                  value={draft[key]}
                  onChange={(event) => setDraft({ ...draft, [key]: event.target.value })}
                />
              </label>
            ))}
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Allowed guests</span>
              <input
                type="number"
                min={1}
                className="mt-1 min-h-11 w-full border border-[var(--color-gold)]/40 bg-transparent px-3"
                value={draft.allowedGuests}
                onChange={(event) => setDraft({ ...draft, allowedGuests: Number(event.target.value) })}
              />
            </label>
            <label className="block">
              <span className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Relationship</span>
              <select
                className="mt-1 min-h-11 w-full border border-[var(--color-gold)]/40 bg-transparent px-3"
                value={draft.relationship}
                onChange={(event) => setDraft({ ...draft, relationship: event.target.value as Guest["relationship"] })}
              >
                <option value="family">family</option>
                <option value="friend">friend</option>
                <option value="colleague">colleague</option>
                <option value="other">other</option>
              </select>
            </label>
          </div>
          <fieldset className="mt-6">
            <legend className="text-xs uppercase tracking-[0.18em] text-[var(--color-muted)]">Events</legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {enabledEvents().map((event) => (
                <label key={event.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={draft.events.includes(event.id)}
                    onChange={() => {
                      setDraft({
                        ...draft,
                        events: draft.events.includes(event.id)
                          ? draft.events.filter((id) => id !== event.id)
                          : [...draft.events, event.id],
                      });
                    }}
                  />
                  {event.name}
                </label>
              ))}
            </div>
          </fieldset>
          <div className="mt-6 flex flex-wrap gap-3">
            <button type="button" onClick={() => void save()} className="min-h-11 bg-[var(--color-sindoor)] px-5 font-serif text-[var(--color-ivory)]">
              Save guest
            </button>
            <button type="button" onClick={() => setDraft(emptyGuest())} className="min-h-11 border px-5 font-serif">
              New guest
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
