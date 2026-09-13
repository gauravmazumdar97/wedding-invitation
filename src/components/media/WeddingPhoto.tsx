import { cn } from "@/lib/cn";
import { CornerAlpana } from "@/components/art/Ornaments";

interface WeddingPhotoProps {
  src: string;
  alt: string;
  className?: string;
  label?: string;
  framed?: boolean;
  priority?: boolean;
  sizes?: string;
}

export function WeddingPhoto({
  src,
  alt,
  className,
  label,
  framed = false,
  priority = false,
  sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 80vw, 1200px",
}: WeddingPhotoProps) {
  const image = (
    <figure className={cn("relative h-full w-full overflow-hidden bg-[var(--color-beige)]", !framed && className)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        sizes={sizes}
        className="h-full w-full object-cover"
      />
      {label ? (
        <figcaption className="pointer-events-none absolute bottom-3 left-3 font-serif text-xs tracking-[0.22em] text-white/80">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );

  if (!framed) return image;

  return (
    <div className={cn("photo-frame relative", className)}>
      <CornerAlpana className="pointer-events-none absolute left-1 top-1 z-10 h-7 w-7 sm:h-8 sm:w-8" />
      <CornerAlpana className="pointer-events-none absolute right-1 top-1 z-10 h-7 w-7 rotate-90 sm:h-8 sm:w-8" />
      <CornerAlpana className="pointer-events-none absolute bottom-1 left-1 z-10 h-7 w-7 -rotate-90 sm:h-8 sm:w-8" />
      <CornerAlpana className="pointer-events-none absolute bottom-1 right-1 z-10 h-7 w-7 rotate-180 sm:h-8 sm:w-8" />
      {image}
    </div>
  );
}
