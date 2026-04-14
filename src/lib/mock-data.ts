export type Space = {
  id: string;
  name: string;
  type: "box" | "closet" | "room" | "cell" | "other";
  items: Item[];
};

export type Item = {
  id: string;
  name: string;
  description: string;
  price: number;
  space_id: string;
  space_name: string;
  photo_url: string | null;
  created_at: string;
  lent_to: string | null;
  category: string;
};

export const MOCK_ITEMS: Item[] = [
  { id: "1", name: "Куртка зимняя The North Face", description: "Пуховик, чёрный, размер L. Куплена в 2022 году.", price: 18500, space_id: "1", space_name: "Гардеробная", photo_url: null, created_at: "2024-10-15", lent_to: null, category: "Одежда" },
  { id: "2", name: "Кроссовки Nike Air Max 90", description: "Белые, размер 42. Почти новые.", price: 9800, space_id: "1", space_name: "Гардеробная", photo_url: null, created_at: "2024-11-02", lent_to: null, category: "Обувь" },
  { id: "3", name: "Джинсы Levi's 501", description: "Синие, размер 32/32.", price: 6500, space_id: "1", space_name: "Гардеробная", photo_url: null, created_at: "2023-09-20", lent_to: null, category: "Одежда" },
  { id: "4", name: "Свитер шерстяной", description: "Бежевый, размер M. Merino wool.", price: 4200, space_id: "1", space_name: "Гардеробная", photo_url: null, created_at: "2023-11-10", lent_to: "Саша", category: "Одежда" },
  { id: "5", name: "Пальто серое", description: "Классическое пальто, размер L.", price: 12000, space_id: "1", space_name: "Гардеробная", photo_url: null, created_at: "2023-01-05", lent_to: null, category: "Одежда" },
  { id: "6", name: "Кеды Converse белые", description: "Классика, размер 41.", price: 3500, space_id: "1", space_name: "Гардеробная", photo_url: null, created_at: "2022-06-15", lent_to: null, category: "Обувь" },

  { id: "7", name: "MacBook Pro 14\" M3", description: "Space Black, 16GB RAM, 512GB SSD.", price: 189000, space_id: "2", space_name: "Кабинет", photo_url: null, created_at: "2024-12-01", lent_to: null, category: "Техника" },
  { id: "8", name: "Монитор LG 27\" 4K", description: "IPS, 27 дюймов, 4K UHD.", price: 42000, space_id: "2", space_name: "Кабинет", photo_url: null, created_at: "2024-08-15", lent_to: null, category: "Техника" },
  { id: "9", name: "Клавиатура Keychron K2", description: "Механическая, Brown switches.", price: 8900, space_id: "2", space_name: "Кабинет", photo_url: null, created_at: "2023-05-20", lent_to: null, category: "Техника" },
  { id: "10", name: "Наушники Sony WH-1000XM5", description: "Беспроводные, шумоподавление.", price: 28000, space_id: "2", space_name: "Кабинет", photo_url: null, created_at: "2023-12-25", lent_to: null, category: "Техника" },

  { id: "11", name: "Велосипед Trek Marlin 5", description: "Горный, 29\", серебристый.", price: 45000, space_id: "3", space_name: "Кладовка", photo_url: null, created_at: "2022-04-10", lent_to: null, category: "Спорт" },
  { id: "12", name: "Лыжи Fischer 170 см", description: "Горные лыжи с креплениями.", price: 22000, space_id: "3", space_name: "Кладовка", photo_url: null, created_at: "2022-12-01", lent_to: null, category: "Спорт" },
  { id: "13", name: "Палатка туристическая", description: "2-местная, 3 сезона, синяя.", price: 8500, space_id: "3", space_name: "Кладовка", photo_url: null, created_at: "2021-07-15", lent_to: null, category: "Спорт" },
  { id: "14", name: "Рюкзак Osprey 50L", description: "Туристический, оранжевый.", price: 12000, space_id: "3", space_name: "Кладовка", photo_url: null, created_at: "2021-08-20", lent_to: null, category: "Спорт" },
  { id: "15", name: "Коврик для йоги Manduka", description: "PRO, чёрный, 6мм.", price: 5500, space_id: "3", space_name: "Кладовка", photo_url: null, created_at: "2023-03-10", lent_to: null, category: "Спорт" },

  { id: "16", name: "Кофемашина DeLonghi", description: "Эспрессо, автоматическая, серебристая.", price: 32000, space_id: "4", space_name: "Кухня", photo_url: null, created_at: "2024-01-15", lent_to: null, category: "Кухня" },
  { id: "17", name: "Блендер Vitamix", description: "Профессиональный, 2л, чёрный.", price: 24000, space_id: "4", space_name: "Кухня", photo_url: null, created_at: "2023-09-05", lent_to: null, category: "Кухня" },
  { id: "18", name: "Набор ножей Wüsthof", description: "7 предметов, немецкая сталь.", price: 18000, space_id: "4", space_name: "Кухня", photo_url: null, created_at: "2022-03-20", lent_to: null, category: "Кухня" },
  { id: "19", name: "Чугунная сковорода Lodge", description: "28 см, предсезонированная.", price: 4200, space_id: "4", space_name: "Кухня", photo_url: null, created_at: "2022-11-10", lent_to: null, category: "Кухня" },

  { id: "20", name: "Фотоаппарат Sony A7 III", description: "Полнокадровый, 24.2 МП.", price: 135000, space_id: "5", space_name: "Коробка с техникой", photo_url: null, created_at: "2023-06-15", lent_to: null, category: "Техника" },
  { id: "21", name: "Объектив 35mm f/1.4", description: "Sigma Art, полный кадр.", price: 62000, space_id: "5", space_name: "Коробка с техникой", photo_url: null, created_at: "2023-07-20", lent_to: null, category: "Техника" },
  { id: "22", name: "iPad Air 5", description: "256GB, Space Gray, WiFi.", price: 68000, space_id: "5", space_name: "Коробка с техникой", photo_url: null, created_at: "2022-10-15", lent_to: "Катя", category: "Техника" },
  { id: "23", name: "DJI Mini 3 Pro", description: "Дрон, комплект с зарядкой.", price: 89000, space_id: "5", space_name: "Коробка с техникой", photo_url: null, created_at: "2024-05-01", lent_to: null, category: "Техника" },

  { id: "24", name: "Книги по дизайну (15 шт)", description: "Коллекция книг о UI/UX и брендинге.", price: 12000, space_id: "2", space_name: "Кабинет", photo_url: null, created_at: "2021-04-01", lent_to: null, category: "Другое" },
  { id: "25", name: "Гитара акустическая Yamaha", description: "FG800, натуральный цвет.", price: 18000, space_id: "3", space_name: "Кладовка", photo_url: null, created_at: "2020-12-15", lent_to: null, category: "Другое" },
  { id: "26", name: "Самокат Xiaomi Electric", description: "Электросамокат, чёрный.", price: 22000, space_id: "3", space_name: "Кладовка", photo_url: null, created_at: "2021-05-20", lent_to: null, category: "Другое" },
  { id: "27", name: "Настольная лампа Anglepoise", description: "Белая, регулируемая яркость.", price: 8500, space_id: "2", space_name: "Кабинет", photo_url: null, created_at: "2023-02-14", lent_to: null, category: "Другое" },
  { id: "28", name: "Умные часы Apple Watch Ultra", description: "49mm, Titanium.", price: 72000, space_id: "2", space_name: "Кабинет", photo_url: null, created_at: "2024-09-10", lent_to: null, category: "Техника" },
  { id: "29", name: "Airpods Pro 2", description: "Active Noise Cancellation.", price: 21000, space_id: "2", space_name: "Кабинет", photo_url: null, created_at: "2023-11-15", lent_to: null, category: "Техника" },
  { id: "30", name: "Пылесос Dyson V15", description: "Беспроводной, Gold.", price: 56000, space_id: "4", space_name: "Кухня", photo_url: null, created_at: "2024-03-20", lent_to: null, category: "Другое" },
];

