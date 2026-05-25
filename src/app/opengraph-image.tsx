import { ImageResponse } from "next/og";

export const alt = "Pratik S Reddy | Agentic Systems + Operations";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#07100e",
          color: "#f7f7f2",
          fontFamily: "Inter, Arial, sans-serif",
          padding: "36px",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "28px",
            background: "#111514",
            boxShadow: "0 32px 90px rgba(0, 0, 0, 0.5)",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "radial-gradient(circle at 75% 18%, rgba(0, 180, 174, 0.74), transparent 34%), radial-gradient(circle at 70% 72%, rgba(81, 103, 98, 0.6), transparent 36%), linear-gradient(125deg, #080a0a 0%, #111615 46%, #253c39 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "47%",
              height: "100%",
              background:
                "linear-gradient(92deg, rgba(0, 0, 0, 0.76) 0%, rgba(0, 0, 0, 0.62) 62%, rgba(0, 0, 0, 0) 100%)",
            }}
          />
          <div
            style={{
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              width: "100%",
              height: "100%",
              padding: "96px 116px",
            }}
          >
            <div
              style={{
                color: "rgba(255, 255, 255, 0.66)",
                fontSize: 24,
                fontWeight: 800,
                letterSpacing: 8,
              }}
            >
              PRATIK S REDDY
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 34,
                marginTop: 32,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  fontSize: 72,
                  lineHeight: 0.96,
                  fontWeight: 900,
                  letterSpacing: 0,
                }}
              >
                <span>Agentic Systems</span>
                <span>+ Operations</span>
              </div>
              <div
                style={{
                  width: 220,
                  height: 2,
                  background: "rgba(255, 255, 255, 0.32)",
                }}
              />
            </div>
            <div
              style={{
                position: "absolute",
                left: 116,
                bottom: 66,
                display: "flex",
                alignItems: "center",
                gap: 18,
                color: "rgba(255, 255, 255, 0.72)",
                fontSize: 30,
                fontWeight: 800,
              }}
            >
              <span>pratikreddy.com</span>
              <span style={{ color: "#31c48d" }}>metadata-only public suite</span>
            </div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
