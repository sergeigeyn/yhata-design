"use client";
import Link from "next/link";

const CONFIG = {
  a: {
    bg: "#2C2420", color: "#F3EDE7", border: "rgba(196,149,106,0.3)",
    dot: "#C4956A", label: "A — Zara Home",
    next: [{ href: "/b", label: "B" }, { href: "/c", label: "C" }, { href: "/d", label: "D" }],
  },
  b: {
    bg: "#0F0E0D", color: "#9C978F", border: "rgba(232,160,75,0.3)",
    dot: "#E8A04B", label: "B — Premium Dark",
    next: [{ href: "/a", label: "A" }, { href: "/c", label: "C" }, { href: "/d", label: "D" }],
  },
  c: {
    bg: "#0D0D0D", color: "#6B6B68", border: "rgba(91,91,214,0.3)",
    dot: "#5B5BD6", label: "C — Studio",
    next: [{ href: "/a", label: "A" }, { href: "/b", label: "B" }, { href: "/d", label: "D" }],
  },
  d: {
    bg: "#141410", color: "#6B6B65", border: "rgba(27,104,64,0.3)",
    dot: "#1B6840", label: "D — Provenance",
    next: [{ href: "/a", label: "A" }, { href: "/b", label: "B" }, { href: "/c", label: "C" }],
  },
};

export function PreviewBanner({ variant }: { variant: "a" | "b" | "c" | "d" }) {
  const conf = CONFIG[variant];
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 text-xs"
      style={{
        background: conf.bg, color: conf.color,
        borderBottom: `1px solid ${conf.border}`,
      }}
    >
      <span>
        <span style={{ color: conf.dot }}>◉ Preview</span>
        {" "}· Вариант {conf.label} · моковые данные
      </span>
      <div className="flex gap-3">
        {conf.next.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className="underline opacity-60 hover:opacity-100 transition-opacity"
          >
            {label} →
          </Link>
        ))}
      </div>
    </div>
  );
}
