import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  MOCK_SPACES,
  MOCK_ITEMS,
  TOTAL_VALUE,
  TOTAL_ITEMS,
  OLD_ITEMS,
  OLD_VALUE,
  fmt,
  spaceEmoji,
} from "@/lib/mock-data";
import { StubButton } from "@/components/stub-toast";

export default function AnalyticsA() {
  // По категориям
  const byCategory = MOCK_ITEMS.reduce(
    (acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.price;
      return acc;
    },
    {} as Record<string, number>
  );
  const categories = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  const maxCatValue = categories[0]?.[1] || 1;

  // По пространствам
  const spaceData = MOCK_SPACES.map((s) => ({
    ...s,
    value: s.items.reduce((sum, i) => sum + i.price, 0),
    count: s.items.length,
  })).sort((a, b) => b.value - a.value);
  const maxSpaceValue = spaceData[0]?.value || 1;

  const estimatedM2 = Math.round(TOTAL_ITEMS * 0.08);

  // Donut chart SVG
  const colors = ["#C4956A", "#8B9E7E", "#D4A86A", "#C47D6D", "#7D9EB2", "#A67B52"];
  let startAngle = 0;
  const total = categories.reduce((s, [, v]) => s + v, 0);
  const slices = categories.slice(0, 5).map(([cat, val], i) => {
    const pct = val / total;
    const angle = pct * 360;
    const s = startAngle;
    startAngle += angle;
    return { cat, val, pct, startAngle: s, angle, color: colors[i] };
  });

  function polarToXY(angle: number, r: number) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return { x: 80 + r * Math.cos(rad), y: 80 + r * Math.sin(rad) };
  }

  function slicePath(
    start: number,
    end: number,
    outerR: number,
    innerR: number
  ) {
    const s1 = polarToXY(start, outerR);
    const e1 = polarToXY(end, outerR);
    const s2 = polarToXY(end, innerR);
    const e2 = polarToXY(start, innerR);
    const large = end - start > 180 ? 1 : 0;
    return `M ${s1.x} ${s1.y} A ${outerR} ${outerR} 0 ${large} 1 ${e1.x} ${e1.y} L ${s2.x} ${s2.y} A ${innerR} ${innerR} 0 ${large} 0 ${e2.x} ${e2.y} Z`;
  }

  return (
    <main className="min-h-screen bg-[#FAF8F5] pb-24">
      <header className="px-6 pt-12 pb-6">
        <Link
          href="/a"
          className="text-[#8A7E76] text-sm flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={18} strokeWidth={1.5} /> Назад
        </Link>
        <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-1">Обзор</p>
        <h1 className="font-light text-3xl text-[#2C2420] tracking-[0.1em] uppercase">
          Аналитика
        </h1>
      </header>

      {/* Hero number */}
      <section className="px-6 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-2">
            Общая стоимость
          </p>
          <p className="font-light text-5xl text-[#2C2420] mb-1">
            {fmt(TOTAL_VALUE)}
          </p>
          <p className="text-[#8A7E76] text-sm">
            {TOTAL_ITEMS} предметов в {MOCK_SPACES.length} пространствах
          </p>
        </div>
      </section>

      {/* Donut chart */}
      <section className="px-6 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-4">
            По категориям
          </p>
          <div className="flex items-center gap-6">
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              className="flex-shrink-0"
            >
              {slices.map((s, i) => (
                <path
                  key={i}
                  d={slicePath(s.startAngle, s.startAngle + s.angle, 72, 46)}
                  fill={s.color}
                  opacity={0.9}
                />
              ))}
              <text
                x="80"
                y="76"
                textAnchor="middle"
                fontSize="11"
                fill="#8A7E76"
              >
                всего
              </text>
              <text
                x="80"
                y="92"
                textAnchor="middle"
                fontSize="13"
                fontWeight="500"
                fill="#2C2420"
              >
                {TOTAL_ITEMS}
              </text>
            </svg>
            <div className="space-y-2.5 flex-1">
              {slices.map((s, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ background: s.color }}
                  />
                  <span className="text-xs text-[#6B6460] flex-1">{s.cat}</span>
                  <span className="text-xs text-[#2C2420] font-medium">
                    {Math.round(s.pct * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* По категориям — бар-чарт */}
      <section className="px-6 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-4">
            Стоимость по категориям
          </p>
          <div className="space-y-3">
            {categories.map(([cat, val]) => (
              <div key={cat}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-[#2C2420]">{cat}</span>
                  <span className="text-xs text-[#8A7E76]">{fmt(val)}</span>
                </div>
                <div className="h-1.5 bg-[#F3EDE7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C4956A] rounded-full"
                    style={{ width: `${(val / maxCatValue) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Мёртвый груз */}
      <section className="px-6 mb-5">
        <div className="bg-[#F3EDE7] rounded-2xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">💤</span>
            <div>
              <p className="text-[#2C2420] text-sm font-medium">
                Давно не трогали
              </p>
              <p className="text-[#8A7E76] text-xs">
                Вещи старше 6 месяцев · {fmt(OLD_VALUE)}
              </p>
            </div>
          </div>
          <p className="text-[#6B6460] text-sm mb-3">
            <span className="font-semibold text-[#2C2420]">
              {OLD_ITEMS.length} вещей
            </span>{" "}
            лежат без движения. Можно продать или отдать.
          </p>
          <StubButton
            label="Найти и разобрать"
            description="AI подберёт лучший способ: продажа, дарение или утилизация"
            className="w-full bg-[#C4956A] text-white rounded-xl py-2.5 text-sm font-medium"
          />
        </div>
      </section>

      {/* Занимаемое место */}
      <section className="px-6 mb-5">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-3">
            Занимаемое место
          </p>
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-4xl font-light text-[#2C2420]">
              ~{estimatedM2}
            </span>
            <span className="text-[#8A7E76]">м²</span>
          </div>
          <p className="text-[#8A7E76] text-xs">
            Оценка на основе категорий и количества вещей
          </p>
        </div>
      </section>

      {/* Топ пространств */}
      <section className="px-6">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <p className="text-xs uppercase tracking-[0.2em] text-[#8A7E76] mb-4">
            Топ пространств
          </p>
          <div className="space-y-4">
            {spaceData.map((s) => (
              <div key={s.id}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm text-[#2C2420]">
                    {spaceEmoji(s.type)} {s.name}
                  </span>
                  <span className="text-xs text-[#8A7E76]">{fmt(s.value)}</span>
                </div>
                <div className="h-1.5 bg-[#F3EDE7] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#C4956A] rounded-full"
                    style={{
                      width: `${(s.value / maxSpaceValue) * 100}%`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
