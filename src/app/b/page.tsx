"use client";
import Link from "next/link";
import { Search, Home, Grid3x3, BarChart2, ScanLine, Settings } from "lucide-react";
import {
  MOCK_SPACES,
  MOCK_ITEMS,
  TOTAL_VALUE,
  TOTAL_ITEMS,
  LENT_ITEMS,
  fmt,
  itemInitials,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

const C = {
  bg: "#0F0E0D",
  surface: "#1A1917",
  surface2: "#201F1C",
  border: "#2E2C29",
  text: "#F5F0E8",
  textMid: "#9C978F",
  textDim: "#625E58",
  accent: "#E8A04B",
  accentDim: "rgba(232,160,75,0.12)",
};

function ItemThumbB({ item, size = 130 }: { item: typeof MOCK_ITEMS[0]; size?: number }) {
  return (
    <div style={{
      width: size, height: size, borderRadius: 16,
      background: C.surface2, border: `1px solid ${C.border}`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{ fontSize: size * 0.26, fontWeight: 700, color: C.textDim }}>
        {itemInitials(item.name)}
      </span>
    </div>
  );
}

const SPACE_EMOJIS: Record<string, string> = {
  "Гардеробная": "👔", "Кабинет": "💻", "Кладовка": "📦", "Кухня": "🍳", "Коробка с техникой": "📷",
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
      <div style={{ padding: "20px 20px 8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <p style={{ fontSize: 12, color: C.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 2 }}>
            Привет, Сергей
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: C.text, letterSpacing: -0.8, lineHeight: 1 }}>
            Мои вещи
          </h1>
        </div>
        <Link href="/b/search" style={{
          width: 44, height: 44, borderRadius: 22,
          background: C.surface, border: `1px solid ${C.border}`,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <Search size={18} strokeWidth={1.8} style={{ color: C.textMid }} />
        </Link>
      </div>

      {/* ── HERO STATS ── */}
      <div style={{ padding: "12px 20px 0" }}>
        <div style={{
          background: C.surface, border: `1px solid ${C.border}`,
          borderRadius: 20, padding: "20px", position: "relative", overflow: "hidden",
        }}>
          {/* Accent glow */}
          <div style={{
            position: "absolute", top: -60, right: -60,
            width: 160, height: 160, borderRadius: "50%",
            background: "radial-gradient(circle, rgba(232,160,75,0.08) 0%, transparent 70%)",
          }} />

          <p style={{ fontSize: 11, color: C.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
            Имущество
          </p>

          <div style={{ display: "flex", gap: 0, marginBottom: 16 }}>
            <div style={{ flex: 1, paddingRight: 16 }}>
              <p style={{ fontSize: 40, fontWeight: 800, color: C.text, letterSpacing: -2, lineHeight: 1 }}>
                {TOTAL_ITEMS}
              </p>
              <p style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>вещей</p>
            </div>
            <div style={{ width: 1, background: C.border, margin: "4px 0" }} />
            <div style={{ flex: 2, paddingLeft: 16 }}>
              <p style={{ fontSize: 26, fontWeight: 800, color: C.accent, letterSpacing: -1, lineHeight: 1 }}>
                {fmt(TOTAL_VALUE)}
              </p>
              <p style={{ fontSize: 12, color: C.textDim, marginTop: 4 }}>общая стоимость</p>
            </div>
          </div>

          {/* Sub stats */}
          <div style={{ display: "flex", gap: 8 }}>
            <div style={{ flex: 1, background: "rgba(245,240,232,0.04)", borderRadius: 12, padding: "10px 12px", border: `1px solid ${C.border}` }}>
              <p style={{ fontSize: 20, fontWeight: 700, color: C.text, letterSpacing: -0.5 }}>{MOCK_SPACES.length}</p>
              <p style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>пространств</p>
            </div>
            <div style={{ flex: 1, background: LENT_ITEMS.length > 0 ? C.accentDim : "rgba(245,240,232,0.04)", borderRadius: 12, padding: "10px 12px", border: `1px solid ${LENT_ITEMS.length > 0 ? "rgba(232,160,75,0.2)" : C.border}` }}>
              <p style={{ fontSize: 20, fontWeight: 700, color: LENT_ITEMS.length > 0 ? C.accent : C.text, letterSpacing: -0.5 }}>{LENT_ITEMS.length}</p>
              <p style={{ fontSize: 11, color: C.textDim, marginTop: 2 }}>одолжено</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── ПОСЛЕДНИЕ ВЕЩИ ── */}
      <div style={{ marginTop: 24 }}>
        <div style={{ padding: "0 20px", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>Последние добавленные</p>
          <Link href="/b/search" style={{ fontSize: 12, color: C.accent, textDecoration: "none" }}>Все →</Link>
        </div>

        <div style={{ display: "flex", gap: 10, paddingLeft: 20, overflowX: "auto", paddingBottom: 4 }} className="no-scrollbar">
          {recentItems.map((item) => (
            <Link key={item.id} href={`/b/item/${item.id}`} style={{ textDecoration: "none", flexShrink: 0 }}>
              <div style={{ width: 120 }}>
                <div style={{
                  width: 120, height: 120, borderRadius: 16,
                  background: C.surface2, border: `1px solid ${C.border}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 8,
                }}>
                  <span style={{ fontSize: 28, fontWeight: 800, color: C.textDim }}>
                    {itemInitials(item.name)}
                  </span>
                </div>
                <p style={{
                  fontSize: 12, fontWeight: 500, color: C.text, lineHeight: 1.3,
                  display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {item.name}
                </p>
                <p style={{ fontSize: 12, color: C.accent, marginTop: 2, fontWeight: 600 }}>
                  {fmt(item.price)}
                </p>
              </div>
            </Link>
          ))}
          <div style={{ width: 20, flexShrink: 0 }} />
        </div>
      </div>

      {/* ── ПО ПРОСТРАНСТВАМ ── */}
      <div style={{ padding: "24px 20px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: C.text }}>По пространствам</p>
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
                  <p style={{ fontSize: 14, fontWeight: 500, color: C.text, marginBottom: 6 }}>
                    {space.name}
                  </p>
                  <div style={{ height: 3, background: C.border, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{
                      height: 3, borderRadius: 2,
                      background: `linear-gradient(to right, ${C.accent}, rgba(232,160,75,0.5))`,
                      width: `${(space.value / maxVal) * 100}%`,
                    }} />
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
      </div>

      {/* ── BOTTOM NAV ── */}
      <div style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: C.surface,
        borderTop: `1px solid ${C.border}`,
        padding: "8px 0 16px",
        display: "flex",
        zIndex: 50,
      }}>
        {[
          { icon: <Home size={22} strokeWidth={1.5} />, label: "Главная", href: "/b", active: true },
          { icon: <Grid3x3 size={22} strokeWidth={1.5} />, label: "Пространства", href: "/b/space/1", active: false },
          { icon: <ScanLine size={22} strokeWidth={1.5} />, label: "Добавить", href: null, active: false, stub: true },
          { icon: <BarChart2 size={22} strokeWidth={1.5} />, label: "Аналитика", href: "/b/analytics", active: false },
          { icon: <Settings size={22} strokeWidth={1.5} />, label: "Профиль", href: null, active: false, stub: true },
        ].map((item) =>
          item.stub ? (
            <StubButton
              key={item.label}
              label=""
              icon={
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                  <span style={{ color: C.textDim }}>{item.icon}</span>
                  <span style={{ fontSize: 10, color: C.textDim }}>{item.label}</span>
                </div>
              }
              description={`${item.label} — в разработке`}
              className="flex-1 flex flex-col items-center"
            />
          ) : (
            <Link
              key={item.label}
              href={item.href!}
              style={{
                flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
                gap: 3, textDecoration: "none",
                color: item.active ? C.accent : C.textDim,
              }}
            >
              {item.icon}
              <span style={{ fontSize: 10, fontWeight: item.active ? 600 : 400 }}>{item.label}</span>
            </Link>
          )
        )}
      </div>
    </div>
  );
}
