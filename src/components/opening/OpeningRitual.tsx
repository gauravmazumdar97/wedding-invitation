"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { InvitationLoader } from "@/components/opening/InvitationLoader";
import { InvitationEnvelope } from "@/components/opening/InvitationEnvelope";
import { useExperience } from "@/components/providers/ExperienceProvider";
import { usePrefersReducedMotion } from "@/hooks/useMedia";

export function OpeningRitual() {
  const { opened, setOpened } = useExperience();
  const reduced = usePrefersReducedMotion();
  const [stage, setStage] = useState<"loader" | "envelope">("loader");

  useEffect(() => {
    if (typeof history !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("opening-locked", !opened);
    document.documentElement.classList.toggle("is-opening", !opened);
    if (opened) window.scrollTo(0, 0);
    return () => {
      document.body.classList.remove("opening-locked");
      document.documentElement.classList.remove("is-opening");
    };
  }, [opened]);

  useEffect(() => {
    if (opened) return undefined;
    const id = window.setTimeout(() => setStage("envelope"), reduced ? 220 : 1600);
    return () => window.clearTimeout(id);
  }, [opened, reduced]);

  if (opened) return null;

  return (
    <div className="fixed inset-0 z-[75] bg-[var(--color-ivory)]">
      <AnimatePresence mode="wait">
        {stage === "loader" ? (
          <motion.div
            key="loader"
            className="h-full"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationLoader />
          </motion.div>
        ) : (
          <motion.div
            key="envelope"
            className="h-full bg-[var(--color-ivory)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <InvitationEnvelope onOpened={() => setOpened(true)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
