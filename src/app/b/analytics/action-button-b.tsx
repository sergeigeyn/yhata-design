"use client";

import { useState } from "react";

export function SellActionBtn({
  label,
  description,
}: {
  label: string;
  description: string;
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
          padding: "12px 16px",
          borderRadius: 12,
          background: "#E8A04B",
          color: "#0F0E0D",
          fontWeight: 600,
          fontSize: 14,
          border: "none",
          cursor: "pointer",
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
