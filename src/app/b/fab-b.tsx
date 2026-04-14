"use client";

import { useState } from "react";

export function FabB() {
  const [show, setShow] = useState(false);
  return (
    <>
      <button
        onClick={() => {
          setShow(true);
          setTimeout(() => setShow(false), 2500);
        }}
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          width: 56,
          height: 56,
          borderRadius: 28,
          background: "#E8A04B",
          color: "#0F0E0D",
          fontSize: 28,
          boxShadow: "0 8px 24px rgba(232,160,75,0.35)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          lineHeight: 1,
          zIndex: 40,
        }}
      >
        +
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
          <p style={{ fontWeight: 500, marginBottom: 2 }}>Добавить вещь</p>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12 }}>
            Функция в разработке — заглушка для preview
          </p>
        </div>
      )}
    </>
  );
}
