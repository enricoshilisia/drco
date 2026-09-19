import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Advocates & Legal Consultants, Nairobi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0E1A2B", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div style={{ width: 64, height: 64, border: "2px solid #C9A25C", display: "flex", alignItems: "center", justifyContent: "center", color: "#C9A25C", fontSize: 26 }}>
            DK
          </div>
          <div style={{ color: "#FAF7F0", fontSize: 34 }}>{site.legalName}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ width: 60, height: 3, background: "#C9A25C" }} />
          <div style={{ color: "#FAF7F0", fontSize: 64, lineHeight: 1.15, maxWidth: 900 }}>{site.tagline}</div>
          <div style={{ color: "#B9C0CC", fontSize: 26 }}>Advocates &amp; Legal Consultants · Nairobi, Kenya</div>
        </div>
      </div>
    ),
    size,
  );
}
