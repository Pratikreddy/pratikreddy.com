import { promises as fs } from "node:fs";
import path from "node:path";

export type PublicStatusState = "live" | "active" | "stale" | "blocked" | "deferred" | "unknown";

export type PublicMetric = {
  label: string;
  value: string;
};

export type PublicStatusItem = {
  id: string;
  label: string;
  state: PublicStatusState;
  detail: string;
  asOf?: string;
};

export type PublicSuiteLane = {
  id: string;
  name: string;
  role: string;
  state: PublicStatusState;
  publicSummary: string;
  source: string;
  privacyBoundary: string;
  metrics: PublicMetric[];
  href?: string;
};

export type PublicProjectCard = {
  id: string;
  title: string;
  date: string;
  stack: string;
  summary: string;
  sourceStatus: string;
  href?: string;
};

export type PublicSuiteFeedV1 = {
  schemaVersion: "public-suite-feed-v1";
  generatedAt: string;
  identity: {
    name: string;
    headline: string;
    links: Array<{ label: string; href: string }>;
  };
  privacy: {
    mode: "metadata_only";
    summary: string;
    forbiddenClasses: string[];
  };
  statusStrip: PublicStatusItem[];
  suiteLanes: PublicSuiteLane[];
  projects: PublicProjectCard[];
  evidenceSummary?: {
    handoffQualityScore: number | null;
    docsCurrent: number | null;
    docsEnabled: number | null;
  };
};

const FEED_PATH = path.join(process.cwd(), "public", "data", "public-suite-feed.json");

export async function readPublicSuiteFeed(): Promise<PublicSuiteFeedV1> {
  const raw = await fs.readFile(FEED_PATH, "utf8");
  return JSON.parse(raw) as PublicSuiteFeedV1;
}
