import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const fortune = searchParams.get("fortune") ?? "";
  const token = searchParams.get("token") ?? "";
  const vibe = searchParams.get("vibe") ?? "";
  const num = searchParams.get("num") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          background: "#FFF8DC",
          padding: "40px",
          fontSize: "40px",
          color: "#333",
        }}
      >
        <div>🔮 {fortune}</div>
        <div style={{ marginTop: "30px", fontSize: "32px" }}>
          {`Token: ${token} | Vibes: ${vibe} | No: ${num}`}
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
