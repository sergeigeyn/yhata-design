import Link from "next/link";
import { MOCK_ITEMS, MOCK_SPACES, TOTAL_VALUE, TOTAL_ITEMS, LENT_ITEMS, OLD_ITEMS, fmt } from "@/lib/mock-data";

const D = {
  bg: "#FAFAF7", surface: "#FFFFFF", border: "#E8E5DF",
  text: "#141410", textMid: "#6B6B65", textDim: "#AEAAA4",
  accent: "#1B6840", accentLight: "rgba(27,104,64,0.08)",
};

function conditionBuckets() {
  const now = Date.now();
  let excellent = 0, good = 0, fair = 0;
  for (const item of MOCK_ITEMS) {
    const ageYears = (now - new Date(item.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365);
    if (ageYears < 1) excellent++;
    else if (ageYears < 3) good++;
    else fair++;
  }
  return { excellent, good, fair };
}

const MONTH_RU_SHORT = [
  "янв", "фев", "мар", "апр", "май", "июн",
  "июл", "авг", "сен", "окт", "ноя", "дек",
];

function acquisitionByYear() {
  const map = new Map<number, { count: number; value: number }>();
  for (const item of MOCK_ITEMS) {
    const y = new Date(item.created_at).getFullYear();
    if (!map.has(y)) map.set(y, { count: 0, value: 0 });
    map.get(y)!.count++;
    map.get(y)!.value += item.price;
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => a - b)
    .map(([year, data]) => ({ year, ...data }));
}

export default function AnalyticsPageD() {
  const conds = conditionBuckets();
  const byYear = acquisitionByYear();
  const maxYearCount = Math.max(...byYear.map((y) => y.count));

  const byCategory = Array.from(
    MOCK_ITEMS.reduce((acc, item) => {
      if (!acc.has(item.category)) acc.set(item.category, { count: 0, value: 0 });
      acc.get(item.category)!.count++;
      acc.get(item.category)!.value += item.price;
      return acc;
    }, new Map<string, { count: number; value: number }>())
  )
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.value - a.value);

  const topItems = [...MOCK_ITEMS].sort((a, b) => b.price - a.price).slice(0, 5);

  const spaceValues = MOCK_SPACES.map((s) => ({
    name: s.name,
    value: s.items.reduce((sum, i) => sum + i.price, 0),
    count: s.items.length,
  })).sort((a, b) => b.value - a.value);

  return (
    <main style={{ minHeight: "100vh", background: D.bg, paddingBottom: 96 }}>
      {/* Header */}
      <div style={{ padding: "20px 24px 16px", borderBottom: `1px solid ${D.border}` }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: D.text, letterSpacing: -0.4 }}>
          Аналитика
        </h1>
      </div>

      <div className="md:grid md:grid-cols-2 md:gap-0">

        {/* LEFT COLUMN */}
        <div className="md:border-r" style={{ borderColor: D.border } as React.CSSProperties}>

          {/* Summary stats */}
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${D.border}` }}>
            <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Итого
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {[
                { label: "Стоимость", value: fmt(TOTAL_VALUE) },
                { label: "Вещей", value: String(TOTAL_ITEMS) },
                { label: "Одолжено", value: String(LENT_ITEMS.length) },
                { label: "Пространств", value: String(MOCK_SPACES.length) },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  background: D.surface, border: `1px solid ${D.border}`,
                  borderRadius: 10, padding: "14px 16px",
                }}>
                  <p style={{ fontSize: 18, fontWeight: 700, color: D.text, letterSpacing: -0.5 }}>{value}</p>
                  <p style={{ fontSize: 11, color: D.textDim, marginTop: 3, letterSpacing: "0.1em", textTransform: "uppercase" }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Acquisitions by year */}
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${D.border}` }}>
            <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Пополнения по годам
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {byYear.map(({ year, count, value }) => (
                <div key={year} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 13, color: D.textMid, width: 36, flexShrink: 0 }}>{year}</span>
                  <div style={{ flex: 1, height: 8, background: D.border, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${(count / maxYearCount) * 100}%`,
                      background: D.accent, borderRadius: 4,
                    }} />
                  </div>
                  <span style={{ fontSize: 12, color: D.textDim, width: 18, textAlign: "right", flexShrink: 0 }}>{count}</span>
                  <span style={{ fontSize: 12, color: D.text, width: 80, textAlign: "right", flexShrink: 0, fontWeight: 500 }}>{fmt(value)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Condition breakdown */}
          <div style={{ padding: "20px 24px" }}>
            <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Состояние коллекции
            </p>
            {[
              { label: "Отлично", count: conds.excellent, color: D.accent },
              { label: "Хорошо", count: conds.good, color: "#B07B3A" },
              { label: "Нормально", count: conds.fair, color: D.textMid },
            ].map(({ label, count, color }) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: 4, background: color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, color: D.text, flex: 1 }}>{label}</span>
                <div style={{ width: 100, height: 6, background: D.border, borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", background: color, borderRadius: 3,
                    width: `${(count / TOTAL_ITEMS) * 100}%`,
                  }} />
                </div>
                <span style={{ fontSize: 12, color: D.textDim, width: 24, textAlign: "right" }}>{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div>

          {/* Top 5 items */}
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${D.border}` }}>
            <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              Топ-5 по стоимости
            </p>
            {topItems.map((item, i) => (
              <Link key={item.id} href={`/d/item/${item.id}`} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: 12,
                  padding: "10px 0",
                  borderBottom: i < topItems.length - 1 ? `1px solid ${D.border}` : "none",
                }}>
                  <span style={{ fontSize: 11, color: D.textDim, width: 16, fontVariantNumeric: "tabular-nums" }}>
                    {i + 1}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, color: D.text, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: 11, color: D.textDim }}>{item.space_name}</p>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 600, color: D.accent, flexShrink: 0 }}>{fmt(item.price)}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* By category */}
          <div style={{ padding: "20px 24px", borderBottom: `1px solid ${D.border}` }}>
            <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
              По категориям
            </p>
            {byCategory.map(({ name, count, value }) => {
              const pct = Math.round((value / TOTAL_VALUE) * 100);
              return (
                <div key={name} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontSize: 13, color: D.text }}>{name}</span>
                    <div style={{ textAlign: "right" }}>
                      <span style={{ fontSize: 12, fontWeight: 600, color: D.text }}>{fmt(value)}</span>
                      <span style={{ fontSize: 11, color: D.textDim, marginLeft: 6 }}>{count} шт</span>
                    </div>
                  </div>
                  <div style={{ height: 4, background: D.border, borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pct}%`, background: D.accent, borderRadius: 2 }} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Stale items insight */}
          {OLD_ITEMS.length > 0 && (
            <div style={{ padding: "20px 24px" }}>
              <div style={{
                background: "rgba(176,123,58,0.08)", border: "1px solid rgba(176,123,58,0.2)",
                borderRadius: 12, padding: "16px",
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#8A5C2A", marginBottom: 6 }}>
                  {OLD_ITEMS.length} вещей не обновлялось 6+ месяцев
                </p>
                <p style={{ fontSize: 13, color: D.textMid, lineHeight: 1.5, marginBottom: 12 }}>
                  Стоимость: {fmt(OLD_ITEMS.reduce((s, i) => s + i.price, 0))}. Рассмотрите продажу или дарение.
                </p>
                <Link href="/d/search" style={{ fontSize: 13, color: "#B07B3A", textDecoration: "none", fontWeight: 500 }}>
                  Посмотреть →
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </main>
  );
}
