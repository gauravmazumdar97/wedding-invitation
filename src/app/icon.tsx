import { ImageResponse } from "next/og";
import { wedding } from "@/config/wedding";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const { left, right } = wedding.couple.monogram;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f6f0e6",
          color: "#8f1d22",
          fontSize: 22,
          letterSpacing: 2,
        }}
      >
        {left}x{right}
      </div>
    ),
    size,
  );
}
