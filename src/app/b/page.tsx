import Link from "next/link";
import { Search, Settings } from "lucide-react";
import {
  MOCK_SPACES,
  MOCK_ITEMS,
  TOTAL_VALUE,
  TOTAL_ITEMS,
  LENT_ITEMS,
  fmt,
  spaceEmoji,
  itemInitials,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";
import { FabB } from "./fab-b";

function ItemPhotoB({
  item,
  size = 80,
}: {
  item: { name: string; category: string; photo_url: string | null };
  size?: number;
}) {
  if (item.photo_url)
    return (
      <img
        src={item.photo_url}
        alt={item.name}
        style={{ width: size, height: size, objectFit: "cover", borderRadius: 12 }}
      />
    );
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        background: "#242220",
        border: "1px solid #2E2C29",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: size * 0.28, fontWeight: 700, color: "#625E58" }}>
        {itemInitials(item.name)}
      </span>
    </div>
  );
}

export default function DashboardB() {
  const recentItems = [...MOCK_ITEMS]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  const spacesSorted = [...MOCK_SPACES]
    .map((s) => ({
      ...s,
      totalValue: s.items.reduce((sum, i) => sum + i.price, 0),
    }))
    .sort((a, b) => b.totalValue - a.totalValue);

  const top5 = spacesSorted.slice(0, 5);
  const maxValue = top5[0]?.totalValue || 1;

  return (
    <main style={{ minHeight: "100vh", background: "#0F0E0D", paddingBottom: 96 }}>
      {/* HEADER */}
      <header style={{ padding: "48px 24px 24px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <span
            style={{ color: "#F5F0E8", fontSize: 22, fontWeight: 700, letterSpacing: -0.5 }}
          >
            YHATA
          </span>
          <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
            <Link href="/b/search">
              <Search size={20} strokeWidth={1.5} style={{ color: "#625E58" }} />
            </Link>
            <StubButton
              label=""
              icon={<Settings size={20} strokeWidth={1.5} style={{ color: "#625E58" }} />}
              description="Настройки в разработке"
            />
          </div>
        </div>
        <p style={{ color: "#9C978F", fontSize: 14, marginBottom: 4 }}>Привет, Сергей</p>
        <h1
          style={{
            color: "#F5F0E8",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: -0.5,
            lineHeight: 1.2,
          }}
        >
          Ваши вещи
        </h1>
      </header>

      {/* HERO STATS */}
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
            Имущество
          </p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ flex: 1, textAlign: "center" }}>
              <p
                style={{
                  color: "#F5F0E8",
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: -1,
                  lineHeight: 1,
                }}
              >
                {TOTAL_ITEMS}
              </p>
              <p style={{ color: "#625E58", fontSize: 11, marginTop: 4 }}>Предметов</p>
            </div>
            <div style={{ width: 1, background: "#2E2C29", margin: "0 16px", height: 40 }} />
            <div style={{ flex: 1, textAlign: "center" }}>
              <p
                style={{
                  color: "#F5F0E8",
                  fontSize: 20,
                  fontWeight: 700,
                  letterSpacing: -1,
                  lineHeight: 1,
                }}
              >
                {fmt(TOTAL_VALUE)}
              </p>
              <p style={{ color: "#625E58", fontSize: 11, marginTop: 4 }}>Стоимость</p>
            </div>
            <div style={{ width: 1, background: "#2E2C29", margin: "0 16px", height: 40 }} />
            <div style={{ flex: 1, textAlign: "center" }}>
              <p
                style={{
                  color: "#F5F0E8",
                  fontSize: 28,
                  fontWeight: 700,
                  letterSpacing: -1,
                  lineHeight: 1,
                }}
              >
                {MOCK_SPACES.length}
              </p>
              <p style={{ color: "#625E58", fontSize: 11, marginTop: 4 }}>Пространств</p>
            </div>
          </div>
        </div>
      </section>

      {/* БАР-ЧАРТ ПО ПРОСТРАНСТВАМ */}
      <section style={{ padding: "0 24px 20px" }}>
        <div
          style={{
            background: "#1A1917",
            border: "1px solid #2E2C29",
            borderRadius: 20,
            padding: 24,
          }}
        >
          <div
            style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}
          >
            <p
              style={{
                color: "#625E58",
                fontSize: 11,
                textTransform: "uppercase",
                letterSpacing: 2,
              }}
            >
              Распределение
            </p>
            <Link href="/b/analytics" style={{ color: "#E8A04B", fontSize: 12, textDecoration: "none" }}>
              Аналитика →
            </Link>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {top5.map((space) => (
              <div key={space.id}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <span style={{ color: "#9C978F", fontSize: 13 }}>{space.name}</span>
                  <span style={{ color: "#F5F0E8", fontSize: 13, fontWeight: 600 }}>
                    {fmt(space.totalValue)}
                  </span>
                </div>
                <div
                  style={{
                    height: 4,
                    background: "#2E2C29",
                    borderRadius: 2,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: 4,
                      background: "#E8A04B",
                      borderRadius: 2,
                      width: `${(space.totalValue / maxValue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОДОЛЖЕННЫЕ */}
      {LENT_ITEMS.length > 0 && (
        <section style={{ padding: "0 24px 20px" }}>
          <div
            style={{
              background: "rgba(232,160,75,0.08)",
              border: "1px solid rgba(232,160,75,0.2)",
              borderRadius: 16,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 20 }}>🤝</span>
            <p style={{ color: "#E8A04B", fontSize: 14, flex: 1 }}>
              {LENT_ITEMS.length} вещи одолжено
            </p>
            <Link href="/b/search" style={{ color: "#E8A04B", fontSize: 14, textDecoration: "none" }}>
              →
            </Link>
          </div>
        </section>
      )}

      {/* ПОСЛЕДНИЕ — горизонтальный скролл */}
      <section style={{ marginBottom: 20 }}>
        <div
          style={{
            padding: "0 24px",
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 12,
          }}
        >
          <p
            style={{
              color: "#625E58",
              fontSize: 11,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            Последние
          </p>
        </div>
        <div
          style={{
            display: "flex",
            gap: 12,
            paddingLeft: 24,
            paddingRight: 24,
            overflowX: "auto",
            paddingBottom: 8,
          }}
          className="no-scrollbar"
        >
          {recentItems.map((item) => (
            <Link
              key={item.id}
              href={`/b/item/${item.id}`}
              style={{ textDecoration: "none", flexShrink: 0 }}
            >
              <div
                style={{
                  width: 130,
                  background: "#1A1917",
                  border: "1px solid #2E2C29",
                  borderRadius: 16,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: 130,
                    height: 130,
                    background: "#242220",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "16px 16px 0 0",
                    overflow: "hidden",
                  }}
                >
                  {item.photo_url ? (
                    <img
                      src={item.photo_url}
                      alt={item.name}
                      style={{ width: 130, height: 130, objectFit: "cover" }}
                    />
                  ) : (
                    <span style={{ fontSize: 36, fontWeight: 700, color: "#625E58" }}>
                      {itemInitials(item.name)}
                    </span>
                  )}
                </div>
                <div style={{ padding: 10 }}>
                  <p
                    style={{
                      color: "#F5F0E8",
                      fontSize: 12,
                      fontWeight: 500,
                      lineHeight: 1.3,
                      marginBottom: 4,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {item.name}
                  </p>
                  <p style={{ color: "#E8A04B", fontSize: 12, fontWeight: 600 }}>
                    {fmt(item.price)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ПРОСТРАНСТВА */}
      <section style={{ padding: "0 24px" }}>
        <p
          style={{
            color: "#625E58",
            fontSize: 11,
            textTransform: "uppercase",
            letterSpacing: 2,
            marginBottom: 12,
          }}
        >
          Пространства
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {MOCK_SPACES.map((space) => {
            const totalValue = space.items.reduce((sum, i) => sum + i.price, 0);
            return (
              <Link
                key={space.id}
                href={`/b/space/${space.id}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "#1A1917",
                    border: "1px solid #2E2C29",
                    borderRadius: 16,
                    padding: "14px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                  }}
                >
                  <span style={{ fontSize: 22 }}>{spaceEmoji(space.type)}</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ color: "#F5F0E8", fontSize: 15, fontWeight: 500, marginBottom: 2 }}>
                      {space.name}
                    </p>
                    <p style={{ color: "#625E58", fontSize: 13 }}>
                      {space.items.length} вещей · {fmt(totalValue)}
                    </p>
                  </div>
                  <span style={{ color: "#625E58", fontSize: 16 }}>→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FAB */}
      <FabB />
    </main>
  );
}
