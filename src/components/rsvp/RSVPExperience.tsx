"use client";

import { useMemo, useState } from "react";
import { eventsForGuest, wedding } from "@/config/wedding";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { DepthStage } from "@/components/motion/DepthStage";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { RsvpStatus } from "@/types/wedding";

const choices: Array<{ status: "accepted" | "maybe" | "declined"; label: string }> = [
  { status: "accepted", label: wedding.rsvp.acceptLabel },
  { status: "maybe", label: wedding.rsvp.maybeLabel },
  { status: "declined", label: wedding.rsvp.declineLabel },
];

export function RSVPExperience() {
  const { guest, existingRsvp, language } = useExperience();
  const invited = eventsForGuest(guest.events);
  const [status, setStatus] = useState<RsvpStatus>(existingRsvp?.status ?? "pending");
  const [count, setCount] = useState(existingRsvp?.attendingCount || 1);
  const [events, setEvents] = useState<string[]>(existingRsvp?.attendingEvents ?? guest.events);
  const [message, setMessage] = useState(existingRsvp?.message ?? "");
  const [name, setName] = useState(guest.guestName);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(
    existingRsvp?.status === "accepted" || existingRsvp?.status === "declined" || existingRsvp?.status === "maybe",
  );

  const countOptions = useMemo(
    () => Array.from({ length: guest.allowedGuests }, (_, index) => index + 1),
    [guest.allowedGuests],
  );

  const thanks =
    status === "accepted"
      ? language === "bn"
        ? wedding.rsvp.thanksBn
        : wedding.rsvp.thanks
      : status === "maybe"
        ? language === "bn"
          ? wedding.rsvp.maybeThanksBn
          : wedding.rsvp.maybeThanks
        : language === "bn"
          ? wedding.rsvp.declineThanksBn
          : wedding.rsvp.declineThanks;

  const submit = async () => {
    setError("");
    if (status === "pending") {
      setError("Please choose a response.");
      return;
    }
    if (status === "accepted" && (count < 1 || count > guest.allowedGuests)) {
      setError(`You may bring up to ${guest.allowedGuests} guests.`);
      return;
    }
    if (status === "accepted" && events.length === 0) {
      setError("Please choose at least one event.");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          guestId: guest.guestId,
          status,
          attendingCount: status === "accepted" ? count : 0,
          attendingEvents: status === "accepted" ? events : [],
          dietary: existingRsvp?.dietary ?? "",
          dietaryNote: existingRsvp?.dietaryNote ?? "",
          message,
          travelHelp: existingRsvp?.travelHelp ?? false,
          travelNote: existingRsvp?.travelNote ?? "",
        }),
      });
      if (!response.ok) {
        const payload = (await response.json()) as { error?: string };
        throw new Error(payload.error || "Could not save RSVP");
      }
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save RSVP");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section id="rsvp" className="section-pad pb-[calc(var(--section-y)+0.5rem)]">
      <DepthStage>
      <FestivalHeading kicker="Kindly respond" title="Will you join us?" />

      <form
        className="festival-card mx-auto mt-10 max-w-xl px-5 py-8 sm:px-8 sm:py-10"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        {done && status !== "pending" ? (
          <div className="px-1 py-4 text-center">
            <p className="font-serif text-2xl italic text-[var(--color-navy)]">{thanks}</p>
            <button
              type="button"
              className="app-press mt-8 font-sans text-[0.68rem] uppercase tracking-[0.22em] text-[var(--color-coral)]"
              onClick={() => setDone(false)}
            >
              Change response
            </button>
          </div>
        ) : (
          <>
            <p className="text-center font-serif text-[var(--color-muted)]">{wedding.rsvp.byline}</p>
            <label className="mt-8 block">
              <span className="festival-kicker">Your name</span>
              <input
                className="field-control mt-3 w-full border-0 border-b border-[var(--color-navy)]/20 bg-transparent py-3 font-serif text-xl italic text-[var(--color-navy)] outline-none"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="As you'd like it on the seating card"
              />
            </label>

            <fieldset className="mt-8">
              <legend className="festival-kicker">Will you join us?</legend>
              <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
                {choices.map((choice) => {
                  const selected = status === choice.status;
                  return (
                    <button
                      key={choice.status}
                      type="button"
                      onClick={() => setStatus(choice.status)}
                      className={`app-press min-h-[var(--touch-min)] rounded-full border px-1.5 font-sans text-[0.58rem] uppercase leading-tight tracking-[0.08em] sm:px-2 sm:text-[0.68rem] sm:tracking-[0.18em] ${
                        selected
                          ? "border-[var(--color-navy)] bg-[var(--color-navy)] text-[var(--color-paper)]"
                          : "border-[var(--color-navy)]/25 text-[var(--color-navy)]"
                      }`}
                    >
                      {choice.label}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {status === "accepted" ? (
              <div className="mt-8 space-y-5">
                <label className="block">
                  <span className="festival-kicker">Number attending</span>
                  <select
                    className="field-control mt-3 min-h-[var(--touch-min)] w-full rounded-full border border-[var(--color-navy)]/15 bg-[var(--color-paper)] px-4 font-serif"
                    value={count}
                    onChange={(event) => setCount(Number(event.target.value))}
                  >
                    {countOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <fieldset>
                  <legend className="festival-kicker">Events</legend>
                  <div className="mt-3 space-y-2">
                    {invited.map((event) => (
                      <label key={event.id} className="flex min-h-[var(--touch-min)] items-center gap-3 font-serif">
                        <input
                          type="checkbox"
                          checked={events.includes(event.id)}
                          onChange={() =>
                            setEvents((current) =>
                              current.includes(event.id)
                                ? current.filter((id) => id !== event.id)
                                : [...current, event.id],
                            )
                          }
                        />
                        {language === "bn" ? event.nameBn : event.name}
                      </label>
                    ))}
                  </div>
                </fieldset>
              </div>
            ) : null}

            <label className="mt-8 block">
              <span className="festival-kicker">A note for the couple</span>
              <textarea
                className="field-control mt-3 min-h-28 w-full resize-none border-0 border-b border-[var(--color-navy)]/20 bg-transparent py-3 font-serif text-lg italic outline-none"
                placeholder="Optional - dietary notes, songs, a blessing..."
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
            </label>

            {error ? <p className="mt-4 text-sm text-[var(--color-coral)]">{error}</p> : null}

            <button type="submit" disabled={saving} className="festival-pill app-press mt-8 w-full">
              {saving ? "Sending..." : "Send response"}
            </button>
          </>
        )}
      </form>

      <p className="mt-10 text-center font-sans text-[0.68rem] tracking-[0.2em] text-[var(--color-muted)]">
        {wedding.rsvp.hashtag}
      </p>
      </DepthStage>
    </section>
  );
}
