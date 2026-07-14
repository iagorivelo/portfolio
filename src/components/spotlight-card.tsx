"use client";

import Link from "next/link";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SpotlightCard({
  href,
  className,
  children,
  tilt = true,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  tilt?: boolean;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
    if (tilt) {
      const rx = (x / r.width - 0.5) * 2;
      const ry = (y / r.height - 0.5) * 2;
      el.style.setProperty("--rx", `${rx * 3}deg`);
      el.style.setProperty("--ry", `${ry * -3}deg`);
    }
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Link
      ref={ref}
      href={href}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      className={cn("spotlight", className)}
    >
      {children}
    </Link>
  );
}
