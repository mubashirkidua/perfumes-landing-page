"use client";

import Image from "next/image";
import { cn } from "../lib/cn";

export default function CrystalBottle({
  src,
  alt,
  className,
  glowClass = "bg-ocean-400/30",
  size = "medium",
  float = true,
  spin = "fast",
  imageClassName,
}: {
  src: string;
  alt: string;
  className?: string;
  glowClass?: string;
  size?: "small" | "medium" | "large";
  float?: boolean;
  spin?: "fast" | "slow" | "none";
  imageClassName?: string;
}) {
  return (
    <div className={cn("perspective-1200", className)}>
      <div
        className={cn(
          "preserve-3d relative flex items-center justify-center",
          float && "animate-float-slow"
        )}
      >
        <div
          aria-hidden="true"
          className={cn(
            "absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px]",
            glowClass
          )}
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-1/2 h-[110%] w-[110%] -translate-x-1/2 -translate-y-1/2 rounded-[46%] border border-white/10"
        />
        <div
          className={cn(
            "preserve-3d",
            spin === "fast" && "animate-spin-y will-change-transform",
            spin === "slow" && "animate-spin-y-slow will-change-transform"
          )}
        >
          <Image
            src={src}
            alt={alt}
            width={520}
            height={520}
            draggable={false}
            className={cn(
              "relative z-10 select-none rounded-[46%] drop-shadow-2xl",
              size === "small" && "w-40 sm:w-44",
              size === "medium" && "w-52 sm:w-56 lg:w-64",
              size === "large" && "w-64 sm:w-72 lg:w-80",
              imageClassName
            )}
          />
        </div>
      </div>
    </div>
  );
}
