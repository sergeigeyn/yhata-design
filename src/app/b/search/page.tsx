"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { MOCK_ITEMS, MOCK_SPACES, fmt, spaceEmoji, itemInitials } from "@/lib/mock-data";
import { PreviewBanner } from "@/components/preview-banner";

function ItemPhotoBSearch({
  item,
  size = 52,
}: {
  item: { name: string; category: string; photo_url: string | null };
  size?: number;
}) {
  if (item.photo_url)
    return (
      <img
        src={item.photo_url}
        alt={item.name}
        style={{ width: size, height: size, objectFit: "cover", borderRadius: 10, flexShrink: 0 }}
      />
    );
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 10,
        background: "#242220",
        border: "1px solid #2E2C29",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: size * 0.28, fontWeight: 700, color: "#625E58" }}>
        {itemInitials(item.name)}
      </span>
    </div>
  );
}

type Tab = "all" | "items" | "spaces";

export default function SearchPageB() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("all");

  const filteredItems = useMemo(() => {
    if (!query.trim()) return MOCK_ITEMS;
    const q = query.toLowerCase();
    return MOCK_ITEMS.filter(
      (i) =>
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        i.space_name.toLowerCase().includes(q)
    );
  }, [query]);

  const filteredSpaces = useMemo(() => {
    if (!query.trim()) return MOCK_SPACES;
    const q = query.toLowerCase();
    return MOCK_SPACES.filter((s) => s.name.toLowerCase().includes(q));
  }, [query]);

  const tabs: { id: Tab; label: string; count: number }[] = [
    { id: "all", label: "Всё", count: filteredItems.length + filteredSpaces.length },
    { id: "items", label: "Вещи", count: filteredItems.length },
    { id: "spaces", label: "Пространства", count: filteredSpaces.length },
  ];

  const showItems = activeTab === "all" || activeTab === "items";
  const showSpaces = activeTab === "all" || activeTab === "spaces";

  return (
    <div style={{ minHeight: "100vh", background: "#0F0E0D", paddingBottom: 96 }}>
      <PreviewBanner variant="b" />

      {/* HEADER */}
      <header style={{ padding: "52px 24px 16px" }}>
        <h1
          style={{
            color: "#F5F0E8",
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: -0.5,
            marginBottom: 16,
          }}
        >
          Поиск
        </h1>

        {/* INPUT */}
        <div style={{ position: "relative", marginBottom: 16 }}>
          <Search
            size={18}
            strokeWidth={1.5}
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              color: "#625E58",
              pointerEvents: "none",
            }}
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Куртка, ноутбук, кладовка..."
            style={{
              width: "100%",
              background: "#1A1917",
              border: `1px solid ${query ? "#E8A04B" : "#2E2C29"}`,
              borderRadius: 12,
              padding: "12px 40px 12px 42px",
              color: "#F5F0E8",
              fontSize: 15,
              outline: "none",
              boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{
                position: "absolute",
                right: 14,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
                display: "flex",
                alignItems: "center",
              }}
            >
              <X size={16} strokeWidth={2} style={{ color: "#625E58" }} />
            </button>
          )}
        </div>

        {/* ТАБЫ */}
        <div
          style={{
            display: "flex",
            gap: 6,
            background: "#1A1917",
            border: "1px solid #2E2C29",
            borderRadius: 12,
            padding: 4,
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: 13,
                fontWeight: 500,
                transition: "all 0.15s",
                background: activeTab === tab.id ? "#E8A04B" : "transparent",
                color: activeTab === tab.id ? "#0F0E0D" : "#625E58",
              }}
            >
              {tab.label}{" "}
              <span
                style={{
                  fontSize: 11,
                  opacity: 0.7,
                }}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </header>

      {/* VOICE STUB */}
      {!query && (
        <div style={{ padding: "0 24px 20px" }}>
          <div
            style={{
              border: "1px dashed rgba(232,160,75,0.3)",
              borderRadius: 16,
              padding: "16px 20px",
              display: "flex",
              alignItems: "center",
              gap: 12,
            }}
          >
            <span style={{ fontSize: 24 }}>🎙️</span>
            <div>
              <p style={{ color: "#9C978F", fontSize: 14, marginBottom: 2 }}>
                Голосовой поиск
              </p>
              <p style={{ color: "#625E58", fontSize: 12 }}>
                Скоро можно будет искать голосом
              </p>
            </div>
          </div>
        </div>
      )}

      {/* РЕЗУЛЬТАТЫ */}
      <div style={{ padding: "0 24px" }}>
        {/* ВЕЩИ */}
        {showItems && filteredItems.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            {activeTab === "all" && (
              <p
                style={{
                  color: "#625E58",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 10,
                }}
              >
                Вещи ({filteredItems.length})
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredItems.map((item) => (
                <Link
                  key={item.id}
                  href={`/b/item/${item.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <div
                    style={{
                      background: "#1A1917",
                      border: "1px solid #2E2C29",
                      borderRadius: 14,
                      padding: "12px 14px",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <ItemPhotoBSearch item={item} size={52} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          color: "#F5F0E8",
                          fontSize: 14,
                          fontWeight: 500,
                          marginBottom: 2,
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </p>
                      <p style={{ color: "#625E58", fontSize: 12 }}>
                        {item.space_name} · {item.category}
                      </p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <p style={{ color: "#E8A04B", fontSize: 13, fontWeight: 600 }}>
                        {fmt(item.price)}
                      </p>
                      {item.lent_to && (
                        <p style={{ color: "#E8A04B", fontSize: 10, marginTop: 2 }}>
                          одолжено
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* ПРОСТРАНСТВА */}
        {showSpaces && filteredSpaces.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            {activeTab === "all" && (
              <p
                style={{
                  color: "#625E58",
                  fontSize: 11,
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  marginBottom: 10,
                }}
              >
                Пространства ({filteredSpaces.length})
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredSpaces.map((space) => {
                const totalValue = space.items.reduce((sum, i) => sum + i.price, 0);
                return (
                  <Link
                    key={space.id}
                    href={`/b/space/${space.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        background: "#1A1917",
                        border: "1px solid #2E2C29",
                        borderRadius: 14,
                        padding: "14px 16px",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                      }}
                    >
                      <div
                        style={{
                          width: 44,
                          height: 44,
                          background: "#242220",
                          borderRadius: 10,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 22,
                          flexShrink: 0,
                        }}
                      >
                        {spaceEmoji(space.type)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <p
                          style={{ color: "#F5F0E8", fontSize: 14, fontWeight: 500, marginBottom: 2 }}
                        >
                          {space.name}
                        </p>
                        <p style={{ color: "#625E58", fontSize: 12 }}>
                          {space.items.length} вещей · {fmt(totalValue)}
                        </p>
                      </div>
                      <span style={{ color: "#625E58" }}>→</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* ПУСТО */}
        {query &&
          filteredItems.length === 0 &&
          (activeTab === "all" || activeTab === "items") &&
          filteredSpaces.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0" }}>
              <p style={{ fontSize: 40, marginBottom: 12 }}>🔍</p>
              <p style={{ color: "#9C978F", fontSize: 16, marginBottom: 6 }}>
                Ничего не найдено
              </p>
              <p style={{ color: "#625E58", fontSize: 13 }}>
                Попробуйте другой запрос
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
