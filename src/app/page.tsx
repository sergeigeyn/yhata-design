import Link from "next/link";

export default function Hub() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{ background: "#111110" }}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <p
          className="text-xs uppercase tracking-widest mb-3"
          style={{ color: "#625E58", letterSpacing: "0.25em" }}
        >
          Design Preview
        </p>
        <h1
          className="text-5xl font-bold tracking-tight mb-4"
          style={{ color: "#F5F0E8", letterSpacing: "-2px" }}
        >
          YHATA
        </h1>
        <p className="text-sm max-w-xs mx-auto leading-relaxed" style={{ color: "#625E58" }}>
          Два варианта редизайна — выбери и исследуй.<br />
          Данные моковые, всё кликабельно.
        </p>
      </div>

      {/* Divider */}
      <div className="w-px h-8 mb-10" style={{ background: "#2E2C29" }} />

      {/* Cards */}
      <div className="w-full max-w-md flex flex-col gap-4">

        {/* Variant A */}
        <Link
          href="/a"
          className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
          style={{ border: "1px solid rgba(196,149,106,0.2)", background: "#FAF8F5" }}
        >
          <div className="p-6">
            {/* Label */}
            <div className="flex items-center justify-between mb-5">
              <span
                className="text-xs uppercase font-medium tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(196,149,106,0.12)",
                  color: "#C4956A",
                  letterSpacing: "0.2em",
                }}
              >
                Вариант A
              </span>
              <span
                className="text-sm group-hover:translate-x-1 transition-transform duration-200"
                style={{ color: "#C4956A" }}
              >
                Открыть →
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2" style={{ color: "#2C2420" }}>
              Zara Home
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#7A706A" }}>
              Тёплая терракотовая палитра, витринная эстетика,
              улучшенный дашборд с аналитикой
            </p>

            {/* Palette */}
            <div className="flex items-center gap-1.5">
              {[
                { color: "#FAF8F5", label: "фон" },
                { color: "#F3EDE7", label: "поверхность" },
                { color: "#C4956A", label: "акцент" },
                { color: "#8B9E7E", label: "зелень" },
                { color: "#2C2420", label: "текст" },
              ].map(({ color, label }) => (
                <div key={color} className="flex flex-col items-center gap-1">
                  <div
                    className="w-7 h-7 rounded-full"
                    style={{
                      background: color,
                      border: "1.5px solid rgba(0,0,0,0.1)",
                    }}
                    title={label}
                  />
                </div>
              ))}
              <span className="ml-2 text-xs" style={{ color: "#B0A89E" }}>
                Warm & Natural
              </span>
            </div>
          </div>

          {/* Bottom accent strip */}
          <div className="h-1" style={{ background: "linear-gradient(to right, #C4956A, #E8C9A0)" }} />
        </Link>

        {/* Variant B */}
        <Link
          href="/b"
          className="group block rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.01]"
          style={{ border: "1px solid rgba(232,160,75,0.2)", background: "#1A1917" }}
        >
          <div className="p-6">
            {/* Label */}
            <div className="flex items-center justify-between mb-5">
              <span
                className="text-xs uppercase font-medium tracking-widest px-2.5 py-1 rounded-full"
                style={{
                  background: "rgba(232,160,75,0.12)",
                  color: "#E8A04B",
                  letterSpacing: "0.2em",
                }}
              >
                Вариант B
              </span>
              <span
                className="text-sm group-hover:translate-x-1 transition-transform duration-200"
                style={{ color: "#E8A04B" }}
              >
                Открыть →
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold mb-2" style={{ color: "#F5F0E8" }}>
              Premium Dark
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: "#716D66" }}>
              Тёмный режим, янтарный акцент, современная
              типографика с крупными числами
            </p>

            {/* Palette */}
            <div className="flex items-center gap-1.5">
              {[
                { color: "#0F0E0D", label: "фон" },
                { color: "#1A1917", label: "поверхность" },
                { color: "#2E2C29", label: "бордер" },
                { color: "#E8A04B", label: "акцент" },
                { color: "#F5F0E8", label: "текст" },
              ].map(({ color, label }) => (
                <div key={color} className="flex flex-col items-center gap-1">
                  <div
                    className="w-7 h-7 rounded-full"
                    style={{
                      background: color,
                      border: "1.5px solid rgba(255,255,255,0.1)",
                    }}
                    title={label}
                  />
                </div>
              ))}
              <span className="ml-2 text-xs" style={{ color: "#4A4640" }}>
                Dark & Premium
              </span>
            </div>
          </div>

          {/* Bottom accent strip */}
          <div className="h-1" style={{ background: "linear-gradient(to right, #E8A04B, #F5C880)" }} />
        </Link>
      </div>

      {/* Footer */}
      <div className="mt-10 flex flex-col items-center gap-1">
        <p className="text-xs" style={{ color: "#3A3835" }}>
          yhata.store · design preview · 2026
        </p>
      </div>
    </div>
  );
}
