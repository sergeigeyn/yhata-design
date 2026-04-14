import Link from "next/link";
import { ArrowLeft, LayoutGrid, List, Table2 } from "lucide-react";
import { MOCK_SPACES, MOCK_ITEMS, fmt, itemColor, itemInitials } from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

const C = {
  bg: "#F8F7F5", surface: "#FFFFFF", surfaceAlt: "#F2F1EF",
  border: "#E5E4E0", text: "#0D0D0D", textMid: "#6B6B68",
  textDim: "#B0AFAB", accent: "#5B5BD6", accentLight: "rgba(91,91,214,0.08)",
};

// Три вида отображения — ключевое UX-отличие варианта C
type ViewMode = "grid" | "list" | "table";

const MONTH_RU = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];

function GridView({ items, spaceId }: { items: typeof MOCK_ITEMS; spaceId: string }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px" style={{ background: C.border }}>
      {items.map((item) => (
        <Link key={item.id} href={`/c/item/${item.id}`} style={{ textDecoration: "none", display: "block", background: C.surface }}>
          <div>
            <div style={{
              aspectRatio: "1 / 1", background: itemColor(item.category),
              display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
            }}>
              {item.photo_url ? (
                <img src={item.photo_url} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <span style={{ fontSize: 24, fontWeight: 600, color: "rgba(13,13,13,0.22)", letterSpacing: -0.5, userSelect: "none" }}>
                  {itemInitials(item.name)}
                </span>
              )}
              {item.lent_to && (
                <div style={{
                  position: "absolute", top: 8, right: 8,
                  background: C.accentLight, border: `1px solid ${C.accent}`,
                  borderRadius: 4, padding: "2px 7px",
                  fontSize: 10, fontWeight: 500, color: C.accent,
                }}>
                  у {item.lent_to}
                </div>
              )}
            </div>
            <div style={{ padding: "10px 12px 12px" }}>
              <p style={{ fontSize: 13, color: C.text, fontWeight: 400, lineHeight: 1.35, marginBottom: 5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {item.name}
              </p>
              <p style={{ fontSize: 13, color: C.accent, fontWeight: 500 }}>{fmt(item.price)}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

function ListView({ items }: { items: typeof MOCK_ITEMS }) {
  return (
    <div style={{ padding: "0 24px" }}>
      {items.map((item, i) => {
        const d = new Date(item.created_at);
        return (
          <Link key={item.id} href={`/c/item/${item.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 14,
              padding: "14px 0",
              borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none",
            }}>
              <div style={{
                width: 48, height: 48, borderRadius: 10, flexShrink: 0,
                background: itemColor(item.category),
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(13,13,13,0.25)" }}>
                  {itemInitials(item.name)}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 14, color: C.text, fontWeight: 500, marginBottom: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.name}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 11, color: C.textDim }}>{item.category}</span>
                  <span style={{ fontSize: 11, color: C.textDim }}>·</span>
                  <span style={{ fontSize: 11, color: C.textDim }}>{d.getDate()} {MONTH_RU[d.getMonth()]}. {d.getFullYear()}</span>
                  {item.lent_to && (
                    <>
                      <span style={{ fontSize: 11, color: C.textDim }}>·</span>
                      <span style={{ fontSize: 11, color: C.accent }}>у {item.lent_to}</span>
                    </>
                  )}
                </div>
              </div>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.accent, flexShrink: 0, fontVariantNumeric: "tabular-nums" }}>
                {fmt(item.price)}
              </p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

function TableView({ items }: { items: typeof MOCK_ITEMS }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
        <thead>
          <tr style={{ borderBottom: `2px solid ${C.border}` }}>
            {["Название", "Категория", "Пространство", "Добавлено", "Статус", "Стоимость"].map((h) => (
              <th key={h} style={{
                padding: "10px 16px", textAlign: "left",
                fontSize: 11, color: C.textDim, fontWeight: 500,
                letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap",
              }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((item, i) => {
            const d = new Date(item.created_at);
            return (
              <tr
                key={item.id}
                style={{ borderBottom: i < items.length - 1 ? `1px solid ${C.border}` : "none" }}
              >
                <td style={{ padding: "12px 16px" }}>
                  <Link href={`/c/item/${item.id}`} style={{ textDecoration: "none", color: C.text, fontWeight: 500 }}>
                    {item.name}
                  </Link>
                </td>
                <td style={{ padding: "12px 16px", color: C.textMid, whiteSpace: "nowrap" }}>
                  <span style={{
                    display: "inline-block", padding: "2px 8px",
                    background: C.accentLight, borderRadius: 4,
                    fontSize: 11, color: C.accent, fontWeight: 500,
                  }}>
                    {item.category}
                  </span>
                </td>
                <td style={{ padding: "12px 16px", color: C.textMid, whiteSpace: "nowrap" }}>{item.space_name}</td>
                <td style={{ padding: "12px 16px", color: C.textDim, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
                  {d.getDate()}.{String(d.getMonth() + 1).padStart(2, "0")}.{d.getFullYear()}
                </td>
                <td style={{ padding: "12px 16px", whiteSpace: "nowrap" }}>
                  {item.lent_to ? (
                    <span style={{ fontSize: 12, color: C.accent }}>у {item.lent_to}</span>
                  ) : (
                    <span style={{ fontSize: 12, color: C.textDim }}>на месте</span>
                  )}
                </td>
                <td style={{ padding: "12px 16px", color: C.accent, fontWeight: 600, whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>
                  {fmt(item.price)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default async function SpacePageC({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  const { id } = await params;
  const { view = "grid" } = await searchParams;
  const currentView = (["grid", "list", "table"].includes(view) ? view : "grid") as ViewMode;

  const space = MOCK_SPACES.find((s) => s.id === id) || MOCK_SPACES[0];
  const items = MOCK_ITEMS.filter((i) => i.space_id === space.id);
  const totalValue = items.reduce((sum, i) => sum + i.price, 0);

  const sorted = [...items].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const baseHref = `/c/space/${space.id}`;

  return (
    <main style={{ minHeight: "100vh", background: C.bg, paddingBottom: 96 }}>
      {/* HEADER */}
      <header style={{
        position: "sticky", top: 36, background: C.bg, zIndex: 10,
        borderBottom: `1px solid ${C.border}`, padding: "16px 24px 0",
      }}>
        <Link href="/c" style={{
          color: C.textMid, display: "inline-flex", alignItems: "center",
          gap: 6, textDecoration: "none", fontSize: 13, marginBottom: 12,
        }}>
          <ArrowLeft size={14} strokeWidth={1.5} />
          Все пространства
        </Link>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", paddingBottom: 14 }}>
          <div>
            <h1 style={{ color: C.text, fontSize: 22, fontWeight: 500, letterSpacing: -0.4, lineHeight: 1.15, marginBottom: 3 }}>
              {space.name}
            </h1>
            <p style={{ color: C.textMid, fontSize: 13 }}>
              {items.length} {items.length === 1 ? "вещь" : items.length < 5 ? "вещи" : "вещей"}{" "}
              · <span style={{ color: C.accent }}>{fmt(totalValue)}</span>
            </p>
          </div>

          {/* ── ПЕРЕКЛЮЧАТЕЛЬ ВИДОВ ── */}
          <div style={{
            display: "flex", gap: 2,
            background: C.surfaceAlt, borderRadius: 8, padding: 3,
          }}>
            {([
              { mode: "grid", Icon: LayoutGrid },
              { mode: "list", Icon: List },
              { mode: "table", Icon: Table2 },
            ] as { mode: ViewMode; Icon: React.ComponentType<{ size: number; strokeWidth: number; style: React.CSSProperties }> }[]).map(({ mode, Icon }) => (
              <Link
                key={mode}
                href={`${baseHref}?view=${mode}`}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center",
                  width: 32, height: 28, borderRadius: 6,
                  background: currentView === mode ? C.surface : "transparent",
                  boxShadow: currentView === mode ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                  textDecoration: "none",
                }}
              >
                <Icon
                  size={15}
                  strokeWidth={1.5}
                  style={{ color: currentView === mode ? C.accent : C.textDim }}
                />
              </Link>
            ))}
          </div>
        </div>
      </header>

      {/* КОНТЕНТ — в зависимости от вида */}
      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px 24px", color: C.textDim, fontSize: 14 }}>
          В этом пространстве пока нет вещей
        </div>
      ) : currentView === "grid" ? (
        <GridView items={sorted} spaceId={space.id} />
      ) : currentView === "list" ? (
        <ListView items={sorted} />
      ) : (
        <TableView items={sorted} />
      )}

      {/* FAB */}
      <StubButton
        label=""
        description="Добавить вещь в это пространство"
        icon={<span style={{ fontSize: 22, lineHeight: 1 }}>+</span>}
        style={{
          position: "fixed", bottom: 96, right: 24,
          width: 52, height: 52, borderRadius: 26,
          background: C.accent, color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(91,91,214,0.35)",
        }}
        className="md:hidden"
      />
    </main>
  );
}
