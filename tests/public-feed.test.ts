import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it, beforeAll } from "vitest";
import { GET } from "../src/app/api/suite-feed/route";
import { assertPublicPayloadSafe } from "../src/lib/feed-guard.mjs";
import type { PublicSuiteFeedV1 } from "../src/lib/public-suite-feed";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const feedPath = path.join(repoRoot, "public", "data", "public-suite-feed.json");

function loadFeed(): PublicSuiteFeedV1 {
  return JSON.parse(readFileSync(feedPath, "utf8")) as PublicSuiteFeedV1;
}

describe("public suite feed", () => {
  beforeAll(() => {
    execFileSync("node", ["scripts/build-public-feed"], {
      cwd: repoRoot,
      stdio: "pipe",
    });
  });

  it("builds a metadata-only v1 feed from local suite metadata", () => {
    const feed = loadFeed();

    expect(feed.schemaVersion).toBe("public-suite-feed-v1");
    expect(feed.identity.name).toBe("Pratik S Reddy");
    expect(feed.identity.bioShort).toContain("education");
    expect(feed.privacy.mode).toBe("metadata_only");
    expect(feed.lifeTracks.map((track) => track.id)).toEqual(
      expect.arrayContaining(["education", "football", "clothing", "farming", "systems"]),
    );
    expect(feed.timeline.some((item) => item.title.includes("Bachelor"))).toBe(true);
    expect(feed.education.map((item) => item.institution)).toEqual(
      expect.arrayContaining(["PES University", "Indiana University of Pennsylvania"]),
    );
    expect(feed.proofItems.length).toBeGreaterThanOrEqual(1);
    expect(feed.resumeHighlights.map((item) => item.id)).toEqual(
      expect.arrayContaining(["bba-pes", "mba-iup", "ai-chatbots"]),
    );
    expect(feed.aiWork.map((item) => item.id)).toEqual(expect.arrayContaining(["geminichat", "llmquerybot"]));
    expect(feed.suiteLanes.map((lane) => lane.id)).toEqual(
      expect.arrayContaining([
        "agent-ops",
        "switchboard",
        "palimpsest",
        "sys-docs",
        "meeting-extractor",
        "x-archive",
        "union-bank-finance",
      ]),
    );
    expect(feed.statusStrip.some((item) => item.state === "blocked")).toBe(true);
    expect(feed.statusStrip.some((item) => item.state === "stale" || item.state === "deferred")).toBe(true);
  });

  it("does not expose local raw paths or known private artifact names", () => {
    const feedText = readFileSync(feedPath, "utf8");

    expect(feedText).not.toContain("/Users/");
    expect(feedText).not.toContain("source_proxy");
    expect(feedText).not.toContain(".mp4");
    expect(feedText).not.toContain(".wav");
    expect(feedText).not.toContain(".srt");
    expect(feedText).not.toContain(".vtt");
  });

  it("rejects forbidden keys and content before publishing", () => {
    expect(() => assertPublicPayloadSafe({ accountNumber: "1234" })).toThrow(/forbidden key/);
    expect(() => assertPublicPayloadSafe({ safe: "source_proxy.mp4" })).toThrow(/forbidden value/);
  });

  it("serves the feed through the app route", async () => {
    const response = await GET();
    expect(response.status).toBe(200);

    const payload = (await response.json()) as PublicSuiteFeedV1;
    expect(payload.schemaVersion).toBe("public-suite-feed-v1");
    expect(payload.suiteLanes.length).toBeGreaterThanOrEqual(7);
  });
});
