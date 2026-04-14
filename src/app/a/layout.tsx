"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PreviewBanner } from "@/components/preview-banner";
import { StubButton } from "@/components/stub-toast";
import { Home, Grid3x3, Search, BarChart2, ScanLine, Settings } from "lucide-react";

const NAV = [
  { icon: Home, label: "Главная", href: "/a" },
  { icon: Grid3x3, label: "Пространства", href: "/a/space/1" },
  { icon: Search, label: "Поиск", href: "/a/search" },
  { icon: BarChart2, label: "Аналитика", href: "/a/analytics" },
];

function SidebarA({ pathname }: { pathname: string }) {
  return (
    <aside
      className="hidden md:flex flex-col"
      style={{
        width: 240, flexShrink: 0,
        background: "white",
        borderRight: "1px solid #EDE7DF",
        padding: "28px 12px 24px",
        position: "sticky", top: 36,
        height: "calc(100vh - 36px)",
        overflow: "auto",
      }}
    >
      {/* Logo */}
      <div style={{ marginBottom: 32, paddingLeft: 12 }}>
        <p style={{ fontSize: 10, color: "#B0A89E", letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 3 }}>
          Smart Inventory
        </p>
        <span style={{ fontSize: 22, fontWeight: 800, color: "#2C2420", letterSpacing: -0.5 }}>
          YHATA
        </span>
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
        {NAV.map(({ icon: Icon, label, href }) => {
          const active = pathname === href || (href !== "/a" && pathname.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              style={{
                display: "flex", alignItems: "center", gap: 10,
                padding: "10px 12px", borderRadius: 12,
                background: active ? "#F3EDE7" : "transparent",
                color: active ? "#C4956A" : "#6B6460",
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
            icon={<ScanLine size={17} strokeWidth={1.5} style={{ marginRight: 10 }} />}
            description="Добавить через камеру — в разработке"
            className="flex items-center px-3 py-2.5 rounded-xl text-sm text-[#6B6460] w-full text-left hover:bg-[#F3EDE7] transition-colors duration-150"
          />
        </div>
      </nav>

      {/* User */}
      <div style={{ borderTop: "1px solid #EDE7DF", paddingTop: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 18,
            background: "#F3EDE7", flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: 14, fontWeight: 700, color: "#C4956A" }}>СГ</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 500, color: "#2C2420" }}>Сергей</p>
            <p style={{ fontSize: 11, color: "#B0A89E" }}>Preview</p>
          </div>
          <StubButton
            label=""
            icon={<Settings size={16} strokeWidth={1.5} style={{ color: "#C8C0B8" }} />}
            description="Настройки профиля"
            className="flex items-center p-1"
          />
        </div>
      </div>
    </aside>
  );
}

function BottomNavA({ pathname }: { pathname: string }) {
  const items = [
    { icon: <Home size={22} strokeWidth={1.5} />, label: "Главная", href: "/a" },
    { icon: <Grid3x3 size={22} strokeWidth={1.5} />, label: "Пространства", href: "/a/space/1" },
    { icon: <ScanLine size={22} strokeWidth={1.5} />, label: "Добавить", href: null, stub: true },
    { icon: <BarChart2 size={22} strokeWidth={1.5} />, label: "Аналитика", href: "/a/analytics" },
    { icon: <Settings size={22} strokeWidth={1.5} />, label: "Профиль", href: null, stub: true },
  ];

  return (
    <div
      className="md:hidden"
      style={{
        position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)",
        width: "100%", maxWidth: 430,
        background: "white", borderTop: "1px solid #F0EAE3",
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
                <span style={{ color: "#C8C0B8" }}>{item.icon}</span>
                <span style={{ fontSize: 10, color: "#C8C0B8" }}>{item.label}</span>
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
              color: pathname === item.href ? "#C4956A" : "#C8C0B8",
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

export default function LayoutA({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div style={{ minHeight: "100vh", background: "#FAF8F5" }}>
      <PreviewBanner variant="a" />

      <div className="flex" style={{ paddingTop: 36, minHeight: "calc(100vh - 36px)" }}>
        {/* Desktop sidebar */}
        <SidebarA pathname={pathname} />

        {/* Content: centered frame on mobile, full-width on desktop */}
        <div
          className="flex-1 flex justify-center md:block"
          style={{ background: "#E8E2DB" }}
        >
          <div
            className="w-full max-w-[430px] md:max-w-none"
            style={{ background: "#FAF8F5", minHeight: "calc(100vh - 36px)" }}
          >
            {children}
          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <BottomNavA pathname={pathname} />
    </div>
  );
}
