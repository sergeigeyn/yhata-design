import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  MOCK_ITEMS,
  MOCK_SPACES,
  fmt,
  spaceEmoji,
  itemColor,
  itemInitials,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = MOCK_ITEMS.find((i) => i.id === id) || MOCK_ITEMS[0];
  const space = MOCK_SPACES.find((s) => s.id === item.space_id);

  return (
    <main className="min-h-screen bg-[#FAF8F5] pb-24">
      <header className="px-6 pt-12 pb-4 flex justify-between items-center">
        <Link
          href={`/a/space/${item.space_id}`}
          className="flex items-center gap-2 text-[#8A7E76] text-sm"
        >
          <ArrowLeft size={18} strokeWidth={1.5} /> {space?.name || "Назад"}
        </Link>
      </header>

      {/* Большое фото */}
      <div
        className="mx-6 rounded-2xl overflow-hidden mb-6 aspect-square max-h-80 flex items-center justify-center"
        style={{ background: itemColor(item.category) }}
      >
        {item.photo_url ? (
          <img
            src={item.photo_url}
            alt={item.name}
            className="w-full h-full object-contain"
          />
        ) : (
          <span className="text-6xl font-bold text-[#8A7E76]">
            {itemInitials(item.name)}
          </span>
        )}
      </div>

      <div className="px-6 space-y-4">
        <h1 className="font-light text-2xl text-[#2C2420] tracking-[0.05em]">
          {item.name}
        </h1>
        <p className="text-[#6B6460] text-sm leading-relaxed">{item.description}</p>
        {item.price > 0 && (
          <p className="text-[#C4956A] text-2xl font-light">{fmt(item.price)}</p>
        )}

        {item.lent_to && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-center gap-3">
            <span>🤝</span>
            <p className="text-amber-800 text-sm">
              Одолжено → <strong>{item.lent_to}</strong>
            </p>
          </div>
        )}

        {/* Где лежит */}
        <div className="bg-[#F3EDE7] rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-xl">{spaceEmoji(space?.type || "other")}</span>
          <div>
            <p className="text-[#8A7E76] text-xs uppercase tracking-wider">
              Где лежит
            </p>
            <p className="text-[#2C2420] text-sm font-medium">{space?.name}</p>
          </div>
        </div>

        {/* Actions grid 2x2 */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <StubButton
            label="Продать"
            description="AI сгенерирует объявление для Avito"
            className="bg-[#C4956A] text-white rounded-xl p-4 text-sm font-medium w-full"
          />
          <StubButton
            label="🎁 Подарить"
            description="Выберите кому подарить или отдать"
            className="bg-[#F3EDE7] text-[#2C2420] rounded-xl p-4 text-sm font-medium w-full"
          />
          <StubButton
            label="🤝 Одолжить"
            description="Укажите кому и на какой срок"
            className="border border-[#E8E2DB] text-[#6B6460] rounded-xl p-3 text-sm w-full"
          />
          <StubButton
            label="📦 Переместить"
            description="Перенести в другое пространство"
            className="border border-[#E8E2DB] text-[#6B6460] rounded-xl p-3 text-sm w-full"
          />
        </div>
      </div>
    </main>
  );
}
