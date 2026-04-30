# YHATA Brand Notes для Claude Design

> Готовый текст для вставки в поле **«Any other notes?»** при создании Design System в Claude Design. Копируй целиком начиная с первого `===` и до конца.

---

```
=== COLORS ===

Палитра Quiet Order (для лендингов, промо, email, брендовых материалов):
- Stone Linen #EAE0D4 — основной фон
- Sand Archive #DCC6A8 — вторичный фон
- Walnut #94806B — muted text, second-level UI
- Forest Ledger #2C342D — основной текст, заголовки
- Deep Terra #5D2319 — CTA, акценты

Палитра App (для экранов приложения):
- Warm White #FAF8F5 — фон экрана
- Sand Light #F3EDE7 — вторичный фон
- Card White #FFFFFF — карточки
- Warm Black #2C2420 — основной текст
- Warm Gray #8A7E76 — вторичный текст
- Muted #B8AFA8 — placeholder
- Terracotta #C4956A — акцент, цены, CTA
- Border #E8E2DB — мягкие границы

Functional: Sage #8B9E7E (success), Amber #D4A86A (warning), Clay Red #C47D6D (error), Dusty Blue #7D9EB2 (info).

Когда какая палитра: Quiet Order — для всего брендового (лендинги, email, промо). App — для продуктовых экранов внутри приложения.

=== TYPOGRAPHY ===

Единственный шрифт — Gothra Text VF (загружен в ассетах). Fallback — Georgia.
НИКОГДА не используй Inter, Jost, system-ui, Arial, Helvetica.

Правила Gothra:
- Variable axis slnt 0→10. Italic через font-variation-settings: "slnt" 10, не через CSS italic.
- В шрифте НЕТ Bold. Избегай font-weight > 500. Если нужен жирный — только font-synthesis: weight синтетически.
- Tracking: body -0.005em, H1-H3 -0.015em, uppercase 0.12em.
- Отсутствует глиф № (U+2116) — fallback на Georgia.
- НЕ ставить font-feature-settings: "kern", "liga" — активирует нежелательные декоративные варианты.

Размеры: xs 12px, sm 14px, base 16px, lg 18px, xl 20px, 2xl 24px, 3xl 32px, 4xl 48px (только лендинги), 5xl 72px (только hero промо).

Паттерн заголовков в стиле Zara:
"ПРОСТРАНСТВА" (text-sm, uppercase, tracking 0.12em, muted) → "Мои вещи" (text-3xl, font-weight 300) → "43 предмета · 127 400 ₽" (text-sm, muted).

Числа с валютой: пробел-тысячи, ₽ в конце, &nbsp; между числом и валютой.

=== LAYOUT ===

Spacing (8px baseline): 4, 8, 12, 16, 24, 32, 48, 64, 96. Правило воздуха: если сомневаешься между 24 и 32 — ставь 32.

Radii: 4 (chips), 8 (кнопки, inputs), 12 (карточки), 16 (модалки), 9999 (pills, FAB).

Shadows только soft:
- sm: 0 1px 3px rgba(44,36,32,0.06)
- md: 0 4px 12px rgba(44,36,32,0.08)
- lg: 0 8px 24px rgba(44,36,32,0.10)

НИКОГДА: shadow opacity > 15%, inset shadow, multi-layer shadow.

Mobile-first. Min width 360px. Max content: 1200px (app), 1440px (лендинги). Safe area: padding-bottom минимум 16px для 3-button nav Android.

=== COMPONENTS ===

Кнопки: height 48px, radius 8px, uppercase, tracking 0.08em.
- Primary: Terracotta или Deep Terra fill, white text, no shadow
- Secondary: transparent bg, 1px border, цветной text
- Ghost: transparent, warm-gray text, no border
НИКОГДА: gradient fill, размер < 44px.

Карточка вещи в списке: bg white, shadow-sm, radius 12, padding 12, gap 16. Фото 80×80 radius 8 + название (base, warm-black) + бренд (sm, warm-gray) + цена (base, terracotta).

Фото: aspect 1:1 или 4:5, object-fit cover, без фильтров и оверлеев.

Bottom Tab (mobile): height 64 + safe-area, bg white, border-top 1px, active Terracotta, inactive Muted.

FAB: 56px, Terracotta bg, white icon 24px, shadow-lg, bottom 80 + right 20.

Иконки: Lucide line-icons (1.5px stroke), warm-gray default, Terracotta для active. Monochrome. НИКОГДА filled, цветные, emoji.

=== MOTION ===

Durations: 150ms (hover), 250ms (transitions), 400ms (page).
Ease-out default: cubic-bezier(0.16, 1, 0.3, 1).
НИКОГДА: spring bounce, parallax, auto-play video на hero.

=== IMAGERY ===

Фото-стиль: естественный свет, тёплая цветокоррекция (сдвиг в жёлтый/оранжевый). Нейтральный фон (бежевый, льняной, дерево). Текстуры: лён, керамика, дерево, крафт.
Референсы: Zara Home lookbook, The Row, Aesop, Kinfolk.
НИКОГДА: стоковые люди с улыбками, офисы со стеклом, техно-клише.

=== VOICE ===

Тихий, уверенный, без суеты. Как куратор музея, не маркетолог.
Короткие фразы (5-8 слов в заголовке — предел).
Точка или без знака. Восклицания запрещены.
Не «мы» — через вещь / действие.
Кавычки «ёлочки», не "прямые".
Числа до десяти — прописью.

Примеры правильного тона:
- "Шкаф, который помнит." (не "Откройте мощный инструмент!")
- "Начать." (не "Начните прямо сейчас!")
- "Первые 20 вещей — бесплатно." (не "Попробуйте бесплатно!")

=== HARD RULES (не нарушать) ===

1. Только Gothra + Georgia fallback. Никаких Inter/Jost/system-ui.
2. Bold запрещён (его нет в шрифте).
3. Никаких emoji в UI.
4. Никаких gradient backgrounds, mesh, glassmorphism, 3D blobs.
5. Никаких ярких/неоновых цветов.
6. Никаких восклицательных знаков в UX-копирайте.
7. Фото доминирует, UI тихий.
8. Shadow только soft (6-10% opacity).
9. Иконки только line, monochrome.
10. Touch target ≥ 44px.
```

---

## Как использовать

1. Открой [claude.ai/design](https://claude.ai/design)
2. Создай новую Design System (название: **YHATA Brand Kit**)
3. В поле **«Any other notes?»** → скопируй всё между тройными кавычками выше и вставь
4. В **«Add fonts, logos and assets»** → перетащи файлы из `YHATA/YHATA брендбук/CLAUDE-DESIGN-KIT/font/` и `/logo/`
5. `Continue to generation →`

## Когда обновлять

- При изменении палитры / типографики / компонентов на `yhata.store` или `brand.yhata.store`
- При найденных в тестах ошибках модели (добавлять в `HARD RULES`)
- После больших ребрендингов (вся секция COLORS или TYPOGRAPHY)
