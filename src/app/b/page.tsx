import Link from "next/link";
import { Search } from "lucide-react";
import {
  MOCK_SPACES, MOCK_ITEMS, TOTAL_VALUE, TOTAL_ITEMS, LENT_ITEMS,
  fmt, itemInitials,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

const C = {
  bg: "#0F0E0D", surface: "#1A1917", surface2: "#201F1C",
  border: "#2E2C29", text: "#F5F0E8", textMid: "#9C978F",
  textDim: "#625E58", accent: "#E8A04B",
};

const SPACE_EMOJIS: Record<string, string> = {
  "Гардеробная": "👔", "Кабинет": "💻", "Кладовка": "📦",
  "Кухня": "🍳", "Коробка с техникой": "📷",
};

export default function DashboardB() {
  const recentItems = [...MOCK_ITEMS]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 8);

  const topSpaces = [...MOCK_SPACES]
    .map((s) => ({ ...s, value: s.items.reduce((sum, i) => sum + i.price, 0) }))
    .sort((a, b) => b.value - a.value);
  const maxVal = topSpaces[0]?.value || 1;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingBottom: 80 }}>

      {/* ── HEADER ── */}
      <div style={{ padding: "20px 20px 12px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 12, color: C.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 2 }}>
            Привет, Сергей
          </p>
          <h1 className="md:hidden" style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: -0.8 }}>
            Мои вещи
          </h1>
          <h1 className="hidden md:block" style={{ fontSize: 28, fontWeight: 800, color: C.text, letterSpacing: -0.8 }}>
            Обзор имущества
          </h1>
        </div>
        <Link
          href="/b/search"
          className="md:hidden"
          style={{
            width: 44, height: 44, borderRadius: 22,
            background: C.surface, border: `1px solid ${C.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <Search size={18} strokeWidth={1.8} style={{ color: C.textMid }} />
        </Link>
      </div>

      {/* ── DESKTOP: 2-column grid / MOBILE: single column ── */}
      <div className="md:grid md:gap-6 md:px-6 md:pb-8" style={{ gridTemplateColumns: "1fr 320px" } as React.CSSProperties}>

        {/* LEFT COLUMN */}
        <div>
          {/* HERO STATS */}
          <div className="px-5 md:px-0 pb-5 md:pb-6">
            <div style={{
              background: C.surface, border: `1px solid ${C.border}`,
              borderRadius: 20, padding: "20px",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{ position: "absolute", top: -60, right: -60, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,160,75,0.08) 0%, transparent 70%)" }} />

              <p style={{ fontSize: 11, color: C.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>Имущество</p>

              <div style={{ display: "flex", marginBottom: 16 }}>
                <div style={{ flex: 1, paddingRight: 16 }}>
                  <p style={{ fontSize: 44, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1 }}>{TOTAL_ITEMS}</p>
                  <p style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>вещей</p>
                </div>
                <div style={{ width: 1, background: C.border, margin: "4px 0" }} />
                <div style={{ flex: 2, paddingLeft: 16 }}>
                  <p style={{ fontSize: 26, fontWeight: 800, color: C.accent, letterSpacing: -1, lineHeight: 1 }}>{fmt(TOTAL_VALUE)}</p>
                  <p style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>общая стоимость</p>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8 }}>
                <div style={{ flex: 1, background: "rgba(245,240,232,0.04)", borderRadius: 12, padding: "10px 12px", border: `1px solid ${C.border}` }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{MOCK_SPACES.length}</p>
                  <p style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>пространств</p>
                </div>
                <div style={{ flex: 1, background: LENT_ITEMS.length > 0 ? "rgba(232,160,75,0.1)" : "rgba(245,240,232,0.04)", borderRadius: 12, padding: "10px 12px", border: `1px solid ${LENT_ITEMS.length > 0 ? "rgba(232,160,75,0.2)" : C.border}` }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: LENT_ITEMS.length > 0 ? C.accent : C.text }}>{LENT_ITEMS.length}</p>
                  <p style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>одолжено</p>
                </div>
              </div>
            </div>
          </div>

          {/* ПОСЛЕДНИЕ */}
          <div className="mb-5 md:mb-0">
            <div className="px-5 md:px-0 flex justify-between items-center mb-3">
              <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Последние добавленные</p>
              <Link href="/b/search" style={{ fontSize: 12, color: C.accent, textDecoration: "none" }}>Все →</Link>
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="md:hidden flex gap-3 px-5 overflow-x-auto pb-2 no-scrollbar">
              {recentItems.map((item) => (
                <Link key={item.id} href={`/b/item/${item.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
                  <div style={{ width: 120, height: 120, borderRadius: 16, background: C.surface2, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}>
                    <span style={{ fontSize: 28, fontWeight: 800, color: C.textDim }}>{itemInitials(item.name)}</span>
                  </div>
                  <p style={{ fontSize: 12, fontWeight: 500, color: C.text, width: 120, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 12, color: C.accent, marginTop: 2, fontWeight: 600 }}>{fmt(item.price)}</p>
                </Link>
              ))}
            </div>

            {/* Desktop: 4-column grid */}
            <div className="hidden md:grid grid-cols-4 gap-3">
              {recentItems.map((item) => (
                <Link key={item.id} href={`/b/item/${item.id}`} style={{ textDecoration: "none" }}>
                  <div style={{ background: C.surface, borderRadius: 14, overflow: "hidden", border: `1px solid ${C.border}` }}>
                    <div style={{ height: 130, background: C.surface2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 30, fontWeight: 800, color: C.textDim }}>{itemInitials(item.name)}</span>
                    </div>
                    <div style={{ padding: "10px 12px 12px" }}>
                      <p style={{ fontSize: 12, fontWeight: 500, color: C.text, lineHeight: 1.3, marginBottom: 4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>{fmt(item.price)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — spaces */}
        <div>
          <div className="px-5 md:px-0 pt-5 md:pt-0">
            <div className="flex justify-between items-center mb-4">
              <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Пространства</p>
              <Link href="/b/analytics" style={{ fontSize: 12, color: C.accent, textDecoration: "none" }}>Аналитика →</Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {topSpaces.map((space) => (
                <Link key={space.id} href={`/b/space/${space.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    background: C.surface, border: `1px solid ${C.border}`,
                    borderRadius: 16, padding: "14px 16px",
                    display: "flex", alignItems: "center", gap: 12,
                  }}>
                    <div style={{
                      width: 44, height: 44, borderRadius: 12,
                      background: C.surface2, border: `1px solid ${C.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0, fontSize: 20,
                    }}>
                      {SPACE_EMOJIS[space.name] || "📁"}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 6 }}>{space.name}</p>
                      <div style={{ height: 3, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: 3, borderRadius: 2, background: `linear-gradient(to right, ${C.accent}, rgba(232,160,75,0.4))`, width: `${(space.value / maxVal) * 100}%` }} />
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: C.text }}>{space.items.length}</p>
                      <p style={{ fontSize: 11, color: C.textDim }}>вещей</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop quick actions */}
            <div className="hidden md:block mt-6">
              <div style={{ background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "16px" }}>
                <p style={{ fontSize: 11, color: C.textDim, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 12 }}>Быстрые действия</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <Link href="/b/search" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: C.surface2, borderRadius: 12, textDecoration: "none", border: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 16 }}>🔍</span>
                    <span style={{ fontSize: 13, color: C.text }}>Найти вещь</span>
                  </Link>
                  <StubButton
                    label="Добавить вещь"
                    description="Через камеру — в разработке"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm w-full text-left"
                    style={{ background: C.surface2, border: `1px solid ${C.border}`, color: C.text } as React.CSSProperties}
                    icon={<span style={{ fontSize: 16, marginRight: 2 }}>📸</span>}
                  />
                  <Link href="/b/analytics" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: C.surface2, borderRadius: 12, textDecoration: "none", border: `1px solid ${C.border}` }}>
                    <span style={{ fontSize: 16 }}>📊</span>
                    <span style={{ fontSize: 13, color: C.text }}>Аналитика</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
