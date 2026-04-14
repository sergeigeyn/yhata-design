import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import {
  MOCK_SPACES, MOCK_ITEMS, TOTAL_VALUE, TOTAL_ITEMS, LENT_ITEMS,
  OLD_ITEMS, fmt, itemColor, itemInitials,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

const C = {
  bg: "#F8F7F5", surface: "#FFFFFF", surfaceAlt: "#F2F1EF",
  border: "#E5E4E0", text: "#0D0D0D", textMid: "#6B6B68",
  textDim: "#B0AFAB", accent: "#5B5BD6", accentLight: "rgba(91,91,214,0.08)",
};

function ValueBig({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <p style={{ fontSize: 48, fontWeight: 800, color: C.text, letterSpacing: -2.5, lineHeight: 1 }}>
        {value}
      </p>
      <p style={{ fontSize: 11, color: C.textDim, letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 6 }}>
        {label}
      </p>
    </div>
  );
}

export default function DashboardC() {
  const recentItems = [...MOCK_ITEMS]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  const topSpaces = [...MOCK_SPACES]
    .map((s) => ({ ...s, value: s.items.reduce((sum, i) => sum + i.price, 0) }))
    .sort((a, b) => b.value - a.value);

  // Format total value as "X,X млн"
  const totalMillions = (TOTAL_VALUE / 1_000_000).toFixed(1);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingBottom: 80 }}>

      {/* ── HERO ── */}
      <div className="px-6 md:px-8 pt-6 pb-0">
        <p style={{ fontSize: 12, color: C.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 20 }}>
          Апрель 2026 · Сергей
        </p>

        {/* Desktop: stat row / Mobile: stacked */}
        <div className="md:flex md:items-end md:gap-12 md:border-b md:pb-8" style={{ borderColor: C.border }}>
          <div className="mb-6 md:mb-0">
            <p style={{ fontSize: 11, color: C.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>Стоимость</p>
            <p className="text-[52px] md:text-[72px]" style={{ fontWeight: 300, color: C.text, letterSpacing: -3, lineHeight: 1 }}>
              ₽{totalMillions}<span style={{ fontSize: "0.5em", fontWeight: 400, color: C.textMid }}>млн</span>
            </p>
          </div>

          <div className="hidden md:flex gap-10 pb-1">
            <div>
              <p style={{ fontSize: 32, fontWeight: 700, color: C.text, letterSpacing: -1.5, lineHeight: 1 }}>{TOTAL_ITEMS}</p>
              <p style={{ fontSize: 11, color: C.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 6 }}>вещей</p>
            </div>
            <div>
              <p style={{ fontSize: 32, fontWeight: 700, color: C.text, letterSpacing: -1.5, lineHeight: 1 }}>{MOCK_SPACES.length}</p>
              <p style={{ fontSize: 11, color: C.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 6 }}>пространств</p>
            </div>
            {LENT_ITEMS.length > 0 && (
              <div>
                <p style={{ fontSize: 32, fontWeight: 700, color: C.accent, letterSpacing: -1.5, lineHeight: 1 }}>{LENT_ITEMS.length}</p>
                <p style={{ fontSize: 11, color: C.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 6 }}>одолжено</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile: small stats row */}
        <div className="md:hidden flex gap-8 py-5" style={{ borderBottom: `1px solid ${C.border}` }}>
          <div>
            <p style={{ fontSize: 24, fontWeight: 700, color: C.text, letterSpacing: -1, lineHeight: 1 }}>{TOTAL_ITEMS}</p>
            <p style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 4 }}>вещей</p>
          </div>
          <div>
            <p style={{ fontSize: 24, fontWeight: 700, color: C.text, letterSpacing: -1, lineHeight: 1 }}>{MOCK_SPACES.length}</p>
            <p style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 4 }}>пространств</p>
          </div>
          {LENT_ITEMS.length > 0 && (
            <div>
              <p style={{ fontSize: 24, fontWeight: 700, color: C.accent, letterSpacing: -1, lineHeight: 1 }}>{LENT_ITEMS.length}</p>
              <p style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 4 }}>одолжено</p>
            </div>
          )}
        </div>
      </div>

      {/* ── DESKTOP: 2-col grid ── */}
      <div className="md:grid md:gap-0 md:px-8 md:pt-8" style={{ gridTemplateColumns: "1fr 280px" } as React.CSSProperties}>

        {/* LEFT */}
        <div className="md:pr-8" style={{ borderRight: `1px solid ${C.border}` } as React.CSSProperties}>

          {/* Last added */}
          <div className="mt-6 md:mt-0">
            <div className="px-6 md:px-0 flex justify-between items-center mb-4">
              <p style={{ fontSize: 11, color: C.textDim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Последнее
              </p>
              <Link href="/c/search" style={{ display: "flex", alignItems: "center", gap: 4, color: C.accent, fontSize: 12, textDecoration: "none" }}>
                все <ArrowUpRight size={13} />
              </Link>
            </div>

            {/* Mobile: horizontal scroll */}
            <div className="md:hidden flex gap-3 px-6 overflow-x-auto pb-3 no-scrollbar">
              {recentItems.map((item) => (
                <Link key={item.id} href={`/c/item/${item.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
                  <div style={{ width: 120 }}>
                    <div style={{
                      width: 120, height: 120, borderRadius: 12,
                      background: itemColor(item.category),
                      display: "flex", alignItems: "center", justifyContent: "center",
                      marginBottom: 8,
                    }}>
                      <span style={{ fontSize: 28, fontWeight: 700, color: "#7A6E68" }}>{itemInitials(item.name)}</span>
                    </div>
                    <p style={{ fontSize: 12, color: C.text, fontWeight: 500, lineHeight: 1.3, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: 12, color: C.accent, marginTop: 3, fontWeight: 600 }}>{fmt(item.price)}</p>
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop: list view */}
            <div className="hidden md:block">
              {recentItems.map((item, i) => (
                <Link key={item.id} href={`/c/item/${item.id}`} style={{ textDecoration: "none" }}>
                  <div
                    style={{
                      display: "flex", alignItems: "center", gap: 14,
                      padding: "14px 0",
                      borderBottom: i < recentItems.length - 1 ? `1px solid ${C.border}` : "none",
                    }}
                    className="group"
                  >
                    <div style={{
                      width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                      background: itemColor(item.category),
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: "#7A6E68" }}>{itemInitials(item.name)}</span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: 14, color: C.text, fontWeight: 500, marginBottom: 2 }}>{item.name}</p>
                      <p style={{ fontSize: 12, color: C.textDim }}>{item.space_name} · {item.category}</p>
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: C.accent, flexShrink: 0 }}>{fmt(item.price)}</p>
                    <ArrowUpRight size={14} style={{ color: C.textDim, flexShrink: 0 }} />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Alert: lent items */}
          {LENT_ITEMS.length > 0 && (
            <div className="mx-6 md:mx-0 mt-6">
              <div style={{ background: C.accentLight, border: `1px solid rgba(91,91,214,0.15)`, borderRadius: 12, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.accent }}>{LENT_ITEMS.length} вещи одолжено</p>
                  <p style={{ fontSize: 12, color: C.textMid, marginTop: 2 }}>
                    {LENT_ITEMS.map(i => i.lent_to).join(", ")}
                  </p>
                </div>
                <Link href="/c/search" style={{ fontSize: 12, color: C.accent, textDecoration: "none" }}>→</Link>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN — spaces */}
        <div className="md:pl-8 mt-8 md:mt-0">
          <div className="px-6 md:px-0">
            <div className="flex justify-between items-center mb-4">
              <p style={{ fontSize: 11, color: C.textDim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Пространства
              </p>
              <Link href="/c/analytics" style={{ display: "flex", alignItems: "center", gap: 4, color: C.accent, fontSize: 12, textDecoration: "none" }}>
                аналитика <ArrowUpRight size={13} />
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {topSpaces.map((space, i) => (
                <Link key={space.id} href={`/c/space/${space.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "14px 0",
                    borderBottom: `1px solid ${C.border}`,
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ fontSize: 11, color: C.textDim, width: 16, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 500, color: C.text }}>{space.name}</p>
                        <p style={{ fontSize: 11, color: C.textDim, marginTop: 1 }}>{space.items.length} вещей</p>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>{fmt(space.value)}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Insight */}
            <div className="mt-6 hidden md:block">
              <div style={{ padding: "16px", background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12 }}>
                <p style={{ fontSize: 11, color: C.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Инсайт</p>
                <p style={{ fontSize: 13, color: C.text, lineHeight: 1.6 }}>
                  {OLD_ITEMS.length} вещей не использовались более 6 месяцев.{" "}
                  <Link href="/c/analytics" style={{ color: C.accent, textDecoration: "none" }}>Посмотреть →</Link>
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FAB mobile */}
      <StubButton
        label=""
        description="Добавить вещь через камеру"
        className="md:hidden fixed bottom-[88px] right-5 w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg"
        style={{ background: C.accent, color: "white" }}
        icon={<span style={{ fontSize: 22 }}>+</span>}
      />
    </div>
  );
}