export const MOCK_SPACES: Space[] = [
  { id: "1", name: "Гардеробная", type: "closet", items: MOCK_ITEMS.filter(i => i.space_id === "1") },
  { id: "2", name: "Кабинет", type: "room", items: MOCK_ITEMS.filter(i => i.space_id === "2") },
  { id: "3", name: "Кладовка", type: "box", items: MOCK_ITEMS.filter(i => i.space_id === "3") },
  { id: "4", name: "Кухня", type: "room", items: MOCK_ITEMS.filter(i => i.space_id === "4") },
  { id: "5", name: "Коробка с техникой", type: "box", items: MOCK_ITEMS.filter(i => i.space_id === "5") },
];

export const TOTAL_VALUE = MOCK_ITEMS.reduce((s, i) => s + i.price, 0);
export const TOTAL_ITEMS = MOCK_ITEMS.length;
export const LENT_ITEMS = MOCK_ITEMS.filter(i => i.lent_to);

const sixMonthsAgo = new Date();
sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
export const OLD_ITEMS = MOCK_ITEMS.filter(i => new Date(i.created_at) < sixMonthsAgo);
export const OLD_VALUE = OLD_ITEMS.reduce((s, i) => s + i.price, 0);

export function fmt(v: number) {
  return new Intl.NumberFormat("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0 }).format(v);
}

export function spaceEmoji(type: string) {
  const map: Record<string, string> = { box: "📦", closet: "🗄️", room: "🏠", cell: "📎", other: "📁" };
  return map[type] || "📁";
}

// Фото-плейсхолдеры по категориям (градиентные цвета)
export function itemColor(category: string): string {
  const map: Record<string, string> = {
    "Одежда": "#E8D5C0",
    "Обувь": "#D4C9BC",
    "Техника": "#C5D5E8",
    "Кухня": "#D4E8C5",
    "Спорт": "#C5E8D4",
    "Другое": "#E8E2DB",
  };
  return map[category] || "#E8E2DB";
}

export function itemInitials(name: string): string {
  return name.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase();
}
