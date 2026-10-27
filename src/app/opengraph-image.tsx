import { ImageResponse } from "next/og";
import { company } from "@/content/site";

export const alt = `${company.legalName} — Engineering a Cleaner Energy Future`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "linear-gradient(135deg,#101714 0%,#103B32 100%)", color: "#F5F4EF" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <svg width="64" height="64" viewBox="0 0 40 40">
            <path d="M20 2.5 35.2 11.25v17.5L20 37.5 4.8 28.75v-17.5Z" fill="none" stroke="#F5F4EF" strokeOpacity=".45" strokeWidth="1.3" />
            <path d="M12.2 29 20 10.5 27.8 29" fill="none" stroke="#F5F4EF" strokeWidth="2.6" />
            <path d="M12.6 23.6c2.6-2 5.2 1.4 7.4 0s4.8-2 7.4 0" fill="none" stroke="#C8A66A" strokeWidth="2.2" strokeLinecap="round" />
          </svg>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 3 }}>AMALA</span>
            <span style={{ fontSize: 14, letterSpacing: 8, color: "#C8A66A" }}>BIOFUELS</span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 700, lineHeight: 1, letterSpacing: -3 }}>
          <span>Engineering a Cleaner</span>
          <span style={{ color: "#C8A66A" }}>Energy Future.</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: "rgba(245,244,239,0.6)" }}>
          <span>{company.legalName}</span>
          <span>Jorhat · Assam · India</span>
        </div>
      </div>
    ),
    size,
  );
}
