import { PreviewBanner } from "@/components/preview-banner";

export default function LayoutA({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PreviewBanner variant="a" />
      <div style={{ paddingTop: 36 }}>{children}</div>
    </>
  );
}
