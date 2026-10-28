import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { company } from "@/content/site";

export const alt = `${company.legalName}: ${company.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OG() {
  const logo = await readFile(join(process.cwd(), "public/brand/amala-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#F9ECDB" }}>
        <div style={{ width: 420, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={260} height={324} alt="" />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 72px", background: "#02462D", color: "#FFF9EE" }}>
          <span style={{ fontSize: 22, letterSpacing: 4, color: "#B5C98A" }}>INDUSTRIAL FUEL SOLUTIONS</span>
          <span style={{ marginTop: 24, fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Transforming Resources.</span>
          <span style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, color: "#F78330" }}>Powering Industry.</span>
          <span style={{ marginTop: 36, fontSize: 24, color: "rgba(255,249,238,0.7)" }}>Jorhat · Assam · India</span>
        </div>
      </div>
    ),
    size,
  );
}
