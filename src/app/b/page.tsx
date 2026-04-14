import Link from "next/link";
import {
  MOCK_SPACES, MOCK_ITEMS, TOTAL_VALUE, TOTAL_ITEMS, LENT_ITEMS,
  fmt, itemInitials,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";
import { TrendingUp, AlertCircle } from "lucide-react";

// ── B «Портфель» ──
// Главная философия: вещи — это активы. Управляй имуществом как инвестиционным
// портфелем. Цифры главные, фото вторичны. Всё в деньгах.

const B = {
  bg: "#0F0E0D", surface: "#1A1917", surface2: "#201F1C",
  border: "#2E2C29", text: "#F5F0E8", textMid: "#9C978F",
  textDim: "#625E58", accent: "#E8A04B",
};

// Цвета категорий для графика аллокации
const CAT_COLORS: Record<string, string> = {
  "Техника":  "#E8A04B",
  "Одежда":   "#C4956A",
  "Спорт":    "#6A9C8A",
  "Кухня":    "#8A7EAA",
  "Обувь":    "#AA8A7E",
  "Другое":   "#625E58",
};

export default function DashboardB() {
  // Аллокация по категориям
  const catMap = new Map<string, { count: number; value: number }>();
  for (const item of MOCK_ITEMS) {
    if (!catMap.has(item.category)) catMap.set(item.category, { count: 0, value: 0 });
    catMap.get(item.category)!.count++;
    catMap.get(item.category)!.value += item.price;
  }
  const categories = Array.from(catMap.entries())
    .map(([name, data]) => ({ name, ...data, pct: Math.round((data.value / TOTAL_VALUE) * 100) }))
    .sort((a, b) => b.value - a.value);

  // Топ активы по стоимости
  const topAssets = [...MOCK_ITEMS]
    .sort((a, b) => b.price - a.price)
    .slice(0, 8);

  // Портфели (пространства) по стоимости
  const portfolios = [...MOCK_SPACES]
    .map((s) => ({ ...s, value: s.items.reduce((sum, i) => sum + i.price, 0) }))
    .sort((a, b) => b.value - a.value);

  // Формат в тысячах/миллионах
  const fmtShort = (v: number) =>
    v >= 1_000_000
      ? `${(v / 1_000_000).toFixed(1)}M`
      : v >= 1000
      ? `${(v / 1000).toFixed(0)}K`
      : String(v);

  return (
    <div style={{ background: B.bg, minHeight: "100vh", paddingBottom: 100 }}>

      {/* ── PORTFOLIO HEADER ── */}
      <div style={{ padding: "24px 20px 0" }}>
        <p style={{ fontSize: 11, color: B.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
          Портфель имущества
        </p>

        {/* Главная цифра — огромная */}
        <div style={{ marginBottom: 8 }}>
          <p style={{ fontSize: 52, fontWeight: 800, color: B.text, letterSpacing: -3, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}>
            {fmt(TOTAL_VALUE)}
          </p>
        </div>

        {/* Подстрока */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <TrendingUp size={14} strokeWidth={1.5} style={{ color: "#6A9C8A" }} />
          <p style={{ fontSize: 13, color: B.textMid }}>
            {TOTAL_ITEMS} активов · {MOCK_SPACES.length} портфелей
          </p>
        </div>

        {/* Разделитель */}
        <div style={{ height: 1, background: B.border, marginBottom: 20 }} />
      </div>

      {/* ── АЛЛОКАЦИЯ ── */}
      <div style={{ padding: "0 20px 24px" }}>
        <p style={{ fontSize: 11, color: B.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>
          Аллокация
        </p>

        {/* Stacked bar */}
        <div style={{
          height: 8, borderRadius: 4, overflow: "hidden",
          display: "flex", marginBottom: 14,
        }}>
          {categories.map((cat) => (
            <div
              key={cat.name}
              style={{ width: `${cat.pct}%`, background: CAT_COLORS[cat.name] || B.textDim }}
            />
          ))}
        </div>

        {/* Легенда */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {categories.map((cat) => (
            <div key={cat.name} style={{
              background: B.surface, border: `1px solid ${B.border}`,
              borderRadius: 12, padding: "12px 14px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: CAT_COLORS[cat.name] || B.textDim, flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: B.textMid }}>{cat.name}</p>
              </div>
              <p style={{ fontSize: 16, fontWeight: 700, color: B.text, letterSpacing: -0.5, marginBottom: 1 }}>
                {cat.pct}%
              </p>
              <p style={{ fontSize: 11, color: B.textDim }}>{fmt(cat.value)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── ДЕСКТОП: 2 колонки ── */}
      <div className="md:grid md:gap-0 md:px-6" style={{ gridTemplateColumns: "1fr 300px" } as React.CSSProperties}>

        {/* ЛЕВАЯ — топ активы */}
        <div className="md:pr-6 md:border-r" style={{ borderColor: B.border } as React.CSSProperties}>

          {/* Если есть одолженные — алерт */}
          {LENT_ITEMS.length > 0 && (
            <div style={{
              margin: "0 20px 16px", padding: "12px 16px",
              background: "rgba(232,160,75,0.08)", border: "1px solid rgba(232,160,75,0.2)",
              borderRadius: 12, display: "flex", gap: 10, alignItems: "flex-start",
            }}>
              <AlertCircle size={15} strokeWidth={1.5} style={{ color: B.accent, marginTop: 1, flexShrink: 0 }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: B.accent, marginBottom: 2 }}>
                  {LENT_ITEMS.length} актива вне портфеля
                </p>
                <p style={{ fontSize: 12, color: B.textMid }}>
                  {LENT_ITEMS.map((i) => `${i.name.split(" ").slice(0, 2).join(" ")} → ${i.lent_to}`).join(" · ")}
                </p>
              </div>
            </div>
          )}

          <div className="px-5 md:px-0">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ fontSize: 11, color: B.textDim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Топ активы
              </p>
              <Link href="/b/search" style={{ fontSize: 12, color: B.accent, textDecoration: "none" }}>
                все →
              </Link>
            </div>

            {topAssets.map((item, i) => {
              const pct = Math.round((item.price / TOTAL_VALUE) * 100);
              return (
                <Link key={item.id} href={`/b/item/${item.id}`} style={{ textDecoration: "none" }}>
                  <div style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "13px 0",
                    borderBottom: i < topAssets.length - 1 ? `1px solid ${B.border}` : "none",
                  }}>
                    {/* Rank */}
                    <span style={{ fontSize: 11, color: B.textDim, width: 18, flexShrink: 0, textAlign: "center", fontVariantNumeric: "tabular-nums" }}>
                      {i + 1}
                    </span>

                    {/* Инициалы-бейдж */}
                    <div style={{
                      width: 36, height: 36, borderRadius: 8,
                      background: B.surface2, border: `1px solid ${B.border}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: B.textDim }}>
                        {itemInitials(item.name)}
                      </span>
                    </div>

                    {/* Имя + место */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontSize: 14, color: B.text, fontWeight: 500,
                        overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                        marginBottom: 2,
                      }}>
                        {item.name}
                      </p>
                      <p style={{ fontSize: 11, color: B.textDim }}>{item.space_name} · {item.category}</p>
                    </div>

                    {/* Цена + доля */}
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ fontSize: 14, fontWeight: 700, color: B.accent, marginBottom: 2, fontVariantNumeric: "tabular-nums" }}>
                        {fmt(item.price)}
                      </p>
                      <p style={{ fontSize: 10, color: B.textDim }}>{pct}% портфеля</p>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* ПРАВАЯ — портфели (пространства) */}
        <div className="md:pl-6 mt-6 md:mt-0">
          <div className="px-5 md:px-0">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <p style={{ fontSize: 11, color: B.textDim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Портфели
              </p>
              <Link href="/b/analytics" style={{ fontSize: 12, color: B.accent, textDecoration: "none" }}>
                аналитика →
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {portfolios.map((space) => {
                const pct = Math.round((space.value / TOTAL_VALUE) * 100);
                return (
                  <Link key={space.id} href={`/b/space/${space.id}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      background: B.surface, border: `1px solid ${B.border}`,
                      borderRadius: 14, padding: "14px 16px",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: B.text }}>{space.name}</p>
                        <p style={{ fontSize: 14, fontWeight: 700, color: B.accent, fontVariantNumeric: "tabular-nums" }}>
                          {fmtShort(space.value)} ₽
                        </p>
                      </div>
                      <div style={{ height: 3, background: B.border, borderRadius: 2, overflow: "hidden", marginBottom: 6 }}>
                        <div style={{
                          height: "100%", width: `${pct}%`,
                          background: `linear-gradient(to right, ${B.accent}, rgba(232,160,75,0.5))`,
                          borderRadius: 2,
                        }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p style={{ fontSize: 11, color: B.textDim }}>{space.items.length} активов</p>
                        <p style={{ fontSize: 11, color: B.textDim }}>{pct}%</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Итог */}
            <div style={{
              marginTop: 16, padding: "14px 16px",
              background: B.surface2, border: `1px solid ${B.border}`,
              borderRadius: 14,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <p style={{ fontSize: 12, color: B.textDim }}>Общий портфель</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: B.text }}>{fmt(TOTAL_VALUE)}</p>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p style={{ fontSize: 12, color: B.textDim }}>Активов</p>
                <p style={{ fontSize: 12, fontWeight: 700, color: B.text }}>{TOTAL_ITEMS}</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* FAB */}
      <StubButton
        label=""
        description="Добавить актив"
        className="md:hidden fixed bottom-[88px] right-5 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: B.accent, color: B.bg }}
        icon={<span style={{ fontSize: 22, fontWeight: 700 }}>+</span>}
      />
    </div>
  );
}
