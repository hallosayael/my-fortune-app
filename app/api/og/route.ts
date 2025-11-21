/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fortune = searchParams.get("fortune") || "Your lucky fortune awaits!";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#ffe6cc",
          fontSize: 40,
          fontWeight: 600,
          padding: "30px",
        }}
      >
        <img
          src="https://i.ibb.co/dtQ2BrV/anime-girl.png"
          width="240"
          height="240"
          alt="anime"
          style={{ borderRadius: "20px" }}
        />
        <div
          style={{
            marginTop: "30px",
            textAlign: "center",
            maxWidth: "600px",
            fontSize: "32px",
            color: "#5a3825",
          }}
        >
          {fortune}
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
