import { ImageResponse } from "next/og";
import { profile } from "@/lib/portfolio-data";

export const alt = "Iago Rivelo — Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const BG = "#0d1117";
const FG = "#f2f4f7";
const MUTED = "#97a1b0";
const LIME = "#bef264";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          backgroundImage: `radial-gradient(ellipse 80% 50% at 50% -10%, rgba(190,242,100,0.14), transparent), radial-gradient(ellipse 60% 40% at 90% 110%, rgba(150,120,255,0.12), transparent)`,
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", color: LIME, fontSize: 30 }}>
          {"// "}
          {profile.name.split(" ")[0].toLowerCase()}.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, color: FG, fontWeight: 700, letterSpacing: -2 }}>
            {profile.name}
          </div>
          <div style={{ fontSize: 40, color: MUTED, marginTop: 12 }}>{profile.role}</div>
        </div>

        <div style={{ display: "flex", alignItems: "center", fontSize: 26, color: LIME }}>
          {profile.bio.replace(/^[^—]*—\s*/, "")}
        </div>
      </div>
    ),
    { ...size },
  );
}
