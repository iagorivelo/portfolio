import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#16181c",
        color: "#43acfb",
        fontSize: 24,
        fontWeight: 700,
        borderRadius: 7,
        fontFamily: "monospace",
      }}
    >
      i
    </div>,
    { ...size },
  );
}
