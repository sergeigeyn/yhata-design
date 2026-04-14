"use client";
import { useState } from "react";
import { Search, Camera, Sparkles } from "lucide-react";
import Link from "next/link";
import { MOCK_ITEMS, fmt, itemColor, itemInitials } from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";
import { PreviewBanner } from "@/components/preview-banner";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [tab, setTab] = useState<"text" | "nlp" | "photo">("text");

  const results =
    query.length > 1
      ? MOCK_ITEMS.filter(
          (i) =>
            i.name.toLowerCase().includes(query.toLowerCase()) ||
            i.description.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  return (
    <>
      <PreviewBanner variant="a" />
      <main className="min-h-screen bg-[#FAF8F5] pb-24 pt-9">
        <div className="px-6 pt-8 pb-6">
          <Link
            href="/a"
            className="text-[#8A7E76] text-sm flex items-center gap-2 mb-6"
          >
            ← Назад
          </Link>
          <h1 className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-4">
            ПОИСК
          </h1>

          {/* Search input */}
          <div className="relative mb-4">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7E76]"
              strokeWidth={1.5}
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Найти вещь..."
              className="w-full bg-white border border-[#E8E2DB] rounded-xl pl-11 pr-4 py-3.5 text-[#2C2420] text-sm outline-none focus:border-[#C4956A] placeholder:text-[#8A7E76]"
            />
          </div>

          {/* Tabs */}
          <div className="flex gap-1 bg-white rounded-xl p-1 border border-[#E8E2DB] mb-6">
            {[
              { id: "text", label: "Текст", icon: <Search size={14} /> },
              { id: "nlp", label: "По смыслу", icon: <Sparkles size={14} /> },
              { id: "photo", label: "По фото", icon: <Camera size={14} /> },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id as typeof tab)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
                  tab === t.id ? "bg-[#C4956A] text-white" : "text-[#8A7E76]"
                }`}
              >
                {t.icon}
                {t.label}
              </button>
            ))}
          </div>

          {/* Voice stub */}
          <StubButton
            label="🎙 Голосовой поиск"
            description="Скажите что ищете — AI найдёт"
            className="w-full border border-dashed border-[#E8E2DB] rounded-xl py-3 text-sm text-[#8A7E76] mb-6"
          />
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="px-6 space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-3">
              {results.length} результатов
            </p>
            {results.map((item) => (
              <Link
                key={item.id}
                href={`/a/item/${item.id}`}
                className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-3"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: itemColor(item.category) }}
                >
                  <span className="text-xs font-bold text-[#8A7E76]">
                    {itemInitials(item.name)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#2C2420] text-sm font-medium truncate">
                    {item.name}
                  </p>
                  <p className="text-[#8A7E76] text-xs">{item.space_name}</p>
                </div>
                <p className="text-[#C4956A] text-sm flex-shrink-0">
                  {fmt(item.price)}
                </p>
              </Link>
            ))}
          </div>
        ) : query.length > 0 ? (
          <div className="text-center py-12 px-6">
            <p className="text-4xl mb-3">🔍</p>
            <p className="text-[#2C2420] text-base font-medium mb-1">
              Ничего не нашли
            </p>
            <p className="text-[#8A7E76] text-sm">
              Попробуйте другой запрос или режим поиска
            </p>
          </div>
        ) : (
          <div className="px-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-3">
              Все вещи
            </p>
            <div className="space-y-2">
              {MOCK_ITEMS.slice(0, 8).map((item) => (
                <Link
                  key={item.id}
                  href={`/a/item/${item.id}`}
                  className="flex items-center gap-3 bg-white rounded-xl shadow-sm p-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: itemColor(item.category) }}
                  >
                    <span className="text-xs font-bold text-[#8A7E76]">
                      {itemInitials(item.name)}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#2C2420] text-sm font-medium truncate">
                      {item.name}
                    </p>
                    <p className="text-[#8A7E76] text-xs">
                      {item.space_name} · {item.category}
                    </p>
                  </div>
                  <p className="text-[#C4956A] text-xs">{fmt(item.price)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
