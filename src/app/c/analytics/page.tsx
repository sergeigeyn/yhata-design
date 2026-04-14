import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  MOCK_ITEMS,
  MOCK_SPACES,
  TOTAL_VALUE,
  TOTAL_ITEMS,
  fmt,
} from "@/lib/mock-data";

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

export default function AnalyticsC() {
  // Расчёт по категориям
  const byCategory = MOCK_ITEMS.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = { count: 0, value: 0 };
      acc[item.category].count += 1;
      acc[item.category].value += item.price;
      return acc;
    },
    {} as Record<string, { count: number; value: number }>
  );

  const categories = Object.entries(byCategory).sort((a, b) => b[1].value - a[1].value);
  const maxCatValue = categories[0]?.[1].value || 1;

  // Топ-3 самые дорогие вещи
  const top3 = [...MOCK_ITEMS].sort((a, b) => b.price - a.price).slice(0, 3);

  // Форматирование суммы для hero (в млн/тыс)
  const heroValue = TOTAL_VALUE >= 1_000_000
    ? `${(TOTAL_VALUE / 1_000_000).toFixed(2).replace(".", ",")} млн`
    : `${(TOTAL_VALUE / 1000).toFixed(0)} тыс.`;

  return (
    <main style={{ minHeight: "100vh", background: C.bg, paddingBottom: 96 }}>
      {/* NAV */}
      <nav
        style={{
          padding: "16px 24px 12px",
          borderBottom: `1px solid ${C.border}`,
          background: C.surface,
        }}
      >
        <Link
          href="/c"
          style={{
            color: C.textMid,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
            fontSize: 13,
          }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          Главная
        </Link>
      </nav>

      {/* HERO — большая сумма */}
      <section
        style={{
          padding: "48px 24px 40px",
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: C.textDim,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Общая стоимость
        </p>

        <p
          className="text-[52px] md:text-[72px]"
          style={{
            color: C.text,
            fontWeight: 300,
            letterSpacing: -3,
            lineHeight: 1,
            marginBottom: 12,
          }}
        >
          ₽ {heroValue}
        </p>

        <p style={{ color: C.textMid, fontSize: 14 }}>
          {TOTAL_ITEMS} вещей в {MOCK_SPACES.length} пространствах
        </p>
      </section>

      {/* СТАТЫ — 2 мини карточки */}
      <section
        className="grid grid-cols-2"
        style={{ borderBottom: `1px solid ${C.border}` }}
      >
        <div
          style={{
            padding: "24px",
            background: C.surface,
            borderRight: `1px solid ${C.border}`,
          }}
        >
          <p
            style={{
              color: C.textDim,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Ср. стоимость
          </p>
          <p style={{ color: C.text, fontSize: 20, fontWeight: 400, letterSpacing: -0.3 }}>
            {fmt(Math.round(TOTAL_VALUE / TOTAL_ITEMS))}
          </p>
        </div>
        <div style={{ padding: "24px", background: C.surface }}>
          <p
            style={{
              color: C.textDim,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Одолжено
          </p>
          <p style={{ color: C.accent, fontSize: 20, fontWeight: 400, letterSpacing: -0.3 }}>
            {MOCK_ITEMS.filter((i) => i.lent_to).length} вещей
          </p>
        </div>
      </section>

      {/* КАТЕГОРИИ */}
      <section style={{ padding: "32px 24px", borderBottom: `1px solid ${C.border}` }}>
        <p
          style={{
            color: C.textDim,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          По категориям
        </p>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {categories.map(([cat, data], idx) => (
            <div
              key={cat}
              style={{
                paddingBottom: 20,
                marginBottom: 20,
                borderBottom: idx < categories.length - 1 ? `1px solid ${C.border}` : "none",
              }}
            >
              {/* Заголовок строки */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  marginBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{ color: C.text, fontSize: 15 }}>{cat}</span>
                  <span style={{ color: C.textDim, fontSize: 12 }}>{data.count} шт.</span>
                </div>
                <span style={{ color: C.accent, fontSize: 14, fontWeight: 500 }}>
                  {fmt(data.value)}
                </span>
              </div>

              {/* Progress bar — div, не SVG */}
              <div
                style={{
                  height: 2,
                  background: C.border,
                  borderRadius: 1,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    height: 2,
                    background: C.accent,
                    borderRadius: 1,
                    width: `${(data.value / maxCatValue) * 100}%`,
                    opacity: 0.6 + 0.4 * (data.value / maxCatValue),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ТОП-3 САМЫЕ ДОРОГИЕ */}
      <section style={{ padding: "32px 24px" }}>
        <p
          style={{
            color: C.textDim,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: 2,
            textTransform: "uppercase",
            marginBottom: 20,
          }}
        >
          Самые ценные
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {top3.map((item, idx) => (
            <Link
              key={item.id}
              href={`/c/item/${item.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                style={{
                  background: C.surface,
                  border: `1px solid ${C.border}`,
                  borderRadius: 12,
                  padding: "20px 22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0 }}>
                  {/* Порядковый номер */}
                  <span
                    style={{
                      color: C.textDim,
                      fontSize: 13,
                      fontWeight: 400,
                      width: 16,
                      flexShrink: 0,
                    }}
                  >
                    {idx + 1}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <p
                      style={{
                        color: C.text,
                        fontSize: 15,
                        fontWeight: 400,
                        marginBottom: 4,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {item.name}
                    </p>
                    <p style={{ color: C.textDim, fontSize: 12 }}>
                      {item.space_name} · {item.category}
                    </p>
                  </div>
                </div>
                <p
                  style={{
                    color: C.accent,
                    fontSize: 16,
                    fontWeight: 500,
                    flexShrink: 0,
                    letterSpacing: -0.2,
                  }}
                >
                  {fmt(item.price)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
