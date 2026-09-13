import { ImageResponse } from "next/og";
import { wedding } from "@/config/wedding";
import { coupleDisplay } from "@/lib/invite";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  const { first, second } = coupleDisplay();
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f0e6",
          color: "#3f151c",
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, color: "#c4a574" }}>SHUBHO BIBAHO</div>
        <div style={{ marginTop: 28, fontSize: 72 }}>{first.fullName}</div>
        <div style={{ fontSize: 36, color: "#8f1d22" }}>&</div>
        <div style={{ fontSize: 72 }}>{second.fullName}</div>
        <div style={{ marginTop: 28, fontSize: 28, letterSpacing: 4 }}>{wedding.date.display}</div>
        <div style={{ marginTop: 16, fontSize: 24, color: "#8f1d22" }}>{wedding.social.descriptionBn}</div>
      </div>
    ),
    size,
  );
}
