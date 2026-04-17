"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";

type ResponsivePosterProps = {
  src: string;
  alt: string;
  mode?: "contain" | "cover";
  className?: string;
};

export function ResponsivePoster({
  src,
  alt,
  mode = "contain",
  className,
}: ResponsivePosterProps) {
  const isCover = mode === "cover";

  return (
    <div
      className={cn(
        "relative isolate w-full overflow-hidden rounded-[28px] border border-white/12 bg-[#2d0f0b] shadow-[0_24px_60px_rgba(39,10,6,0.26)]",
        "aspect-[4/5] min-h-[20rem] sm:min-h-[24rem] lg:min-h-[32rem]",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,213,138,0.18),transparent_60%)]" />

      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={src}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className={cn(
            "object-cover opacity-40 blur-2xl saturate-[1.05] transition-transform duration-700 ease-out",
            isCover ? "scale-[1.08]" : "scale-110",
          )}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(45,15,11,0.14),rgba(45,15,11,0.52))]" />
      </div>

      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-all duration-700 ease-out",
          isCover ? "p-0" : "p-3 sm:p-4 md:p-6",
        )}
      >
        <div className="relative h-full w-full">
          <Image
            src={src}
            alt={alt}
            fill
            sizes="100vw"
            className={cn(
              "transition-transform duration-700 ease-out",
              isCover ? "object-cover scale-[1.02]" : "object-contain",
            )}
          />
        </div>
      </div>
    </div>
  );
}
