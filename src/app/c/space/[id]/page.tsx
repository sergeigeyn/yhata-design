import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MOCK_SPACES, MOCK_ITEMS, fmt, itemColor, itemInitials } from "@/lib/mock-data";

const C = {
  bg: "#F8F7F5",
  surface: "#FFFFFF",
  surfaceAlt: "#F2F1EF",
  border: "#E5E4E0",
  text: "#0D0D0D",
  textMid: "#6B6B68",
  textDim: "#B0AFAB",
  accent: "#5B5BD6",
  accentLight: "rgba(91,91,214,0.08)",
};

export default async function SpacePageC({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const space = MOCK_SPACES.find((s) => s.id === id) || MOCK_SPACES[0];
  const items = MOCK_ITEMS.filter((i) => i.space_id === space.id);
  const totalValue = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <main style={{ minHeight: "100vh", background: C.bg, paddingBottom: 96 }}>
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 0,
          background: C.bg,
          zIndex: 10,
          borderBottom: `1px solid ${C.border}`,
          padding: "16px 24px 16px",
        }}
      >
        {/* Навигация назад */}
        <Link
          href="/c"
          style={{
            color: C.textMid,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
            fontSize: 13,
            letterSpacing: 0.1,
            marginBottom: 14,
          }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Все пространства
        </Link>

        {/* Заголовок пространства */}
        <div>
          <h1
            style={{
              color: C.text,
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: -0.4,
              lineHeight: 1.15,
              marginBottom: 4,
            }}
          >
            {space.name}
          </h1>
          <p
            style={{
              color: C.textMid,
              fontSize: 13,
              letterSpacing: 0.1,
            }}
          >
            {items.length} {items.length === 1 ? "вещь" : items.length < 5 ? "вещи" : "вещей"}{" "}
            ·{" "}
            <span style={{ color: C.accent }}>{fmt(totalValue)}</span>
          </p>
        </div>
      </header>

      {/* GRID ВЕЩЕЙ — мобиль 2 колонки, десктоп 4 */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-px"
        style={{ padding: "1px", background: C.border }}
      >
        {items.map((item) => (
          <Link
            key={item.id}
            href={`/c/item/${item.id}`}
            style={{ textDecoration: "none", display: "block", background: C.surface }}
          >
            <div
              style={{
                background: C.surface,
                cursor: "pointer",
              }}
            >
              {/* Цветной плейсхолдер */}
              <div
                style={{
                  aspectRatio: "1 / 1",
                  background: itemColor(item.category),
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "rgba(13,13,13,0.25)",
                    letterSpacing: -0.5,
                    userSelect: "none",
                  }}
                >
                  {itemInitials(item.name)}
                </span>
                {item.lent_to && (
                  <div
                    style={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      background: C.accentLight,
                      border: `1px solid ${C.accent}`,
                      borderRadius: 4,
                      padding: "2px 7px",
                      fontSize: 10,
                      fontWeight: 500,
                      color: C.accent,
                      letterSpacing: 0.3,
                    }}
                  >
                    у {item.lent_to}
                  </div>
                )}
              </div>

              {/* Подпись */}
              <div style={{ padding: "12px 14px 14px" }}>
                <p
                  style={{
                    color: C.text,
                    fontSize: 13,
                    fontWeight: 400,
                    lineHeight: 1.35,
                    marginBottom: 5,
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {item.name}
                </p>
                <p
                  style={{
                    color: C.accent,
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {fmt(item.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Пусто */}
      {items.length === 0 && (
        <div
          style={{
            textAlign: "center",
            padding: "80px 24px",
            color: C.textDim,
            fontSize: 14,
          }}
        >
          В этом пространстве пока нет вещей
        </div>
      )}
    </main>
  );
}
