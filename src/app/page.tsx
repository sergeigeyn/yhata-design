import Link from "next/link";

export default function Hub() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-16" style={{ background: "#111110" }}>
      <div className="text-center mb-12">
        <p className="text-xs uppercase mb-4" style={{ color: "#625E58", letterSpacing: "0.2em" }}>Design Preview</p>
        <h1 className="text-4xl font-bold mb-3" style={{ color: "#F5F0E8", letterSpacing: -1 }}>YHATA</h1>
        <p className="text-base max-w-xs mx-auto leading-relaxed" style={{ color: "#9C978F" }}>
          Два варианта редизайна. Выбери и исследуй — данные моковые, всё кликабельно.
        </p>
      </div>

      <div className="w-full max-w-sm space-y-4">
        <Link href="/a" className="group block w-full rounded-2xl overflow-hidden hover:-translate-y-0.5 transition-all duration-300" style={{ border: "1px solid #2E2C29" }}>
          <div className="p-6" style={{ background: "#FAF8F5" }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase mb-1" style={{ color: "#8A7E76", letterSpacing: "0.2em" }}>Вариант A</p>
                <h2 className="text-xl font-semibold" style={{ color: "#2C2420" }}>Zara Home</h2>
              </div>
              <span className="text-2xl group-hover:translate-x-1 transition-transform" style={{ color: "#C4956A" }}>→</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#6B6460" }}>
              Тёплая терракотовая палитра, витринная эстетика, улучшенный дашборд с аналитикой
            </p>
            <div className="flex gap-2">
              {["#FAF8F5","#C4956A","#8B9E7E","#2C2420","#F3EDE7"].map(c => (
                <div key={c} className="w-6 h-6 rounded-full" style={{ background: c, border: "1px solid rgba(0,0,0,0.08)" }} />
              ))}
            </div>
          </div>
        </Link>

        <Link href="/b" className="group block w-full rounded-2xl overflow-hidden hover:-translate-y-0.5 transition-all duration-300" style={{ border: "1px solid #2E2C29" }}>
          <div className="p-6" style={{ background: "#1A1917" }}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-xs uppercase mb-1" style={{ color: "#625E58", letterSpacing: "0.2em" }}>Вариант B</p>
                <h2 className="text-xl font-semibold" style={{ color: "#F5F0E8" }}>Premium Dark</h2>
              </div>
              <span className="text-2xl group-hover:translate-x-1 transition-transform" style={{ color: "#E8A04B" }}>→</span>
            </div>
            <p className="text-sm leading-relaxed mb-4" style={{ color: "#9C978F" }}>
              Тёмный режим, янтарный акцент, современная типографика, крупные числа
            </p>
            <div className="flex gap-2">
              {["#0F0E0D","#1A1917","#E8A04B","#F5F0E8","#2E2C29"].map(c => (
                <div key={c} className="w-6 h-6 rounded-full" style={{ background: c, border: "1px solid rgba(255,255,255,0.08)" }} />
              ))}
            </div>
          </div>
        </Link>
      </div>
      <p className="mt-10 text-xs text-center" style={{ color: "#625E58" }}>
        yhata.store · design preview · 2026
      </p>
    </div>
  );
}
