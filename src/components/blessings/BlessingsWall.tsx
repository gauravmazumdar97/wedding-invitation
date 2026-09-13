"use client";

import { useEffect, useState } from "react";
import { FestivalHeading } from "@/components/ui/FestivalHeading";
import { DepthStage } from "@/components/motion/DepthStage";

interface Blessing {
  id: string;
  name: string;
  message: string;
}

export function BlessingsWall() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/blessings")
      .then((response) => response.json())
      .then((payload: { blessings?: Blessing[] }) => {
        if (!cancelled) setBlessings(payload.blessings ?? []);
      })
      .catch(() => {
        if (!cancelled) setBlessings([]);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async () => {
    setError("");
    setSaving(true);
    try {
      const response = await fetch("/api/blessings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const payload = (await response.json()) as { blessing?: Blessing; error?: string };
      if (!response.ok || !payload.blessing) {
        throw new Error(payload.error || "Could not save blessing");
      }
      setBlessings((current) => [payload.blessing!, ...current]);
      setName("");
      setMessage("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save blessing");
    } finally {
      setSaving(false);
    }
  };

  return (
    <section className="section-pad">
      <DepthStage>
      <FestivalHeading kicker={`Blessings wall · ${blessings.length} wishes`} title="Aashirvaad Blessings" />
      <p className="festival-card mx-auto mt-5 max-w-xl px-5 py-5 text-center font-serif text-[var(--color-muted)] sm:mt-6 sm:px-8 sm:py-6">
        Offer a prayer, a verse, or a blessing for their new life together.
      </p>

      <form
        className="festival-card mx-auto mt-10 max-w-xl px-6 py-8 sm:px-8"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <label className="block">
          <span className="sr-only">Your name</span>
          <input
            className="field-control w-full border-0 border-b border-[var(--color-navy)]/20 bg-transparent py-3 font-serif text-lg italic outline-none"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <label className="mt-6 block">
          <span className="sr-only">Blessing</span>
          <textarea
            className="field-control min-h-28 w-full resize-none border-0 border-b border-[var(--color-navy)]/20 bg-transparent py-3 font-serif text-lg italic outline-none"
            placeholder="Write a prayer or blessing..."
            maxLength={500}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          />
        </label>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[var(--color-muted)]">{message.length}/500</p>
          <button type="submit" disabled={saving} className="festival-pill app-press w-full px-6 sm:w-auto">
            {saving ? "Sending..." : "Offer blessing"}
          </button>
        </div>
        {error ? <p className="mt-4 text-sm text-[var(--color-coral)]">{error}</p> : null}
      </form>

      {blessings.length ? (
        <ul className="mx-auto mt-10 max-w-xl space-y-4">
          {blessings.map((blessing) => (
            <li key={blessing.id} className="festival-card px-5 py-5 sm:px-6">
              <p className="festival-kicker">{blessing.name}</p>
              <p className="mt-3 font-serif text-lg italic leading-relaxed text-[var(--color-navy)]">
                {`"${blessing.message}"`}
              </p>
            </li>
          ))}
        </ul>
      ) : null}
      </DepthStage>
    </section>
  );
}
