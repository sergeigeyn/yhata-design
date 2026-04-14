import Link from "next/link";
import { MOCK_ITEMS, MOCK_SPACES, TOTAL_VALUE, TOTAL_ITEMS, LENT_ITEMS, fmt, itemColor, itemInitials } from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

const D = {
  bg: "#FAFAF7", surface: "#FFFFFF", border: "#E8E5DF",
  text: "#141410", textMid: "#6B6B65", textDim: "#AEAAA4",
  accent: "#1B6840", accentLight: "rgba(27,104,64,0.08)",
};

const MONTH_RU = [
  "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
  "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь",
];

function condition(dateStr: string): { label: string; color: string } {
  const ageMs = Date.now() - new Date(dateStr).getTime();
  const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365);
  if (ageYears < 1) return { label: "Отлично", color: D.accent };
  if (ageYears < 3) return { label: "Хорошо", color: "#B07B3A" };
  return { label: "Нормально", color: D.textMid };
}

type TimelineGroup = {
  key: string;
  year: number;
  month: number;
  items: typeof MOCK_ITEMS;
};

function buildTimeline(): TimelineGroup[] {
  const map = new Map<string, TimelineGroup>();
  for (const item of MOCK_ITEMS) {
    const d = new Date(item.created_at);
    const year = d.getFullYear();
    const month = d.getMonth();
    const key = `${year}-${String(month).padStart(2, "0")}`;
    if (!map.has(key)) map.set(key, { key, year, month, items: [] });
    map.get(key)!.items.push(item);
  }
  return Array.from(map.values()).sort((a, b) =>
    b.year !== a.year ? b.year - a.year : b.month - a.month
  );
}

