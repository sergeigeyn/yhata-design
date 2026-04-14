import { PreviewBanner } from "@/components/preview-banner";

export default function LayoutB({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "#070605" }}>
      <PreviewBanner variant="b" />
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
            background: "#0F0E0D",
            boxShadow: "0 0 60px rgba(232,160,75,0.06)",
            position: "relative",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
