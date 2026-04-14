import Link from "next/link";
import { ArrowLeft, MapPin, Calendar, Banknote, Tag, MoveRight, HandHelping, Gift } from "lucide-react";
import { MOCK_ITEMS, MOCK_SPACES, fmt, itemColor, itemInitials } from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

const D = {
  bg: "#FAFAF7", surface: "#FFFFFF", border: "#E8E5DF",
  text: "#141410", textMid: "#6B6B65", textDim: "#AEAAA4",
  accent: "#1B6840", accentLight: "rgba(27,104,64,0.08)",
};

const MONTH_RU_FULL = [
  "января", "февраля", "марта", "апреля", "мая", "июня",
  "июля", "августа", "сентября", "октября", "ноября", "декабря",
];

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getDate()} ${MONTH_RU_FULL[d.getMonth()]} ${d.getFullYear()}`;
}

function getCondition(dateStr: string): { label: string; desc: string; color: string } {
  const ageMs = Date.now() - new Date(dateStr).getTime();
  const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365);
  if (ageYears < 1) return { label: "Отлично", desc: "Менее года", color: D.accent };
  if (ageYears < 3) return { label: "Хорошо", desc: "1–3 года", color: "#B07B3A" };
  return { label: "Нормально", desc: "Более 3 лет", color: D.textMid };
}

function getAgeStr(dateStr: string): string {
  const ageMs = Date.now() - new Date(dateStr).getTime();
  const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365);
  if (ageYears < 1) {
    const months = Math.floor(ageYears * 12);
    return months <= 1 ? "менее месяца" : `${months} мес.`;
  }
  const y = Math.floor(ageYears);
  return `${y} ${y === 1 ? "год" : y < 5 ? "года" : "лет"}`;
}

export default async function ItemPageD({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = MOCK_ITEMS.find((i) => i.id === id) || MOCK_ITEMS[0];
  const space = MOCK_SPACES.find((s) => s.id === item.space_id);
  const cond = getCondition(item.created_at);
  const ageStr = getAgeStr(item.created_at);

  return (
    <main style={{ minHeight: "100vh", background: D.bg, paddingBottom: 96 }}>

      {/* NAV */}
      <nav style={{ padding: "16px 24px 12px" }}>
        <Link
          href={space ? `/d/space/${space.id}` : "/d"}
          style={{
            color: D.textMid, display: "inline-flex", alignItems: "center",
            gap: 6, textDecoration: "none", fontSize: 13,
          }}
        >
          <ArrowLeft size={14} strokeWidth={1.5} />
          {space ? space.name : "Назад"}
        </Link>
      </nav>

      {/* HERO */}
      <section className="md:flex md:gap-0" style={{ borderBottom: `1px solid ${D.border}` }}>
        {/* Photo area */}
        <div
          className="md:w-80 md:flex-shrink-0"
          style={{
            aspectRatio: "1 / 1",
            background: itemColor(item.category),
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          {item.photo_url ? (
            <img src={item.photo_url} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <span style={{ fontSize: 56, fontWeight: 700, color: "rgba(20,20,16,0.18)", letterSpacing: -2, userSelect: "none" }}>
              {itemInitials(item.name)}
            </span>
          )}
        </div>

        {/* Info */}
        <div
          className="md:flex md:flex-col md:justify-center"
          style={{ padding: "24px 24px 28px", background: D.surface, borderLeft: `1px solid ${D.border}` }}
        >
          <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 8 }}>
            {item.category}
          </p>
          <h1 style={{ fontSize: 26, fontWeight: 600, color: D.text, letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 12 }}>
            {item.name}
          </h1>
          <p style={{ fontSize: 28, fontWeight: 300, color: D.text, letterSpacing: -1, marginBottom: 16 }}>
            {fmt(item.price)}
          </p>

          {/* Condition badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 12px", borderRadius: 20,
              background: `${cond.color}15`,
              border: `1px solid ${cond.color}30`,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: cond.color }} />
              <span style={{ fontSize: 12, fontWeight: 600, color: cond.color }}>{cond.label}</span>
            </div>
            <span style={{ fontSize: 12, color: D.textDim }}>{cond.desc}</span>
          </div>
        </div>
      </section>

      {/* LENT BANNER */}
      {item.lent_to && (
        <div style={{
          background: "rgba(176,123,58,0.08)", borderBottom: `1px solid ${D.border}`,
          padding: "12px 24px", display: "flex", alignItems: "center", gap: 10,
        }}>
          <div style={{ width: 6, height: 6, borderRadius: 3, background: "#B07B3A", flexShrink: 0 }} />
          <p style={{ color: "#8A5C2A", fontSize: 14, fontWeight: 500 }}>
            Сейчас у <strong>{item.lent_to}</strong>
          </p>
        </div>
      )}

      {/* PROVENANCE — ключевой блок */}
      <section style={{ padding: "24px", borderBottom: `1px solid ${D.border}` }}>
        <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 16 }}>
          Provenance
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <Calendar size={15} strokeWidth={1.5} style={{ color: D.textDim, marginTop: 1, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, color: D.textDim, marginBottom: 2 }}>Добавлено в коллекцию</p>
              <p style={{ fontSize: 14, color: D.text, fontWeight: 500 }}>{formatDate(item.created_at)}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <Banknote size={15} strokeWidth={1.5} style={{ color: D.textDim, marginTop: 1, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, color: D.textDim, marginBottom: 2 }}>Оценочная стоимость</p>
              <p style={{ fontSize: 14, color: D.text, fontWeight: 500 }}>{fmt(item.price)}</p>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
            <MapPin size={15} strokeWidth={1.5} style={{ color: D.textDim, marginTop: 1, flexShrink: 0 }} />
            <div>
              <p style={{ fontSize: 12, color: D.textDim, marginBottom: 2 }}>Место хранения</p>
              {space ? (
                <Link href={`/d/space/${space.id}`} style={{ textDecoration: "none" }}>
                  <p style={{ fontSize: 14, color: D.accent, fontWeight: 500 }}>{space.name} →</p>
                </Link>
              ) : (
                <p style={{ fontSize: 14, color: D.text, fontWeight: 500 }}>Неизвестно</p>
              )}
            </div>
          </div>

          <div style={{
            marginTop: 4, padding: "12px 14px", borderRadius: 10,
            background: D.accentLight, border: `1px solid rgba(27,104,64,0.12)`,
          }}>
            <p style={{ fontSize: 13, color: D.textMid, lineHeight: 1.5 }}>
              В вашей коллекции уже{" "}
              <span style={{ color: D.text, fontWeight: 600 }}>{ageStr}</span>.{" "}
              Состояние оценивается как{" "}
              <span style={{ color: cond.color, fontWeight: 600 }}>{cond.label.toLowerCase()}</span>.
            </p>
          </div>
        </div>
      </section>

      {/* DESCRIPTION */}
      {item.description && (
        <section style={{ padding: "24px", borderBottom: `1px solid ${D.border}` }}>
          <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 12 }}>
            Описание
          </p>
          <p style={{ fontSize: 15, color: D.text, lineHeight: 1.65 }}>{item.description}</p>
        </section>
      )}

      {/* ACTIONS */}
      <section style={{ padding: "24px" }}>
        <p style={{ fontSize: 10, color: D.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 14 }}>
          Действия
        </p>
        <div className="grid grid-cols-2 gap-3">
          <StubButton
            label="Продать"
            description="Создать объявление на Avito"
            icon={<Tag size={14} strokeWidth={1.5} style={{ marginRight: 8 }} />}
            style={{
              display: "flex", alignItems: "center", width: "100%",
              padding: "13px 16px", borderRadius: 10,
              background: D.accent, color: "white",
              fontSize: 14, fontWeight: 500,
            }}
          />
          <StubButton
            label="Подарить"
            description="Кому и когда?"
            icon={<Gift size={14} strokeWidth={1.5} style={{ marginRight: 8 }} />}
            style={{
              display: "flex", alignItems: "center", width: "100%",
              padding: "13px 16px", borderRadius: 10,
              background: D.surface, border: `1px solid ${D.border}`,
              color: D.text, fontSize: 14, fontWeight: 400,
            }}
          />
          <StubButton
            label="Одолжить"
            description="Укажите кому и на сколько"
            icon={<HandHelping size={14} strokeWidth={1.5} style={{ marginRight: 8 }} />}
            style={{
              display: "flex", alignItems: "center", width: "100%",
              padding: "13px 16px", borderRadius: 10,
              background: D.surface, border: `1px solid ${D.border}`,
              color: D.text, fontSize: 14, fontWeight: 400,
            }}
          />
          <StubButton
            label="Переместить"
            description="В другую коллекцию"
            icon={<MoveRight size={14} strokeWidth={1.5} style={{ marginRight: 8 }} />}
            style={{
              display: "flex", alignItems: "center", width: "100%",
              padding: "13px 16px", borderRadius: 10,
              background: D.surface, border: `1px solid ${D.border}`,
              color: D.text, fontSize: 14, fontWeight: 400,
            }}
          />
        </div>
      </section>
    </main>
  );
}
