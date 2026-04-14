import { PreviewBanner } from "@/components/preview-banner";

export default function LayoutB({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PreviewBanner variant="b" />
      <div style={{ paddingTop: 36, minHeight: "100vh", background: "#0F0E0D" }}>
        {children}
      </div>
    </>
  );
}
