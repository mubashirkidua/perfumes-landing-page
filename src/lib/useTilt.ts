"use client";

import { useCallback, useRef } from "react";

export function useTilt<T extends HTMLElement>(max = 9) {
  const ref = useRef<T | null>(null);

  const onMouseMove = useCallback(
    (e: React.MouseEvent<T>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width - 0.5;
      const py = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `rotateY(${px * max}deg) rotateX(${-py * max}deg) translateZ(0)`;
    },
    [max]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "rotateY(0deg) rotateX(0deg)";
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
