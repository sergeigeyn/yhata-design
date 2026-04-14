import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MOCK_SPACES, MOCK_ITEMS, fmt, itemColor, itemInitials } from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

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

export default async function SpacePageD({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const space = MOCK_SPACES.find((s) => s.id === id) || MOCK_SPACES[0];
  const items = MOCK_ITEMS.filter((i) => i.space_id === space.id);
  const totalValue = items.reduce((sum, i) => sum + i.price, 0);

  // Sort by date desc
  const sorted = [...items].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return (
    <main style={{ minHeight: "100vh", background: D.bg, paddingBottom: 96 }}>
      {/* HEADER */}
      <header
        style={{
          position: "sticky", top: 36, background: D.bg, zIndex: 10,
          borderBottom: `1px solid ${D.border}`, padding: "16px 24px 16px",
        }}
      >
        <Link
          href="/d"
          style={{
            color: D.textMid, display: "inline-flex", alignItems: "center",
            gap: 6, textDecoration: "none", fontSize: 13, marginBottom: 12,
          }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Дневник
        </Link>

        <div>
          <h1 style={{
            color: D.text, fontSize: 22, fontWeight: 600,
            letterSpacing: -0.4, lineHeight: 1.15, marginBottom: 4,
          }}>
            {space.name}
          </h1>
          <p style={{ color: D.textMid, fontSize: 13 }}>
            {items.length} {items.length === 1 ? "вещь" : items.length < 5 ? "вещи" : "вещей"}{" "}
            · <span style={{ color: D.accent }}>{fmt(totalValue)}</span>
          </p>
        </div>
      </header>

      {/* LIST */}
      <div style={{ padding: "16px 24px" }}>
        {sorted.map((item, i) => {
          const cond = condition(item.created_at);
          const d = new Date(item.created_at);
          const acqStr = `${d.getDate()} ${MONTH_RU[d.getMonth()]}. ${d.getFullYear()}`;
          return (
            <Link key={item.id} href={`/d/item/${item.id}`} style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "14px 0",
                borderBottom: i < sorted.length - 1 ? `1px solid ${D.border}` : "none",
              }}>
                {/* Color swatch */}
                <div style={{
                  width: 52, height: 52, borderRadius: 12, flexShrink: 0,
                  background: itemColor(item.category),
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "rgba(20,20,16,0.3)" }}>
                    {itemInitials(item.name)}
                  </span>
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontSize: 14, color: D.text, fontWeight: 500,
                    marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                  }}>
                    {item.name}
                  </p>
                  <p style={{ fontSize: 12, color: D.textDim }}>
                    {acqStr}
                    {item.lent_to && (
                      <span style={{ color: "#B07B3A" }}> · у {item.lent_to}</span>
                    )}
                  </p>
                </div>

                {/* Right */}
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: D.text, marginBottom: 3 }}>
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

        {items.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: D.textDim, fontSize: 14 }}>
            В этой коллекции пока нет вещей
          </div>
        )}
      </div>

      {/* FAB */}
      <StubButton
        label=""
        description="Добавить вещь в эту коллекцию"
        icon={<span style={{ fontSize: 24, lineHeight: 1 }}>+</span>}
        style={{
          position: "fixed", bottom: 96, right: 24,
          width: 52, height: 52, borderRadius: 26,
          background: D.accent, color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(27,104,64,0.3)",
        }}
        className="md:hidden"
      />
    </main>
  );
}
