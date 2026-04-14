import Link from "next/link";
import { ArrowLeft, Tag, Gift, HandHelping, MoveRight, Share2 } from "lucide-react";
import {
  MOCK_ITEMS, MOCK_SPACES, fmt, itemColor, itemInitials,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

export default async function ItemPageA({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = MOCK_ITEMS.find((i) => i.id === id) || MOCK_ITEMS[0];
  const space = MOCK_SPACES.find((s) => s.id === item.space_id);

  return (
    <main style={{ minHeight: "100vh", background: "#FAF8F5", paddingBottom: 96 }}>

      {/* NAV */}
      <nav style={{ padding: "16px 20px 12px", display: "flex", alignItems: "center" }}>
        <Link
          href={`/a/space/${item.space_id}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "#8A7E76", fontSize: 13, textDecoration: "none",
          }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {space?.name || "Назад"}
        </Link>
      </nav>

      {/* PHOTO */}
      <div style={{ margin: "0 20px 20px" }}>
        <div
          style={{
            borderRadius: 20, overflow: "hidden",
            background: itemColor(item.category),
            aspectRatio: "1 / 1",
            maxHeight: 320,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {item.photo_url ? (
            <img src={item.photo_url} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: 64, fontWeight: 700, color: "rgba(44,36,32,0.18)", letterSpacing: -2 }}>
              {itemInitials(item.name)}
            </span>
          )}
        </div>
      </div>

      {/* INFO */}
      <div style={{ padding: "0 20px 20px", borderBottom: "1px solid #EDE7DF" }}>
        <p style={{ fontSize: 11, color: "#B0A89E", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 8 }}>
          {item.category}
        </p>
        <h1 style={{ fontSize: 26, fontWeight: 600, color: "#2C2420", letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 10 }}>
          {item.name}
        </h1>
        {item.price > 0 && (
          <p style={{ fontSize: 24, fontWeight: 700, color: "#C4956A", letterSpacing: -0.5 }}>
            {fmt(item.price)}
          </p>
        )}
      </div>

      {/* DESCRIPTION */}
      {item.description && (
        <div style={{ padding: "16px 20px", borderBottom: "1px solid #EDE7DF" }}>
          <p style={{ fontSize: 14, color: "#6B6460", lineHeight: 1.6 }}>{item.description}</p>
        </div>
      )}

      {/* LENT BANNER */}
      {item.lent_to && (
        <div
          style={{
            margin: "12px 20px",
            background: "rgba(196,149,106,0.1)",
            border: "1px solid rgba(196,149,106,0.25)",
            borderRadius: 12,
            padding: "12px 16px",
            display: "flex", alignItems: "center", gap: 10,
          }}
        >
          <HandHelping size={16} strokeWidth={1.5} style={{ color: "#C4956A", flexShrink: 0 }} />
          <p style={{ fontSize: 14, color: "#8A5C3A", fontWeight: 500 }}>
            Сейчас у <strong>{item.lent_to}</strong>
          </p>
        </div>
      )}

      {/* WHERE */}
      {space && (
        <div style={{ padding: "12px 20px 0" }}>
          <Link href={`/a/space/${space.id}`} style={{ textDecoration: "none" }}>
            <div
              style={{
                background: "#F3EDE7", borderRadius: 14,
                padding: "14px 16px", display: "flex", alignItems: "center", gap: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 11, color: "#8A7E76", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 3 }}>
                  Где хранится
                </p>
                <p style={{ fontSize: 15, fontWeight: 500, color: "#2C2420" }}>{space.name}</p>
              </div>
              <ArrowLeft size={16} strokeWidth={1.5} style={{ color: "#C4956A", transform: "rotate(180deg)" }} />
            </div>
          </Link>
        </div>
      )}

      {/* ACTIONS */}
      <div style={{ padding: "20px" }}>
        <p style={{ fontSize: 11, color: "#B0A89E", letterSpacing: "0.18em", textTransform: "uppercase", marginBottom: 14 }}>
          Действия
        </p>
        <div className="grid grid-cols-2 gap-3">
          <StubButton
            label="Продать"
            description="AI создаст объявление для Avito"
            icon={<Tag size={15} strokeWidth={1.5} style={{ marginRight: 8 }} />}
            style={{ background: "#C4956A", borderRadius: 14, padding: "14px 16px", color: "white", fontSize: 14, fontWeight: 600, display: "flex", alignItems: "center", width: "100%" }}
          />
          <StubButton
            label="Подарить"
            description="Кому и когда?"
            icon={<Gift size={15} strokeWidth={1.5} style={{ marginRight: 8 }} />}
            style={{ background: "#F3EDE7", borderRadius: 14, padding: "14px 16px", color: "#2C2420", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", width: "100%" }}
          />
          <StubButton
            label="Одолжить"
            description="Укажите кому и на сколько"
            icon={<HandHelping size={15} strokeWidth={1.5} style={{ marginRight: 8 }} />}
            style={{ border: "1px solid #E8E2DB", borderRadius: 14, padding: "14px 16px", color: "#6B6460", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", width: "100%", background: "white" }}
          />
          <StubButton
            label="Переместить"
            description="В другое пространство"
            icon={<MoveRight size={15} strokeWidth={1.5} style={{ marginRight: 8 }} />}
            style={{ border: "1px solid #E8E2DB", borderRadius: 14, padding: "14px 16px", color: "#6B6460", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", width: "100%", background: "white" }}
          />
        </div>
      </div>
    </main>
  );
}
