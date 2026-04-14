import Link from "next/link";
import {
  MOCK_SPACES, MOCK_ITEMS, fmt, itemColor, itemInitials,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

// ── A «Витрина» ──
// Главная философия: ты ПРОСМАТРИВАЕШЬ коллекцию визуально, как в шоурум.
// Никакой статистики на первом экране. Вещи — главные герои.

export default function DashboardA() {
  const allItems = [...MOCK_ITEMS]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 18);

  return (
    <div style={{ background: "#FAF8F5", minHeight: "100vh", paddingBottom: 100 }}>

      {/* ── ШАПКА ── */}
      <div style={{ padding: "22px 20px 14px" }}>
        <p style={{ fontSize: 12, color: "#B0A89E", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 3 }}>
          Апрель · Привет, Сергей
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#2C2420", letterSpacing: -0.6, lineHeight: 1 }}>
          Моя коллекция
        </h1>
      </div>

      {/* ── ГОРИЗОНТАЛЬНЫЙ ФИЛЬТР ПО ПРОСТРАНСТВАМ ── */}
      <div style={{ overflowX: "auto", paddingBottom: 4 }} className="no-scrollbar">
        <div style={{ display: "flex", gap: 8, padding: "0 20px 14px", width: "max-content" }}>
          {/* «Все» — active state */}
          <div style={{
            padding: "7px 16px", borderRadius: 20,
            background: "#2C2420", color: "#F5F0E8",
            fontSize: 13, fontWeight: 600, whiteSpace: "nowrap",
          }}>
            Все · {MOCK_ITEMS.length}
          </div>

          {MOCK_SPACES.map((space) => (
            <Link
              key={space.id}
              href={`/a/space/${space.id}`}
              style={{
                padding: "7px 16px", borderRadius: 20,
                background: "white", border: "1px solid #E8E2DB",
                color: "#6B6460", fontSize: 13, fontWeight: 400,
                textDecoration: "none", whiteSpace: "nowrap", flexShrink: 0,
              }}
            >
              {space.name} · {space.items.length}
            </Link>
          ))}
        </div>
      </div>

      {/* ── ВИЗУАЛЬНАЯ ГАЛЕРЕЯ ── */}
      {/* Mobile: 2 col, Desktop: 4 col */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3 px-4 md:px-6"
      >
        {allItems.map((item) => (
          <Link key={item.id} href={`/a/item/${item.id}`} style={{ textDecoration: "none" }}>
            <div style={{
              background: "white",
              borderRadius: 18,
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(44,36,32,0.06)",
            }}>
              {/* Фото — 4:5 aspect (портретный, как в бутике) */}
              <div style={{
                aspectRatio: "4 / 5",
                background: itemColor(item.category),
                display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative",
              }}>
                {item.photo_url ? (
                  <img src={item.photo_url} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                ) : (
                  <span style={{ fontSize: 32, fontWeight: 700, color: "rgba(44,36,32,0.2)", letterSpacing: -1 }}>
                    {itemInitials(item.name)}
                  </span>
                )}
                {item.lent_to && (
                  <div style={{
                    position: "absolute", bottom: 8, left: 8,
                    background: "rgba(196,149,106,0.9)", borderRadius: 10,
                    padding: "2px 8px", fontSize: 10, fontWeight: 600, color: "white",
                  }}>
                    у {item.lent_to}
                  </div>
                )}
              </div>
              {/* Подпись */}
              <div style={{ padding: "10px 12px 12px" }}>
                <p style={{
                  fontSize: 12, color: "#2C2420", fontWeight: 500,
                  lineHeight: 1.3, marginBottom: 3,
                  display: "-webkit-box", WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical", overflow: "hidden",
                }}>
                  {item.name}
                </p>
                <p style={{ fontSize: 12, color: "#C4956A", fontWeight: 600 }}>
                  {fmt(item.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── ПОКАЗАТЬ ВСЕ ── */}
      <div style={{ padding: "20px 20px 0", textAlign: "center" }}>
        <Link href="/a/search" style={{
          display: "inline-block", padding: "12px 28px",
          border: "1px solid #E8E2DB", borderRadius: 24,
          color: "#6B6460", fontSize: 13, textDecoration: "none", fontWeight: 500,
          background: "white",
        }}>
          Все {MOCK_ITEMS.length} вещей
        </Link>
      </div>

      {/* FAB mobile */}
      <StubButton
        label=""
        description="Добавить вещь через камеру"
        className="md:hidden fixed bottom-[88px] right-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        style={{ background: "#C4956A", color: "white" }}
        icon={<span style={{ fontSize: 26, lineHeight: 1 }}>+</span>}
      />
    </div>
  );
}
