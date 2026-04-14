import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  MOCK_SPACES,
  fmt,
  spaceEmoji,
  itemColor,
  itemInitials,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

export default async function SpacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const space = MOCK_SPACES.find((s) => s.id === id) || MOCK_SPACES[0];
  const items = space.items;
  const totalValue = items.reduce((s, i) => s + i.price, 0);

  return (
    <main className="min-h-screen bg-[#FAF8F5] pb-24">
      <header className="px-6 pt-12 pb-6">
        <Link
          href="/a"
          className="text-[#8A7E76] text-sm flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={18} strokeWidth={1.5} /> Назад
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{spaceEmoji(space.type)}</span>
          <h1 className="font-light text-2xl text-[#2C2420] tracking-[0.1em] uppercase">
            {space.name}
          </h1>
        </div>
        <p className="text-[#8A7E76] text-sm">
          {items.length} предметов · {fmt(totalValue)}
        </p>
      </header>

      {/* Grid 2 колонки */}
      {items.length > 0 ? (
        <div className="px-6 grid grid-cols-2 gap-3">
          {items.map((item) => (
            <Link key={item.id} href={`/a/item/${item.id}`} className="group">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                <div
                  className="aspect-square w-full overflow-hidden relative"
                  style={{ background: itemColor(item.category) }}
                >
                  {item.photo_url ? (
                    <img
                      src={item.photo_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-3xl font-semibold text-[#8A7E76]">
                        {itemInitials(item.name)}
                      </span>
                    </div>
                  )}
                  {item.lent_to && (
                    <span className="absolute top-2 left-2 bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                      🤝
                    </span>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-[#2C2420] text-sm font-medium leading-tight line-clamp-2">
                    {item.name}
                  </p>
                  {item.price > 0 && (
                    <p className="text-[#C4956A] text-xs mt-1">{fmt(item.price)}</p>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center py-12 px-6">
          <div className="text-5xl mb-4">📷</div>
          <h2 className="font-light text-xl text-[#2C2420] tracking-wide mb-2">
            Пока пусто
          </h2>
          <p className="text-[#6B6460] text-sm text-center max-w-[240px]">
            Добавьте вещи через камеру
          </p>
        </div>
      )}

      {/* FAB stub */}
      <StubButton
        label="+"
        description="Добавить вещь в это пространство"
        className="fixed bottom-24 right-6 w-14 h-14 bg-[#C4956A] text-white rounded-full shadow-lg text-2xl flex items-center justify-center"
      />
    </main>
  );
}
