"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PreviewBanner } from "@/components/preview-banner";
import { StubButton } from "@/components/stub-toast";
import { Home, Grid3x3, Search, BarChart2, ScanLine, Settings } from "lucide-react";

const C = {
  bg: "#F8F7F5", surface: "#FFFFFF", border: "#E5E4E0",
  text: "#0D0D0D", textMid: "#6B6B68", textDim: "#B0AFAB",
  accent: "#5B5BD6", accentLight: "rgba(91,91,214,0.08)",
};

const NAV = [
  { icon: Home, label: "Главная", href: "/c" },
  { icon: Grid3x3, label: "Пространства", href: "/c/space/1" },
  { icon: Search, label: "Поиск", href: "/c/search" },
  { icon: BarChart2, label: "Аналитика", href: "/c/analytics" },
];

function SidebarC({ pathname }: { pathname: string }) {
  return (
    <aside
      className="hidden md:flex flex-col"
      style={{
        width: 220, flexShrink: 0,
        background: C.surface,
        borderRight: `1px solid ${C.border}`,
        padding: "32px 16px 24px",
        position: "sticky", top: 36,
        height: "calc(100vh - 36px)",
        overflow: "auto",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 40, paddingLeft: 8 }}>
        <p style={{ fontSize: 10, color: C.textDim, letterSpacing: "0.3em", textTransform: "uppercase", marginBottom: 4 }}>
          Studio
        </p>
        <span style={{ fontSize: 20, fontWeight: 800, color: C.text, letterSpacing: -0.3 }}>
          YHATA
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 1 }}>
        {NAV.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== "/c" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "9px 8px", borderRadius: 8,
                background: active ? C.accentLight : "transparent",
                color: active ? C.accent : C.textMid,
                textDecoration: "none",
                fontSize: 13, fontWeight: active ? 600 : 400,
                letterSpacing: -0.1,
              }}
            >
              <Icon size={16} strokeWidth={active ? 2 : 1.5} />
              {label}
            </Link>
          );
        })}
        <div style={{ marginTop: 2 }}>
          <StubButton
            label="Добавить"
            icon={<ScanLine size={16} strokeWidth={1.5} style={{ marginRight: 10 }} />}
            description="Добавить через камеру — в разработке"
            className="flex items-center px-2 py-2 rounded-lg text-[13px] w-full text-left transition-colors"
            style={{ color: C.textMid }}
          />
        </div>
      </nav>

      {/* User */}
      <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 32, height: 32, borderRadius: 16,
            background: C.accentLight, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: C.accent }}>СГ</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 12, fontWeight: 600, color: C.text }}>Сергей</p>
            <p style={{ fontSize: 11, color: C.textDim }}>Studio Preview</p>
          </div>
          <StubButton
            label=""
            icon={<Settings size={14} strokeWidth={1.5} style={{ color: C.textDim }} />}
            description="Настройки"
            className="flex items-center p-1"
          />
        </div>
      </div>
    </aside>
  );
}

function BottomNavC({ pathname }: { pathname: string }) {
  const items = [
    { icon: <Home size={22} strokeWidth={1.5} />, label: "Главная", href: "/c" },
    { icon: <Grid3x3 size={22} strokeWidth={1.5} />, label: "Вещи", href: "/c/space/1" },
    { icon: <ScanLine size={22} strokeWidth={1.5} />, label: "Добавить", stub: true },
    { icon: <BarChart2 size={22} strokeWidth={1.5} />, label: "Аналитика", href: "/c/analytics" },
    { icon: <Settings size={22} strokeWidth={1.5} />, label: "Профиль", stub: true },
  ];

  return (
    <div
      className="md:hidden"
      style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: C.surface, borderTop: `1px solid ${C.border}`,
        padding: "8px 0 16px", display: "flex", zIndex: 50,
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

export default function LayoutC({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ minHeight: "100vh", background: C.bg }}>
      <PreviewBanner variant="c" />

      <div className="flex" style={{ paddingTop: 36, minHeight: "calc(100vh - 36px)" }}>
        <SidebarC pathname={pathname} />

        <div className="flex-1 flex justify-center md:block" style={{ background: C.bg }}>
          <div className="w-full max-w-[430px] md:max-w-none" style={{ background: C.bg, minHeight: "calc(100vh - 36px)" }}>
            {children}
          </div>
        </div>
      </div>

      <BottomNavC pathname={pathname} />
    </div>
  );
}
