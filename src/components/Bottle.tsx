"use client";

import Image from "next/image";
import { useTilt } from "../lib/useTilt";
import { cn } from "../lib/cn";

export default function Bottle({
  src = "/images/bottle-hero.png",
  alt = "The Ocean Perfumes luxury perfume bottle",
  className,
  float = true,
  tilt = true,
  reflection = true,
  size = "medium",
}: {
  src?: string;
  alt?: string;
  className?: string;
  float?: boolean;
  tilt?: boolean;
  reflection?: boolean;
  size?: "small" | "medium" | "large";
}) {
  const { ref, onMouseMove, onMouseLeave } = useTilt<HTMLDivElement>(tilt ? 10 : 0);

  return (
    <div className={cn("perspective-1200", className)}>
      <div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={cn(
          "relative preserve-3d transition-transform duration-300 ease-out will-change-transform",
          float && "animate-float-slow"
        )}
      >
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 -z-10 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-ocean-500/30 blur-[90px]"
        />
        <Image
          src={src}
          alt={alt}
          width={900}
          height={900}
          priority
          draggable={false}
          className={cn(
            "relative z-10 select-none rounded-[30px] drop-shadow-2xl",
            size === "small" && "w-56 sm:w-64",
            size === "medium" && "w-72 sm:w-80 lg:w-[380px]",
            size === "large" && "w-80 sm:w-96 lg:w-[440px]"
          )}
        />
      </div>

      {reflection && (
        <div
          aria-hidden="true"
          className="relative mx-auto mt-2 h-5 w-1/2 overflow-hidden opacity-60"
        >
          <div
            className="absolute inset-x-0 top-0 h-24 bg-[radial-gradient(ellipse_at_top,rgba(47,166,224,0.45),transparent_70%)] blur-md"
            style={{ transform: "rotate(180deg)" }}
          />
          <div className="absolute inset-x-0 bottom-0 h-4 bg-[radial-gradient(ellipse_at_bottom,rgba(214,179,106,0.5),transparent_70%)] blur-md" />
        </div>
      )}
    </div>
  );
}
