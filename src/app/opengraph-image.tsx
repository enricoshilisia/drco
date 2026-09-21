import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — Advocates & Legal Consultants, Nairobi`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(path.join(process.cwd(), "public", "logo-tile.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0E1A2B", padding: 72 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={96} height={96} alt="" style={{ borderRadius: 4 }} />
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
