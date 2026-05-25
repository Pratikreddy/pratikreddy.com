import { readPublicSuiteFeed } from "@/lib/public-suite-feed";

export const dynamic = "force-static";

export async function GET() {
  try {
    const feed = await readPublicSuiteFeed();
    return Response.json(feed, {
      headers: {
        "Cache-Control": "public, max-age=300, s-maxage=300",
      },
    });
  } catch (error) {
    return Response.json(
      {
        schemaVersion: "public-suite-feed-v1",
        status: "missing",
        message: "Public suite feed has not been generated.",
      },
      { status: 503 },
    );
  }
}
