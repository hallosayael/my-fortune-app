import { ImageResponse } from "next/server";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fortune = searchParams.get("fortune") || "Your fortune awaits!";

  // Return OG image using pure HTML (no JSX)
  return new ImageResponse(
    {
      type: "div",
      props: {
        style: {
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
        },
        children: [
          {
            type: "img",
            props: {
              src: "https://i.ibb.co/dtQ2BrV/anime-girl.png",
              width: 240,
              height: 240,
              style: { borderRadius: "20px" },
            },
          },
          {
            type: "div",
            props: {
              style: {
                marginTop: "30px",
                textAlign: "center",
                maxWidth: "600px",
                fontSize: "32px",
                color: "#5a3825",
              },
              children: fortune,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
    }
  );
}
