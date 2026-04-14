"use client";

import { useState } from "react";

function ActionBtn({
  label,
  description,
  primary = false,
  accent = false,
}: {
  label: string;
  description: string;
  primary?: boolean;
  accent?: boolean;
}) {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setShow(true);
          setTimeout(() => setShow(false), 2500);
        }}
        style={{
          width: "100%",
          padding: primary ? 16 : 14,
          borderRadius: 12,
          fontSize: primary ? 15 : 14,
          fontWeight: primary || accent ? 600 : 400,
          cursor: "pointer",
          border: primary
            ? "none"
            : accent
            ? "1px solid #E8A04B"
            : "1px solid #2E2C29",
          background: primary ? "#E8A04B" : "transparent",
          color: primary ? "#0F0E0D" : accent ? "#E8A04B" : "#9C978F",
        }}
      >
        {label}
      </button>
      {show && (
        <div
          style={{
            position: "fixed",
            bottom: 96,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 50,
            background: "rgba(0,0,0,0.9)",
            color: "#F5F0E8",
            fontSize: 14,
            padding: "12px 20px",
            borderRadius: 16,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
            maxWidth: 280,
            textAlign: "center",
          }}
        >
          <p style={{ fontWeight: 500, marginBottom: 2 }}>{label}</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>{description}</p>
        </div>
      )}
    </>
  );
}

export function ItemActionsB({ itemName }: { itemName: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {/* Продать — полная ширина */}
      <ActionBtn
        label="Продать"
        description={`Создадим объявление для «${itemName}»`}
        primary
      />
      {/* Остальные 3 — grid 2 колонки */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
        <ActionBtn
          label="🎁 Подарить"
          description="Оформить как подарок"
          accent
        />
        <ActionBtn
          label="🤝 Одолжить"
          description="Записать кому одолжено"
        />
        <ActionBtn
          label="📦 Переместить"
          description="Перенести в другое пространство"
        />
        <ActionBtn
          label="✏️ Редактировать"
          description="Изменить данные о вещи"
        />
      </div>
    </div>
  );
}
