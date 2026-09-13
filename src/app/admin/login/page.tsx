"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  return (
    <main className="paper-grain silk-texture flex min-h-dvh items-center justify-center px-6">
      <form
        className="w-full max-w-sm border border-[var(--color-gold)]/40 bg-[var(--color-paper)] p-8"
        onSubmit={async (event) => {
          event.preventDefault();
          setError("");
          const response = await fetch("/api/admin/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
          });
          if (!response.ok) {
            setError("Incorrect password");
            return;
          }
          router.push("/admin");
          router.refresh();
        }}
      >
        <h1 className="font-serif text-3xl text-[var(--color-sindoor)]">Private desk</h1>
        <p className="mt-2 text-sm text-[var(--color-muted)]">RSVP and guest administration</p>
        <label className="mt-8 block">
          <span className="font-serif text-sm">Password</span>
          <input
            type="password"
            className="mt-2 min-h-12 w-full border border-[var(--color-gold)]/40 bg-transparent px-3"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </label>
        {error ? <p className="mt-3 text-sm text-[var(--color-sindoor)]">{error}</p> : null}
        <button type="submit" className="mt-6 min-h-12 w-full bg-[var(--color-sindoor)] font-serif tracking-[0.2em] text-[var(--color-ivory)]">
          Enter
        </button>
      </form>
    </main>
  );
}
