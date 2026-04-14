"use client";
import Link from "next/link";

export function PreviewBanner({ variant }: { variant: "a" | "b" }) {
  const isA = variant === "a";
  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-2 text-xs"
      style={{
        background: isA ? "#2C2420" : "#0F0E0D",
        color: isA ? "#F3EDE7" : "#9C978F",
        borderBottom: `1px solid ${isA ? "rgba(196,149,106,0.3)" : "rgba(232,160,75,0.3)"}`,
      }}
    >
      <span>
        <span style={{ color: isA ? "#C4956A" : "#E8A04B" }}>◉ Preview</span>
        {" "}· Вариант {isA ? "A — Zara Home" : "B — Premium Dark"} · моковые данные
      </span>
      <Link
        href={isA ? "/b" : "/a"}
        className="underline opacity-60 hover:opacity-100 transition-opacity"
      >
        Вариант {isA ? "B" : "A"} →
      </Link>
    </div>
  );
}
