"use client";

import { useMemo, useState } from "react";
import { eventsForGuest, wedding } from "@/config/wedding";
import { AlpanaIllustration } from "@/components/art/AlpanaIllustration";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useExperience } from "@/components/providers/ExperienceProvider";
import type { DietaryPreference, RsvpStatus } from "@/types/wedding";

export function RSVPExperience() {
  const { guest, existingRsvp, language, rsvpOpen, setRsvpOpen } = useExperience();
  const invited = eventsForGuest(guest.events);
  const [status, setStatus] = useState<RsvpStatus>(existingRsvp?.status ?? "pending");
  const [count, setCount] = useState(existingRsvp?.attendingCount || 1);
  const [events, setEvents] = useState<string[]>(existingRsvp?.attendingEvents ?? guest.events);
  const [dietary, setDietary] = useState<DietaryPreference | "">(existingRsvp?.dietary ?? "");
  const [dietaryNote, setDietaryNote] = useState(existingRsvp?.dietaryNote ?? "");
  const [message, setMessage] = useState(existingRsvp?.message ?? "");
  const [travelHelp, setTravelHelp] = useState(existingRsvp?.travelHelp ?? false);
  const [travelNote, setTravelNote] = useState(existingRsvp?.travelNote ?? "");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [done, setDone] = useState(existingRsvp?.status === "accepted" || existingRsvp?.status === "declined");

  const countOptions = useMemo(
    () => Array.from({ length: guest.allowedGuests }, (_, index) => index + 1),
    [guest.allowedGuests],
  );

  const toggleEvent = (id: string) => {
    setEvents((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]));
  };

  const submit = async () => {
    setError("");
    if (status === "pending") {
      setError("Please accept or decline.");
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
          dietary,
          dietaryNote,
          message,
          travelHelp,
          travelNote,
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
    <section id="rsvp" className="bg-[var(--color-ivory)] px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="font-bn text-xl text-[var(--color-sindoor)]">উত্তর দিন</p>
        <h2 className="mt-3 font-serif text-5xl md:text-7xl">Will you join us?</h2>
        <p className="mt-4 font-serif italic">{guest.guestName} · up to {guest.allowedGuests}</p>
        <MagneticButton
          type="button"
          onClick={() => setRsvpOpen(true)}
          className="mt-8 min-h-12 border border-[var(--color-sindoor)] bg-[var(--color-sindoor)] px-8 font-serif tracking-[0.22em] text-[var(--color-ivory)]"
        >
          {done ? "Edit RSVP" : "RSVP"}
        </MagneticButton>
      </div>

      {rsvpOpen ? (
        <div className="fixed inset-0 z-[75] overflow-y-auto bg-[rgba(42,18,22,0.55)] px-4 py-8">
          <div className="paper-grain silk-texture mx-auto max-w-lg rounded-[2px] p-6 md:p-8">
            <button type="button" className="mb-4 font-serif text-xs tracking-[0.25em]" onClick={() => setRsvpOpen(false)}>
              Close
            </button>

            {done && status !== "pending" ? (
              <div className="grid place-items-center py-8 text-center">
                <AlpanaIllustration className="h-36 w-36" />
                <p className="mt-6 font-bn text-3xl text-[var(--color-sindoor)]">
                  {status === "accepted" ? wedding.rsvp.thanksBn : wedding.rsvp.declineThanksBn}
                </p>
                <p className="mt-3 font-serif text-xl italic">
                  {status === "accepted" ? wedding.rsvp.thanks : wedding.rsvp.declineThanks}
                </p>
                <button type="button" className="mt-8 font-serif text-sm tracking-[0.2em] underline" onClick={() => setDone(false)}>
                  Change response
                </button>
              </div>
            ) : (
              <form
                className="space-y-6"
                onSubmit={(event) => {
                  event.preventDefault();
                  void submit();
                }}
              >
                <fieldset>
                  <legend className="font-serif text-lg">Will you join us?</legend>
                  <div className="mt-3 grid gap-3">
                    <label className="flex min-h-12 items-center gap-3 border border-[var(--color-gold)]/40 px-4">
                      <input type="radio" name="status" checked={status === "accepted"} onChange={() => setStatus("accepted")} />
                      {wedding.rsvp.acceptLabel}
                    </label>
                    <label className="flex min-h-12 items-center gap-3 border border-[var(--color-gold)]/40 px-4">
                      <input type="radio" name="status" checked={status === "declined"} onChange={() => setStatus("declined")} />
                      {wedding.rsvp.declineLabel}
                    </label>
                  </div>
                </fieldset>

                {status === "accepted" ? (
                  <>
                    <label className="block">
                      <span className="font-serif">Number attending</span>
                      <select
                        className="mt-2 min-h-12 w-full border border-[var(--color-gold)]/40 bg-transparent px-3"
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
                      <legend className="font-serif">Events</legend>
                      <div className="mt-3 space-y-2">
                        {invited.map((event) => (
                          <label key={event.id} className="flex min-h-11 items-center gap-3">
                            <input
                              type="checkbox"
                              checked={events.includes(event.id)}
                              onChange={() => toggleEvent(event.id)}
                            />
                            <span>{language === "bn" ? event.nameBn : event.name}</span>
                          </label>
                        ))}
                      </div>
                    </fieldset>

                    <fieldset>
                      <legend className="font-serif">Dietary preference</legend>
                      <div className="mt-3 space-y-2">
                        {(["vegetarian", "non-vegetarian", "other"] as DietaryPreference[]).map((option) => (
                          <label key={option} className="flex min-h-11 items-center gap-3 capitalize">
                            <input type="radio" name="diet" checked={dietary === option} onChange={() => setDietary(option)} />
                            {option.replace("-", " ")}
                          </label>
                        ))}
                      </div>
                      <input
                        className="mt-3 min-h-11 w-full border border-[var(--color-gold)]/40 bg-transparent px-3"
                        placeholder="Notes"
                        value={dietaryNote}
                        onChange={(event) => setDietaryNote(event.target.value)}
                      />
                    </fieldset>

                    <label className="flex min-h-11 items-center gap-3">
                      <input type="checkbox" checked={travelHelp} onChange={(event) => setTravelHelp(event.target.checked)} />
                      Travel or stay help needed
                    </label>
                    {travelHelp ? (
                      <textarea
                        className="min-h-24 w-full border border-[var(--color-gold)]/40 bg-transparent p-3"
                        value={travelNote}
                        onChange={(event) => setTravelNote(event.target.value)}
                      />
                    ) : null}
                  </>
                ) : null}

                <label className="block">
                  <span className="font-serif">A note for the couple</span>
                  <textarea
                    className="mt-2 min-h-28 w-full border border-[var(--color-gold)]/40 bg-transparent p-3"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                  />
                </label>

                {error ? <p className="text-sm text-[var(--color-sindoor)]">{error}</p> : null}

                <button
                  type="submit"
                  disabled={saving}
                  className="min-h-12 w-full bg-[var(--color-sindoor)] font-serif tracking-[0.22em] text-[var(--color-ivory)]"
                >
                  {saving ? "Saving..." : "Submit RSVP"}
                </button>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
