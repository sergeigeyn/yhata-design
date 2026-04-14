import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { MOCK_ITEMS, MOCK_SPACES, fmt, itemColor, itemInitials } from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

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

export default async function ItemPageC({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = MOCK_ITEMS.find((i) => i.id === id) || MOCK_ITEMS[0];
  const space = MOCK_SPACES.find((s) => s.id === item.space_id);

  return (
    <main style={{ minHeight: "100vh", background: C.bg, paddingBottom: 96 }}>
      {/* NAV */}
      <nav
        style={{
          padding: "16px 24px 12px",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <Link
          href={space ? `/c/space/${space.id}` : "/c"}
          style={{
            color: C.textMid,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            textDecoration: "none",
            fontSize: 13,
            letterSpacing: 0.1,
          }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {space ? space.name : "Назад"}
        </Link>
      </nav>

      {/* HERO СЕКЦИЯ — мобиль стек, десктоп side-by-side */}
      <section className="md:flex md:gap-0" style={{ borderBottom: `1px solid ${C.border}` }}>
        {/* Плейсхолдер квадрат */}
        <div
          className="md:w-96 md:flex-shrink-0"
          style={{
            aspectRatio: "1 / 1",
            background: itemColor(item.category),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontSize: 60,
              fontWeight: 600,
              color: "rgba(13,13,13,0.2)",
              letterSpacing: -2,
              userSelect: "none",
            }}
          >
            {itemInitials(item.name)}
          </span>
        </div>

        {/* Инфо справа / снизу */}
        <div
          className="md:flex md:flex-col md:justify-center"
          style={{
            padding: "24px 24px 28px",
            background: C.surface,
            borderLeft: `1px solid ${C.border}`,
          }}
        >
          {/* Категория */}
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
            {item.category}
          </p>

          {/* Название */}
          <h1
            style={{
              color: C.text,
              fontSize: 28,
              fontWeight: 500,
              letterSpacing: -0.5,
              lineHeight: 1.2,
              marginBottom: 14,
            }}
          >
            {item.name}
          </h1>

          {/* Цена */}
          <p
            style={{
              color: C.accent,
              fontSize: 24,
              fontWeight: 500,
              letterSpacing: -0.3,
              marginBottom: 0,
            }}
          >
            {fmt(item.price)}
          </p>
        </div>
      </section>

      {/* BANNER: одолжено */}
      {item.lent_to && (
        <div
          style={{
            background: C.accentLight,
            borderBottom: `1px solid ${C.border}`,
            padding: "12px 24px",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: C.accent,
              flexShrink: 0,
            }}
          />
          <p style={{ color: C.accent, fontSize: 14, fontWeight: 500 }}>
            Сейчас у {item.lent_to}
          </p>
        </div>
      )}

      {/* ОПИСАНИЕ */}
      {item.description && (
        <section
          style={{
            padding: "24px 24px 0",
            borderBottom: `1px solid ${C.border}`,
            paddingBottom: 24,
          }}
        >
          <p
            style={{
              color: C.textMid,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Описание
          </p>
          <p
            style={{
              color: C.text,
              fontSize: 15,
              lineHeight: 1.6,
            }}
          >
            {item.description}
          </p>
        </section>
      )}

      {/* ГДЕ ХРАНИТСЯ */}
      {space && (
        <section style={{ padding: "24px 24px 0", borderBottom: `1px solid ${C.border}`, paddingBottom: 24 }}>
          <p
            style={{
              color: C.textMid,
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: 1.5,
              textTransform: "uppercase",
              marginBottom: 10,
            }}
          >
            Где хранится
          </p>
          <Link
            href={`/c/space/${space.id}`}
            style={{ textDecoration: "none" }}
          >
            <div
              style={{
                background: C.surfaceAlt,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                padding: "14px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  color: C.text,
                  fontSize: 15,
                  fontWeight: 400,
                }}
              >
                {space.name}
              </p>
              <ChevronRight size={16} strokeWidth={1.5} style={{ color: C.textDim }} />
            </div>
          </Link>
        </section>
      )}

      {/* ДЕЙСТВИЯ 2×2 */}
      <section style={{ padding: "24px" }}>
        <p
          style={{
            color: C.textMid,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 14,
          }}
        >
          Действия
        </p>
        <div className="grid grid-cols-2 gap-3">
          {(
            [
              { label: "Продать", desc: "Создать объявление о продаже" },
              { label: "Одолжить", desc: "Отметить вещь как одолженную" },
              { label: "Переместить", desc: "Перенести в другое пространство" },
              { label: "Поделиться", desc: "Поделиться ссылкой на вещь" },
            ] as { label: string; desc: string }[]
          ).map(({ label, desc }) => (
            <StubButton
              key={label}
              label={label}
              description={desc}
              style={{
                width: "100%",
                padding: "14px 16px",
                background: C.surface,
                border: `1px solid ${C.border}`,
                borderRadius: 10,
                color: C.text,
                fontSize: 14,
                fontWeight: 400,
                cursor: "pointer",
                textAlign: "left" as const,
                letterSpacing: 0.1,
              }}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
