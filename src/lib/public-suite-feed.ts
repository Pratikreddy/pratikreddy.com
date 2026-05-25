import { promises as fs } from "node:fs";
import path from "node:path";

export type PublicStatusState = "live" | "active" | "stale" | "blocked" | "deferred" | "unknown";
export type PublicConfirmationStatus = "confirmed" | "needs_ceo_confirmation" | "review_gated";

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

export type PublicLifeTrack = {
  id: string;
  title: string;
  label: string;
  status: string;
  summary: string;
  confirmationStatus: PublicConfirmationStatus;
};

export type PublicTimelineItem = {
  id: string;
  date: string;
  lane: string;
  title: string;
  displayDetail?: string;
  publicSummary: string;
  confidence: string;
  confirmationStatus: PublicConfirmationStatus;
};

export type PublicEducationItem = {
  id: string;
  title: string;
  institution: string;
  year: string;
  publicSummary: string;
  confirmationStatus: PublicConfirmationStatus;
  privacyBoundary: string;
};

export type PublicProofItem = {
  id: string;
  title: string;
  issuer: string;
  year: string;
  track: string;
  publicSummary: string;
  confirmationStatus: PublicConfirmationStatus;
  redactionNote: string;
  imageHref?: string;
};

export type PublicResumeHighlight = {
  id: string;
  title: string;
  detail: string;
  year: string;
  kind: "education" | "work" | "ai" | "systems" | "football";
};

export type PublicAiWork = {
  id: string;
  title: string;
  summary: string;
  href?: string;
};

export type PublicMediaCandidate = {
  id: string;
  title: string;
  track: string;
  publicStatus: "available_after_review" | "blocked" | "not_ready";
  rightsStatus: string;
  facePrivacyStatus: string;
};

export type PublicSuiteFeedV1 = {
  schemaVersion: "public-suite-feed-v1";
  generatedAt: string;
  identity: {
    name: string;
    headline: string;
    bioShort: string;
    bioLong: string;
    locationPublic?: string;
    links: Array<{ label: string; href: string }>;
  };
  copyBlocks: {
    heroKicker: string;
    heroTitle: string;
    heroBody: string;
    thesis: string;
    educationIntro: string;
    agenticSuiteIntro: string;
    privacyIntro: string;
  };
  privacy: {
    mode: "metadata_only";
    summary: string;
    forbiddenClasses: string[];
  };
  statusStrip: PublicStatusItem[];
  lifeTracks: PublicLifeTrack[];
  timeline: PublicTimelineItem[];
  education: PublicEducationItem[];
  proofItems: PublicProofItem[];
  resumeHighlights: PublicResumeHighlight[];
  aiWork: PublicAiWork[];
  mediaCandidates: PublicMediaCandidate[];
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
