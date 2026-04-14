"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PreviewBanner } from "@/components/preview-banner";
import { StubButton } from "@/components/stub-toast";
import { Home, Grid3x3, Search, BarChart2, ScanLine, Settings } from "lucide-react";

const C = {
  bg: "#0F0E0D", surface: "#1A1917", surface2: "#201F1C",
  border: "#2E2C29", text: "#F5F0E8", textMid: "#9C978F",
  textDim: "#625E58", accent: "#E8A04B",
};

const NAV = [
  { icon: Home, label: "Главная", href: "/b" },
  { icon: Grid3x3, label: "Пространства", href: "/b/space/1" },
  { icon: Search, label: "Поиск", href: "/b/search" },
  { icon: BarChart2, label: "Аналитика", href: "/b/analytics" },
];

function SidebarB({ pathname }: { pathname: string }) {
  return (
    <aside
      className="hidden md:flex flex-col"
      style={{
        width: 240, flexShrink: 0,
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        padding: "28px 12px 24px",
        position: "sticky", top: 36,
        height: "calc(100vh - 36px)",
        overflow: "auto",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 32, paddingLeft: 12 }}>
        <p style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>
          Smart Inventory
        </p>
        <span style={{ fontSize: 22, fontWeight: 800, color: C.text, letterSpacing: -0.5 }}>
          YHATA
        </span>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== "/b" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 12,
                background: active ? "rgba(232,160,75,0.1)" : "transparent",
                color: active ? C.accent : C.textMid,
                textDecoration: "none",
                fontSize: 14, fontWeight: active ? 600 : 400,
              }}
            >
              <Icon size={17} strokeWidth={active ? 2 : 1.5} />
              {label}
            </Link>
          );
        })}

        <div style={{ marginTop: 4 }}>
          <StubButton
            label="Добавить вещь"
            icon={<ScanLine size={17} strokeWidth={1.5} style={{ marginRight: 10, color: C.textDim }} />}
            description="Добавить через камеру — в разработке"
            className="flex items-center px-3 py-2.5 rounded-xl text-sm w-full text-left transition-colors duration-150"
            style={{ color: C.textMid } as React.CSSProperties}
          />
        </div>
      </nav>

      {/* User */}
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            background: "rgba(232,160,75,0.12)", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: C.accent }}>СГ</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: C.text }}>Сергей</p>
            <p style={{ fontSize: 11, color: C.textDim }}>Preview</p>
          </div>
          <StubButton
            label=""
            icon={<Settings size={16} strokeWidth={1.5} style={{ color: C.textDim }} />}
            description="Настройки профиля"
            className="flex items-center p-1"
          />
        </div>
      </div>
    </aside>
  );
}

function BottomNavB({ pathname }: { pathname: string }) {
  const items = [
    { icon: <Home size={22} strokeWidth={1.5} />, label: "Главная", href: "/b" },
    { icon: <Grid3x3 size={22} strokeWidth={1.5} />, label: "Пространства", href: "/b/space/1" },
    { icon: <ScanLine size={22} strokeWidth={1.5} />, label: "Добавить", href: null, stub: true },
    { icon: <BarChart2 size={22} strokeWidth={1.5} />, label: "Аналитика", href: "/b/analytics" },
    { icon: <Settings size={22} strokeWidth={1.5} />, label: "Профиль", href: null, stub: true },
  ];

  return (
    <div
      className="md:hidden"
      style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: C.surface, borderTop: `1px solid ${C.border}`,
        padding: "8px 0 16px",
        display: "flex", zIndex: 50,
      }}
    >
      {items.map((item) =>
        item.stub ? (
          <StubButton
            key={item.label}
            label=""
            icon={
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                <span style={{ color: C.textDim }}>{item.icon}</span>
                <span style={{ fontSize: 10, color: C.textDim }}>{item.label}</span>
              </div>
            }
            description={`${item.label} — в разработке`}
            className="flex-1 flex flex-col items-center"
          />
        ) : (
          <Link
            key={item.label}
            href={item.href!}
            style={{
              flex: 1, display: "flex", flexDirection: "column",
              alignItems: "center", gap: 3, textDecoration: "none",
              color: pathname === item.href ? C.accent : C.textDim,
            }}
          >
            {item.icon}
            <span style={{ fontSize: 10, fontWeight: pathname === item.href ? 600 : 400 }}>
              {item.label}
            </span>
          </Link>
        )
      )}
    </div>
  );
}

export default function LayoutB({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <PreviewBanner variant="b" />

      <div className="flex" style={{ paddingTop: 36, minHeight: "calc(100vh - 36px)" }}>
        {/* Desktop sidebar */}
        <SidebarB pathname={pathname} />

        {/* Content: centered frame on mobile, full-width on desktop */}
        <div
          className="flex-1 flex justify-center md:block"
          style={{ background: "#070605" }}
        >
          <div
            className="w-full max-w-[430px] md:max-w-none"
            style={{ background: C.bg, minHeight: "calc(100vh - 36px)" }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <BottomNavB pathname={pathname} />
    </div>
  );
}
