import Link from "next/link";
import { MOCK_ITEMS, fmt, itemColor, itemInitials } from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";
import { Search } from "lucide-react";

const D = {
  bg: "#FAFAF7", surface: "#FFFFFF", border: "#E8E5DF",
  text: "#141410", textMid: "#6B6B65", textDim: "#AEAAA4",
  accent: "#1B6840", accentLight: "rgba(27,104,64,0.08)",
};

const MONTH_RU = [
  "янв", "фев", "мар", "апр", "май", "июн",
  "июл", "авг", "сен", "окт", "ноя", "дек",
];

function condition(dateStr: string): { label: string; color: string } {
  const ageMs = Date.now() - new Date(dateStr).getTime();
  const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365);
  if (ageYears < 1) return { label: "Отлично", color: D.accent };
  if (ageYears < 3) return { label: "Хорошо", color: "#B07B3A" };
  return { label: "Нормально", color: D.textMid };
}

const CATEGORIES = Array.from(new Set(MOCK_ITEMS.map((i) => i.category)));

export default function SearchPageD() {
  const allItems = [...MOCK_ITEMS].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <main style={{ minHeight: "100vh", background: D.bg, paddingBottom: 96 }}>
      {/* Header */}
      <div style={{ padding: "20px 24px 0", borderBottom: `1px solid ${D.border}` }}>
        <h1 style={{ fontSize: 22, fontWeight: 600, color: D.text, letterSpacing: -0.4, marginBottom: 16 }}>
          Поиск
        </h1>

        {/* Search stub */}
        <StubButton
          label=""
          description="Поиск по коллекции — в разработке"
          icon={
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: "12px 16px",
              background: D.surface, border: `1px solid ${D.border}`,
              borderRadius: 10, marginBottom: 16, cursor: "text",
            }}>
              <Search size={16} strokeWidth={1.5} style={{ color: D.textDim, flexShrink: 0 }} />
              <span style={{ fontSize: 14, color: D.textDim }}>Поиск по названию или категории…</span>
            </div>
          }
          className="w-full"
        />

        {/* Category chips */}
        <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 16 }}>
          {CATEGORIES.map((cat) => (
            <StubButton
              key={cat}
              label={cat}
              description={`Фильтр по категории: ${cat}`}
              style={{
                padding: "6px 14px", borderRadius: 20, flexShrink: 0,
                background: D.surface, border: `1px solid ${D.border}`,
                color: D.textMid, fontSize: 13, fontWeight: 400,
                cursor: "pointer",
              }}
            />
          ))}
        </div>
      </div>

      {/* All items list */}
      <div style={{ padding: "0 24px" }}>
        <p style={{
          fontSize: 11, color: D.textDim, letterSpacing: "0.18em",
          textTransform: "uppercase", padding: "16px 0 12px",
        }}>
          Все вещи · {allItems.length}
        </p>

        {allItems.map((item, i) => {
          const cond = condition(item.created_at);
          const d = new Date(item.created_at);
          const acqStr = `${d.getDate()} ${MONTH_RU[d.getMonth()]}. ${d.getFullYear()}`;
          return (
            <Link key={item.id} href={`/d/item/${item.id}`} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "12px 0",
                borderBottom: i < allItems.length - 1 ? `1px solid ${D.border}` : "none",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: itemColor(item.category),
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "rgba(20,20,16,0.3)" }}>
                    {itemInitials(item.name)}
                  </span>
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 14, color: D.text, fontWeight: 500, marginBottom: 2,
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 12, color: D.textDim }}>
                    {item.space_name} · {acqStr}
                    {item.lent_to && (
                      <span style={{ color: "#B07B3A" }}> · у {item.lent_to}</span>
                    )}
                  </p>
                </div>

                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: D.text, marginBottom: 2 }}>
                    {fmt(item.price)}
                  </p>
                  <span style={{ fontSize: 10, color: cond.color, fontWeight: 500 }}>
                    {cond.label}
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
