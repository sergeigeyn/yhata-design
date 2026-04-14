import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MOCK_SPACES, MOCK_ITEMS, fmt, spaceEmoji, itemInitials } from "@/lib/mock-data";

function ItemPhotoBSpace({
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

export default async function SpacePageB({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const space = MOCK_SPACES.find((s) => s.id === id) || MOCK_SPACES[0];
  const items = MOCK_ITEMS.filter((i) => i.space_id === space.id);
  const totalValue = items.reduce((sum, i) => sum + i.price, 0);

  return (
    <main style={{ minHeight: "100vh", background: "#0F0E0D", paddingBottom: 96 }}>
      {/* HEADER */}
      <header
        style={{
          position: "sticky",
          top: 36,
          background: "#0F0E0D",
          zIndex: 10,
          padding: "16px 24px 12px",
          borderBottom: "1px solid #1A1917",
        }}
      >
        <Link
          href="/b"
          style={{
            color: "#9C978F",
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            marginBottom: 16,
            fontSize: 14,
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Назад
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 28 }}>{spaceEmoji(space.type)}</span>
          <div>
            <h1
              style={{
                color: "#F5F0E8",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: -0.5,
                lineHeight: 1.1,
              }}
            >
              {space.name}
            </h1>
            <p style={{ color: "#625E58", fontSize: 13, marginTop: 2 }}>
              {items.length} вещей · {fmt(totalValue)}
            </p>
          </div>
        </div>
      </header>

      {/* GRID ВЕЩЕЙ */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
          padding: "20px 16px",
        }}
      >
        {items.map((item) => (
          <Link key={item.id} href={`/b/item/${item.id}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#1A1917",
                border: "1px solid #2E2C29",
                borderRadius: 16,
                overflow: "hidden",
              }}
            >
              {/* Фото */}
              <div
                style={{
                  aspectRatio: "1 / 1",
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
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                ) : (
                  <span style={{ fontSize: 32, fontWeight: 700, color: "#625E58" }}>
                    {itemInitials(item.name)}
                  </span>
                )}
              </div>
              {/* Инфо */}
              <div style={{ padding: "10px 12px 12px" }}>
                {item.lent_to && (
                  <div style={{ marginBottom: 6 }}>
                    <span
                      style={{
                        background: "rgba(232,160,75,0.15)",
                        color: "#E8A04B",
                        fontSize: 10,
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 20,
                      }}
                    >
                      одолжено
                    </span>
                  </div>
                )}
                <p
                  style={{
                    color: "#F5F0E8",
                    fontSize: 13,
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
                <p style={{ color: "#E8A04B", fontSize: 13, fontWeight: 600 }}>
                  {fmt(item.price)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
