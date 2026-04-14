"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { MOCK_ITEMS, fmt, itemColor, itemInitials } from "@/lib/mock-data";

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

const ALL_CATEGORIES = ["Все", ...Array.from(new Set(MOCK_ITEMS.map((i) => i.category)))];

export default function SearchPageC() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Все");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MOCK_ITEMS.filter((item) => {
      const matchCat = activeCategory === "Все" || item.category === activeCategory;
      const matchQ =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.space_name.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  }, [query, activeCategory]);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: 96 }}>
      {/* ПОИСКОВАЯ СТРОКА */}
      <header
        style={{
          background: C.surface,
          borderBottom: `1px solid ${C.border}`,
          padding: "20px 24px 0",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        {/* Заголовок */}
        <p
          style={{
            color: C.textDim,
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: 1.5,
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          Поиск
        </p>

        {/* Input — только нижняя граница */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            borderBottom: `1px solid ${query ? C.accent : C.border}`,
            paddingBottom: 12,
            marginBottom: 0,
            transition: "border-color 0.15s",
          }}
        >
          <Search size={16} strokeWidth={1.5} style={{ color: C.textDim, flexShrink: 0 }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Найти вещь..."
            autoFocus
            style={{
              flex: 1,
              background: "transparent",
              border: "none",
              outline: "none",
              color: C.text,
              fontSize: 18,
              fontWeight: 400,
              letterSpacing: -0.2,
              padding: 0,
            }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: C.textDim,
                fontSize: 18,
                lineHeight: 1,
                padding: "0 2px",
                flexShrink: 0,
              }}
            >
              ×
            </button>
          )}
        </div>

        {/* Категории — горизонтальный скролл таблеток */}
        <div
          style={{
            display: "flex",
            gap: 6,
            overflowX: "auto",
            padding: "14px 0 14px",
            scrollbarWidth: "none",
          }}
        >
          {ALL_CATEGORIES.map((cat) => {
            const isActive = cat === activeCategory;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  flexShrink: 0,
                  padding: "6px 14px",
                  borderRadius: 20,
                  border: `1px solid ${isActive ? C.accent : C.border}`,
                  background: isActive ? C.accentLight : "transparent",
                  color: isActive ? C.accent : C.textMid,
                  fontSize: 13,
                  fontWeight: isActive ? 500 : 400,
                  cursor: "pointer",
                  letterSpacing: 0.1,
                  transition: "all 0.12s",
                  whiteSpace: "nowrap",
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </header>

      {/* РЕЗУЛЬТАТЫ */}
      <div style={{ padding: "8px 0" }}>
        {filtered.length > 0 ? (
          <>
            {/* Счётчик */}
            <p
              style={{
                color: C.textDim,
                fontSize: 12,
                padding: "8px 24px 4px",
                letterSpacing: 0.2,
              }}
            >
              {filtered.length} {filtered.length === 1 ? "результат" : filtered.length < 5 ? "результата" : "результатов"}
            </p>

            {/* List view */}
            <div>
              {filtered.map((item, idx) => (
                <Link
                  key={item.id}
                  href={`/c/item/${item.id}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "12px 24px",
                      borderBottom: `1px solid ${C.border}`,
                      background: C.surface,
                      cursor: "pointer",
                    }}
                  >
                    {/* Цветной квадрат 48×48 */}
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        background: itemColor(item.category),
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "rgba(13,13,13,0.3)",
                          userSelect: "none",
                        }}
                      >
                        {itemInitials(item.name)}
                      </span>
                    </div>

                    {/* Название + пространство */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          color: C.text,
                          fontSize: 14,
                          fontWeight: 400,
                          lineHeight: 1.3,
                          marginBottom: 3,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </p>
                      <p style={{ color: C.textDim, fontSize: 12 }}>
                        {item.space_name}
                        {item.lent_to && (
                          <span style={{ color: C.accent }}> · у {item.lent_to}</span>
                        )}
                      </p>
                    </div>

                    {/* Цена */}
                    <p
                      style={{
                        color: C.accent,
                        fontSize: 13,
                        fontWeight: 500,
                        flexShrink: 0,
                        letterSpacing: 0.1,
                      }}
                    >
                      {fmt(item.price)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div
            style={{
              textAlign: "center",
              padding: "80px 24px",
              color: C.textDim,
            }}
          >
            <p style={{ fontSize: 32, marginBottom: 12 }}>—</p>
            <p style={{ fontSize: 15, fontWeight: 400, color: C.textMid, marginBottom: 6 }}>
              Ничего не найдено
            </p>
            <p style={{ fontSize: 13 }}>
              Попробуйте другой запрос или категорию
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
