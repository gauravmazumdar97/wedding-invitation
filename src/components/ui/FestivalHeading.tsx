import type { ReactNode } from "react";

export function FestivalHeading({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mx-auto max-w-2xl text-center">
      <p className="festival-kicker">{kicker}</p>
      <h2 className="festival-title mt-3 text-[clamp(1.85rem,8vw,2.35rem)] leading-[1.12] sm:text-5xl">{title}</h2>
      {children}
    </header>
  );
}
