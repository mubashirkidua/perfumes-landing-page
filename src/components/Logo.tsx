import Link from "next/link";
import { cn } from "../lib/cn";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      aria-hidden="true"
      className={cn("h-10 w-10", className)}
    >
      <defs>
        <linearGradient id="logogold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f0d9a8" />
          <stop offset="0.5" stopColor="#d6b36a" />
          <stop offset="1" stopColor="#a8844a" />
        </linearGradient>
        <linearGradient id="logoblue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#2fa6e0" />
          <stop offset="1" stopColor="#0b3d5c" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="url(#logogold)" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="26" fill="none" stroke="url(#logogold)" strokeWidth="0.6" opacity="0.55" />
      <path
        d="M14 38 Q 21 30 28 38 T 42 38 T 56 38"
        fill="none"
        stroke="url(#logogold)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M14 44 Q 21 36 28 44 T 42 44 T 56 44"
        fill="none"
        stroke="url(#logoblue)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M32 18 c 3.2 3.6 6.4 6.4 6.4 10 a 6.4 6.4 0 1 1 -12.8 0 c 0 -3.6 3.2 -6.4 6.4 -10 Z"
        fill="url(#logogold)"
        opacity="0.95"
      />
      <path
        d="M32 24.4 a 3.6 3.6 0 1 0 0 7.2 a 3.6 3.6 0 0 0 0 -7.2 Z"
        fill="#061a2d"
        opacity="0.35"
      />
      <path d="M16 50 H 48" stroke="url(#logogold)" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export default function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="The Ocean Perfumes — Home"
      className={cn("group flex items-center gap-3", className)}
    >
      <span className="relative transition-transform duration-500 group-hover:rotate-[8deg]">
        <LogoMark className="h-10 w-10 drop-shadow-[0_0_14px_rgba(214,179,106,0.45)]" />
      </span>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span className="font-serif text-[17px] font-semibold tracking-[0.18em] text-pearl uppercase">
            The <span className="text-gold-gradient">Ocean</span>
          </span>
          <span className="mt-1 text-[10px] font-medium tracking-[0.5em] text-mist uppercase">
            Perfumes
          </span>
        </span>
      )}
    </Link>
  );
}
