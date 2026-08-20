import Link from "next/link";
import { cn } from "../lib/cn";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "gold" | "ghost";
  className?: string;
  type?: "button" | "submit";
  target?: string;
  rel?: string;
  ariaLabel?: string;
};

export default function Button({
  children,
  href,
  onClick,
  variant = "gold",
  className,
  type = "button",
  target,
  rel,
  ariaLabel,
}: Props) {
  const classes = cn(
    "group/btn relative inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-3.5 text-[13px] font-bold tracking-[0.16em] uppercase cursor-pointer select-none",
    variant === "gold"
      ? "button-gold hover:button-gold-hover"
      : "button-ghost hover:button-ghost-hover",
    className
  );

  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {variant === "gold" && (
        <span
          aria-hidden="true"
          className="relative z-10 text-ocean-950 transition-transform duration-300 group-hover/btn:translate-x-1"
        >
          &rarr;
        </span>
      )}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
        className={classes}
      >
        {inner}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {inner}
    </button>
  );
}
