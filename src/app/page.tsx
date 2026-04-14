import Link from "next/link";

const VARIANTS = [
  {
    href: "/a",
    tag: "Вариант A",
    name: "Zara Home",
    desc: "Тёплая терракотовая палитра, витринная эстетика, улучшенный дашборд с аналитикой",
    bg: "#FAF8F5",
    accent: "#C4956A",
    tagBg: "rgba(196,149,106,0.1)",
    border: "rgba(196,149,106,0.2)",
    strip: "linear-gradient(to right, #C4956A, #E8C9A0)",
    palette: ["#FAF8F5", "#F3EDE7", "#C4956A", "#8B9E7E", "#2C2420"],
    pBorder: "rgba(0,0,0,0.08)",
    label: "Warm & Natural",
    labelColor: "#B0A89E",
  },
  {
    href: "/b",
    tag: "Вариант B",
    name: "Premium Dark",
    desc: "Тёмный режим, янтарный акцент, современная типографика с крупными числами",
    bg: "#1A1917",
    accent: "#E8A04B",
    tagBg: "rgba(232,160,75,0.1)",
    border: "rgba(232,160,75,0.2)",
    strip: "linear-gradient(to right, #E8A04B, #F5C880)",
    palette: ["#0F0E0D", "#1A1917", "#2E2C29", "#E8A04B", "#F5F0E8"],
    pBorder: "rgba(255,255,255,0.1)",
    label: "Dark & Premium",
    labelColor: "#4A4640",
  },
  {
    href: "/c",
    tag: "Вариант C",
    name: "Studio",
    desc: "Editorial эстетика, смелая типографика, indigo акцент — конкурентный анализ + Swiss grid",
    bg: "#FFFFFF",
    accent: "#5B5BD6",
    tagBg: "rgba(91,91,214,0.07)",
    border: "rgba(91,91,214,0.18)",
    strip: "linear-gradient(to right, #5B5BD6, #8B8BE8)",
    palette: ["#F8F7F5", "#FFFFFF", "#E5E4E0", "#5B5BD6", "#0D0D0D"],
    pBorder: "rgba(0,0,0,0.07)",
    label: "Editorial · Studio",
    labelColor: "#B0AFAB",
    isNew: true,
  },
];

export default function Hub() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12" style={{ background: "#111110" }}>

      {/* Header */}
      <div className="text-center mb-10">
        <p className="text-xs uppercase tracking-widest mb-3" style={{ color: "#625E58", letterSpacing: "0.25em" }}>
          Design Preview
        </p>
        <h1 className="text-5xl font-bold tracking-tight mb-4" style={{ color: "#F5F0E8", letterSpacing: "-2px" }}>
          YHATA
        </h1>
        <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: "#625E58" }}>
          Три варианта редизайна — выбери и исследуй.<br />
          Данные моковые, всё кликабельно.
        </p>
      </div>

      <div className="w-px h-8 mb-10" style={{ background: "#2E2C29" }} />

      {/* Cards */}
      <div className="w-full max-w-md flex flex-col gap-4">
        {VARIANTS.map((v) => (
          <Link
            key={v.href}
            href={v.href}
            className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
            style={{ border: `1px solid ${v.border}`, background: v.bg }}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs uppercase font-medium tracking-widest px-2.5 py-1 rounded-full"
                    style={{ background: v.tagBg, color: v.accent, letterSpacing: "0.2em" }}
                  >
                    {v.tag}
                  </span>
                  {v.isNew && (
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: v.accent, color: "white", fontSize: 10 }}>
                      NEW
                    </span>
                  )}
                </div>
                <span className="text-sm group-hover:translate-x-1 transition-transform duration-200" style={{ color: v.accent }}>
                  Открыть →
                </span>
              </div>

              <h2 className="text-2xl font-semibold mb-2" style={{ color: v.href === "/b" ? "#F5F0E8" : "#0D0D0D" }}>
                {v.name}
              </h2>
              <p className="text-sm leading-relaxed mb-5" style={{ color: v.href === "/b" ? "#716D66" : "#7A7672" }}>
                {v.desc}
              </p>

              <div className="flex items-center gap-1.5">
                {v.palette.map((color) => (
                  <div key={color} className="w-6 h-6 rounded-full" style={{ background: color, border: `1.5px solid ${v.pBorder}` }} />
                ))}
                <span className="ml-2 text-xs" style={{ color: v.labelColor }}>{v.label}</span>
              </div>
            </div>
            <div className="h-1" style={{ background: v.strip }} />
          </Link>
        ))}
      </div>

      <p className="mt-10 text-xs" style={{ color: "#3A3835" }}>
        yhata.store · design preview · 2026
      </p>
    </div>
  );
}