export default function DashboardD() {
  const timeline = buildTimeline();
  const recentGroups = timeline.slice(0, 5);
  const topSpaces = [...MOCK_SPACES]
    .map((s) => ({ ...s, value: s.items.reduce((sum, i) => sum + i.price, 0) }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 4);

  return (
    <div style={{ background: D.bg, minHeight: "100vh", paddingBottom: 80 }}>

      {/* ── HERO ── */}
      <div className="px-6 md:px-8 pt-6 pb-0">
        <p style={{ fontSize: 11, color: D.textDim, letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 20 }}>
          Апрель 2026 · Дневник вещей
        </p>

        {/* Desktop stat row / Mobile stacked */}
        <div className="md:flex md:items-end md:gap-12 pb-6" style={{ borderBottom: `1px solid ${D.border}` }}>
          <div className="mb-6 md:mb-0">
            <p style={{ fontSize: 11, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 6 }}>Стоимость коллекции</p>
            <p style={{ fontSize: 42, fontWeight: 300, color: D.text, letterSpacing: -2, lineHeight: 1 }}>
              {fmt(TOTAL_VALUE)}
            </p>
          </div>

          <div className="flex gap-8">
            <div>
              <p style={{ fontSize: 28, fontWeight: 600, color: D.text, letterSpacing: -1.5, lineHeight: 1 }}>{TOTAL_ITEMS}</p>
              <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 5 }}>вещей</p>
            </div>
            <div>
              <p style={{ fontSize: 28, fontWeight: 600, color: D.text, letterSpacing: -1.5, lineHeight: 1 }}>{timeline.length}</p>
              <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 5 }}>месяцев</p>
            </div>
            {LENT_ITEMS.length > 0 && (
              <div>
                <p style={{ fontSize: 28, fontWeight: 600, color: D.accent, letterSpacing: -1.5, lineHeight: 1 }}>{LENT_ITEMS.length}</p>
                <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 5 }}>одолжено</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── DESKTOP: 2-col ── */}
      <div className="md:grid md:gap-0 md:px-8 md:pt-8" style={{ gridTemplateColumns: "1fr 280px" } as React.CSSProperties}>

        {/* LEFT — timeline feed */}
        <div className="md:pr-8" style={{ borderRight: `1px solid ${D.border}` } as React.CSSProperties}>
          <div className="px-6 md:px-0 flex justify-between items-center mb-5 mt-6 md:mt-0">
            <p style={{ fontSize: 11, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Хронология
            </p>
          </div>

          <div className="px-6 md:px-0">
            {recentGroups.map((group) => (
              <div key={group.key} style={{ marginBottom: 28 }}>
                {/* Month header */}
                <div style={{
                  display: "flex", alignItems: "center", gap: 10, marginBottom: 12,
                }}>
                  <div style={{
                    fontSize: 11, fontWeight: 600, color: D.accent,
                    letterSpacing: "0.12em", textTransform: "uppercase",
                  }}>
                    {MONTH_RU[group.month]} {group.year}
                  </div>
                  <div style={{ flex: 1, height: 1, background: D.border }} />
                  <div style={{
                    fontSize: 11, color: D.textDim,
                  }}>
                    {group.items.length} {group.items.length === 1 ? "вещь" : group.items.length < 5 ? "вещи" : "вещей"}
                  </div>
                </div>

                {/* Items in this month */}
                <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  {group.items.map((item) => {
                    const cond = condition(item.created_at);
                    const acqDate = new Date(item.created_at);
                    const acqStr = `${acqDate.getDate()} ${MONTH_RU[acqDate.getMonth()].toLowerCase().slice(0, 3)}.`;
                    return (
                      <Link key={item.id} href={`/d/item/${item.id}`} style={{ textDecoration: "none" }}>
                        <div
                          style={{
                            display: "flex", alignItems: "center", gap: 12,
                            padding: "12px 14px", borderRadius: 10,
                            background: D.surface,
                            border: `1px solid ${D.border}`,
                            marginBottom: 4,
                          }}
                        >
                          {/* Color swatch */}
                          <div style={{
                            width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                            background: itemColor(item.category),
                            display: "flex", alignItems: "center", justifyContent: "center",
                          }}>
                            <span style={{ fontSize: 13, fontWeight: 700, color: "rgba(20,20,16,0.3)" }}>
                              {itemInitials(item.name)}
                            </span>
                          </div>

                          {/* Main info */}
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <p style={{
                              fontSize: 14, color: D.text, fontWeight: 500,
                              marginBottom: 3, lineHeight: 1.3,
                              overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                            }}>
                              {item.name}
                            </p>
                            <p style={{ fontSize: 12, color: D.textDim }}>
                              {acqStr} · {item.space_name}
                              {item.lent_to && (
                                <span style={{ color: "#B07B3A" }}> · у {item.lent_to}</span>
                              )}
                            </p>
                          </div>

                          {/* Right: price + condition */}
                          <div style={{ textAlign: "right", flexShrink: 0 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: D.text, marginBottom: 3 }}>
                              {fmt(item.price)}
                            </p>
                            <span style={{
                              fontSize: 10, color: cond.color, fontWeight: 500,
                              letterSpacing: "0.05em",
                            }}>
                              {cond.label}
                            </span>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* See all link */}
            <Link href="/d/search" style={{
              display: "block", textAlign: "center", padding: "12px 0",
              color: D.accent, fontSize: 13, textDecoration: "none",
              borderTop: `1px solid ${D.border}`, marginTop: 4,
            }}>
              Вся хронология →
            </Link>
          </div>
        </div>

        {/* RIGHT — collections */}
        <div className="md:pl-8 mt-8 md:mt-0">
          <div className="px-6 md:px-0">
            <div className="flex justify-between items-center mb-4">
              <p style={{ fontSize: 11, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Коллекции
              </p>
              <Link href="/d/analytics" style={{ color: D.accent, fontSize: 12, textDecoration: "none" }}>
                аналитика →
              </Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {topSpaces.map((space) => {
                const pct = Math.round((space.value / TOTAL_VALUE) * 100);
                return (
                  <Link key={space.id} href={`/d/space/${space.id}`} style={{ textDecoration: "none" }}>
                    <div style={{
                      background: D.surface, border: `1px solid ${D.border}`,
                      borderRadius: 12, padding: "14px 16px",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                        <p style={{ fontSize: 14, fontWeight: 500, color: D.text }}>{space.name}</p>
                        <p style={{ fontSize: 13, fontWeight: 600, color: D.text }}>{fmt(space.value)}</p>
                      </div>
                      {/* Progress bar */}
                      <div style={{ height: 3, background: D.border, borderRadius: 2, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${pct}%`, background: D.accent, borderRadius: 2 }} />
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 5 }}>
                        <p style={{ fontSize: 11, color: D.textDim }}>{space.items.length} вещей</p>
                        <p style={{ fontSize: 11, color: D.textDim }}>{pct}%</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Lent banner */}
            {LENT_ITEMS.length > 0 && (
              <div style={{
                marginTop: 16, background: "rgba(176,123,58,0.08)",
                border: "1px solid rgba(176,123,58,0.2)",
                borderRadius: 12, padding: "14px 16px",
              }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: "#B07B3A", marginBottom: 4 }}>
                  {LENT_ITEMS.length} вещи одолжено
                </p>
                <p style={{ fontSize: 12, color: D.textMid }}>
                  {LENT_ITEMS.map((i) => `${i.name.split(" ").slice(0,2).join(" ")} → ${i.lent_to}`).join("; ")}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>

      {/* FAB mobile */}
      <StubButton
        label=""
        description="Добавить вещь через камеру"
        className="md:hidden fixed bottom-[88px] right-5 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: D.accent, color: "white" }}
        icon={<span style={{ fontSize: 22 }}>+</span>}
      />
    </div>
  );
}
