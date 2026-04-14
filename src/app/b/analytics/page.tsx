import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  MOCK_SPACES,
  MOCK_ITEMS,
  TOTAL_VALUE,
  TOTAL_ITEMS,
  OLD_ITEMS,
  OLD_VALUE,
  fmt,
  spaceEmoji,
} from "@/lib/mock-data";
import { SellActionBtn } from "./action-button-b";

export default function AnalyticsB() {
  const byCategory = MOCK_ITEMS.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.price;
      return acc;
    },
    {} as Record<string, number>
  );
  const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);

  const spaceData = MOCK_SPACES.map((s) => ({
    ...s,
    value: s.items.reduce((sum, i) => sum + i.price, 0),
    count: s.items.length,
  })).sort((a, b) => b.value - a.value);

  const maxSpaceValue = spaceData[0]?.value || 1;
  const total = categories.reduce((s, [, v]) => s + v, 0);
  const estimatedM2 = Math.round(TOTAL_ITEMS * 0.08);

  const accentColors = [
    "#E8A04B",
    "#5CB87A",
    "#7D9EB2",
    "#C47D6D",
    "#9B8EFF",
    "#C4956A",
  ];

  return (
    <main style={{ minHeight: "100vh", background: "#0F0E0D", paddingBottom: 96 }}>
      {/* HEADER */}
      <header style={{ padding: "48px 24px 24px" }}>
        <Link
          href="/b"
          style={{
            color: "#9C978F",
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginBottom: 24,
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          <ArrowLeft size={18} strokeWidth={1.5} /> Назад
        </Link>
        <p
          style={{
            color: "#625E58",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 8,
          }}
        >
          Обзор
        </p>
        <h1
          style={{
            color: "#F5F0E8",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.5,
          }}
        >
          Аналитика
        </h1>
      </header>

      {/* HERO */}
      <section style={{ padding: "0 24px 20px" }}>
        <div
          style={{
            background: "#1A1917",
            border: "1px solid #2E2C29",
            borderRadius: 20,
            padding: 32,
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#625E58",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 12,
            }}
          >
            Стоимость имущества
          </p>
          <p
            style={{
              color: "#F5F0E8",
              fontSize: 48,
              fontWeight: 700,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            {fmt(TOTAL_VALUE)}
          </p>
          <p style={{ color: "#625E58", fontSize: 13, marginTop: 10 }}>
            {TOTAL_ITEMS} предметов · {MOCK_SPACES.length} пространств
          </p>
        </div>
      </section>

      {/* 2 МИНИ-КАРТОЧКИ */}
      <section style={{ padding: "0 24px 20px", display: "flex", gap: 12 }}>
        <div
          style={{
            flex: 1,
            background: "#1A1917",
            border: "1px solid #2E2C29",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <p
            style={{
              color: "#625E58",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 8,
            }}
          >
            Ср. цена
          </p>
          <p style={{ color: "#F5F0E8", fontSize: 22, fontWeight: 700 }}>
            {fmt(Math.round(TOTAL_VALUE / TOTAL_ITEMS))}
          </p>
        </div>
        <div
          style={{
            flex: 1,
            background: "#1A1917",
            border: "1px solid #2E2C29",
            borderRadius: 16,
            padding: 20,
          }}
        >
          <p
            style={{
              color: "#625E58",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 1.5,
              marginBottom: 8,
            }}
          >
            Место
          </p>
          <p style={{ color: "#F5F0E8", fontSize: 22, fontWeight: 700 }}>
            ~{estimatedM2} м²
          </p>
        </div>
      </section>

      {/* МЁРТВЫЙ ГРУЗ */}
      <section style={{ padding: "0 24px 20px" }}>
        <div
          style={{
            background: "rgba(232,160,75,0.06)",
            border: "1px solid rgba(232,160,75,0.2)",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 14,
              alignItems: "flex-start",
              marginBottom: 16,
            }}
          >
            <span style={{ fontSize: 28 }}>💤</span>
            <div>
              <p
                style={{ color: "#F5F0E8", fontSize: 16, fontWeight: 600, marginBottom: 4 }}
              >
                Не трогали 6+ месяцев
              </p>
              <p style={{ color: "#9C978F", fontSize: 13 }}>
                Можно продать или подарить
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginBottom: 16,
            }}
          >
            <span style={{ color: "#E8A04B", fontSize: 36, fontWeight: 700 }}>
              {OLD_ITEMS.length}
            </span>
            <span style={{ color: "#9C978F", fontSize: 15 }}>
              вещей · {fmt(OLD_VALUE)}
            </span>
          </div>
          <SellActionBtn
            label="Разобрать и продать"
            description="Найдём забытые вещи и создадим объявления"
          />
        </div>
      </section>

      {/* КАТЕГОРИИ */}
      <section style={{ padding: "0 24px 20px" }}>
        <div
          style={{
            background: "#1A1917",
            border: "1px solid #2E2C29",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <p
            style={{
              color: "#625E58",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            По категориям
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {categories.map(([cat, val], i) => (
              <div key={cat}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ color: "#9C978F", fontSize: 13 }}>{cat}</span>
                  <span style={{ color: "#F5F0E8", fontSize: 13, fontWeight: 600 }}>
                    {fmt(val)}
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    background: "#242220",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      background: accentColors[i % accentColors.length],
                      borderRadius: 2,
                      width: `${(val / total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПРОСТРАНСТВА */}
      <section style={{ padding: "0 24px" }}>
        <div
          style={{
            background: "#1A1917",
            border: "1px solid #2E2C29",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <p
            style={{
              color: "#625E58",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 2,
              marginBottom: 20,
            }}
          >
            Пространства
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {spaceData.map((s) => (
              <div key={s.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ color: "#9C978F", fontSize: 13 }}>
                    {spaceEmoji(s.type)} {s.name}
                  </span>
                  <div style={{ textAlign: "right" }}>
                    <span style={{ color: "#F5F0E8", fontSize: 13, fontWeight: 600 }}>
                      {fmt(s.value)}
                    </span>
                    <span style={{ color: "#625E58", fontSize: 11, marginLeft: 8 }}>
                      {s.count} вещей
                    </span>
                  </div>
                </div>
                <div
                  style={{
                    height: 4,
                    background: "#242220",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      background: "#E8A04B",
                      borderRadius: 2,
                      width: `${(s.value / maxSpaceValue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
