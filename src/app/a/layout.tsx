import { PreviewBanner } from "@/components/preview-banner";

export default function LayoutA({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#E8E2DB" }}>
      <PreviewBanner variant="a" />
      {/* Centered mobile frame */}
      <div
        style={{
          paddingTop: 36,
          display: "flex",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 430,
            minHeight: "calc(100vh - 36px)",
            background: "#FAF8F5",
            boxShadow: "0 0 60px rgba(0,0,0,0.15)",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
