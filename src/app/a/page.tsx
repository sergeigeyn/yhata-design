import Link from "next/link";
import { Search, Settings } from "lucide-react";
import {
  MOCK_SPACES,
  MOCK_ITEMS,
  TOTAL_VALUE,
  TOTAL_ITEMS,
  LENT_ITEMS,
  fmt,
  spaceEmoji,
  itemColor,
  itemInitials,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

function ItemPhoto({
  item,
  size = 80,
}: {
  item: { name: string; category: string; photo_url: string | null };
  size?: number;
}) {
  if (item.photo_url)
    return (
      <img
        src={item.photo_url}
        alt={item.name}
        style={{ width: size, height: size, objectFit: "cover", borderRadius: 12 }}
      />
    );
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 12,
        background: itemColor(item.category),
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          fontSize: size * 0.28,
          fontWeight: 600,
          color: "#8A7E76",
          letterSpacing: -0.5,
        }}
      >
        {itemInitials(item.name)}
      </span>
    </div>
  );
}

export default function DashboardA() {
  const recentItems = [...MOCK_ITEMS]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  const spaceData = MOCK_SPACES.map((s) => ({
    ...s,
    value: s.items.reduce((sum, i) => sum + i.price, 0),
  })).sort((a, b) => b.value - a.value);

  const top5Spaces = spaceData.slice(0, 5);
  const maxSpaceValue = top5Spaces[0]?.value || 1;

  return (
    <main className="min-h-screen bg-[#FAF8F5] pb-24">
      {/* HEADER */}
      <header className="px-6 pt-10 pb-6">
        <div className="flex items-center justify-between mb-5">
          <span className="font-light text-2xl tracking-[0.3em] text-[#2C2420] uppercase">
            YHATA
          </span>
          <div className="flex gap-4">
            <Link href="/a/search">
              <Search size={20} strokeWidth={1.5} className="text-[#8A7E76]" />
            </Link>
            <StubButton
              label=""
              icon={<Settings size={20} strokeWidth={1.5} className="text-[#8A7E76]" />}
              description="Настройки профиля"
              className="flex items-center"
            />
          </div>
        </div>
        <p className="text-[#8A7E76] text-sm mb-1">Привет, Сергей</p>
      </header>

      {/* HERO STATS */}
      <section className="px-6 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-4">
            Ваше имущество
          </p>
          <div className="flex">
            <div className="flex-1 text-center">
              <p className="text-2xl font-medium text-[#2C2420]">{TOTAL_ITEMS}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A7E76] mt-1">
                Предметов
              </p>
            </div>
            <div className="w-px bg-[#E8E2DB]" />
            <div className="flex-1 text-center">
              <p className="text-2xl font-medium text-[#2C2420]">{fmt(TOTAL_VALUE)}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A7E76] mt-1">
                Стоимость
              </p>
            </div>
            <div className="w-px bg-[#E8E2DB]" />
            <div className="flex-1 text-center">
              <p className="text-2xl font-medium text-[#2C2420]">{MOCK_SPACES.length}</p>
              <p className="text-xs uppercase tracking-[0.15em] text-[#8A7E76] mt-1">
                Пространств
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* АНАЛИТИКА — бар-чарт топ-5 пространств */}
      <section className="px-6 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex justify-between items-center mb-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76]">По пространствам</p>
            <Link href="/a/analytics" className="text-[#C4956A] text-xs">
              Аналитика →
            </Link>
          </div>
          <div className="space-y-3">
            {top5Spaces.map((s) => (
              <div key={s.id}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-[#2C2420]">{s.name}</span>
                  <span className="text-xs text-[#8A7E76]">{fmt(s.value)}</span>
                </div>
                <div className="h-1.5 bg-[#F3EDE7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C4956A] rounded-full"
                    style={{ width: `${(s.value / maxSpaceValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ОДОЛЖЕННЫЕ */}
      {LENT_ITEMS.length > 0 && (
        <section className="px-6 mb-5">
          <Link
            href="/a/search"
            className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3"
          >
            <span className="text-xl">🤝</span>
            <p className="text-amber-800 text-sm font-medium flex-1">
              {LENT_ITEMS.length} вещи одолжено
            </p>
            <span className="text-amber-400 text-sm">→</span>
          </Link>
        </section>
      )}

      {/* ПОСЛЕДНИЕ ДОБАВЛЕННЫЕ — горизонт. скролл */}
      <section className="mb-5">
        <div className="px-6 flex justify-between items-center mb-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76]">Последние</p>
        </div>
        <div className="flex gap-3 px-6 overflow-x-auto pb-2 no-scrollbar">
          {recentItems.map((item) => (
            <Link
              key={item.id}
              href={`/a/item/${item.id}`}
              className="flex-shrink-0 w-[120px]"
            >
              <ItemPhoto item={item} size={120} />
              <p className="text-xs text-[#2C2420] mt-2 line-clamp-2 leading-tight">
                {item.name}
              </p>
              {item.price > 0 && (
                <p className="text-xs text-[#C4956A] mt-0.5">{fmt(item.price)}</p>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* ПРОСТРАНСТВА */}
      <section className="px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-3">Пространства</p>
        <div className="space-y-2">
          {MOCK_SPACES.map((space) => {
            const spaceValue = space.items.reduce((s, i) => s + i.price, 0);
            return (
              <Link key={space.id} href={`/a/space/${space.id}`}>
                <div className="bg-white rounded-2xl shadow-sm px-4 py-3 flex items-center gap-3">
                  <span className="text-2xl">{spaceEmoji(space.type)}</span>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#2C2420]">{space.name}</p>
                    <p className="text-xs text-[#8A7E76]">
                      {space.items.length} · {fmt(spaceValue)}
                    </p>
                  </div>
                  <span className="text-[#8A7E76]">→</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* FAB */}
      <StubButton
        label="+"
        description="Добавить вещь через камеру"
        className="fixed bottom-6 right-6 w-14 h-14 bg-[#C4956A] text-white rounded-full shadow-lg text-2xl flex items-center justify-center"
      />
    </main>
  );
}
