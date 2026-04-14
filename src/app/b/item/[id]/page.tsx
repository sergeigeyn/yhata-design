import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MOCK_ITEMS, MOCK_SPACES, fmt, spaceEmoji, itemInitials } from "@/lib/mock-data";
import { ItemActionsB } from "./item-actions-b";

function ItemPhotoBItem({
  item,
}: {
  item: { name: string; category: string; photo_url: string | null };
}) {
  if (item.photo_url)
    return (
      <img
        src={item.photo_url}
        alt={item.name}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#1A1917",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span style={{ fontSize: 64, fontWeight: 700, color: "#625E58" }}>
        {itemInitials(item.name)}
      </span>
    </div>
  );
}

export default async function ItemPageB({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = MOCK_ITEMS.find((i) => i.id === id) || MOCK_ITEMS[0];
  const space = MOCK_SPACES.find((s) => s.id === item.space_id);

  return (
    <main style={{ minHeight: "100vh", background: "#0F0E0D", paddingBottom: 96 }}>
      {/* HEADER */}
      <header style={{ padding: "16px 24px 8px" }}>
        <Link
          href="/b"
          style={{
            color: "#9C978F",
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
            fontSize: 14,
          }}
        >
          <ArrowLeft size={16} strokeWidth={1.5} />
          Назад
        </Link>
      </header>

      {/* ФОТО */}
      <div style={{ padding: "8px 24px 20px" }}>
        <div
          style={{
            aspectRatio: "1 / 1",
            maxHeight: 320,
            background: "#1A1917",
            borderRadius: 20,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ItemPhotoBItem item={item} />
        </div>
      </div>

      {/* ОСНОВНАЯ ИНФОРМАЦИЯ */}
      <div style={{ padding: "0 24px 20px" }}>
        {item.lent_to && (
          <div style={{ marginBottom: 12 }}>
            <span
              style={{
                background: "rgba(232,160,75,0.15)",
                border: "1px solid rgba(232,160,75,0.3)",
                color: "#E8A04B",
                fontSize: 12,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 20,
              }}
            >
              🤝 Одолжено: {item.lent_to}
            </span>
          </div>
        )}
        <h1
          style={{
            color: "#F5F0E8",
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: -0.5,
            lineHeight: 1.2,
            marginBottom: 8,
          }}
        >
          {item.name}
        </h1>
        {item.description && (
          <p style={{ color: "#9C978F", fontSize: 14, lineHeight: 1.5, marginBottom: 16 }}>
            {item.description}
          </p>
        )}
        <p style={{ color: "#E8A04B", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
          {fmt(item.price)}
        </p>
      </div>

      {/* ГДЕ ЛЕЖИТ */}
      {space && (
        <div style={{ padding: "0 24px 24px" }}>
          <Link href={`/b/space/${space.id}`} style={{ textDecoration: "none" }}>
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
                <p style={{ color: "#625E58", fontSize: 11, marginBottom: 2 }}>Где лежит</p>
                <p style={{ color: "#F5F0E8", fontSize: 15, fontWeight: 500 }}>{space.name}</p>
              </div>
              <span style={{ color: "#625E58" }}>→</span>
            </div>
          </Link>
        </div>
      )}

      {/* КНОПКИ ДЕЙСТВИЙ */}
      <div style={{ padding: "0 24px" }}>
        <ItemActionsB itemName={item.name} />
      </div>
    </main>
  );
}
