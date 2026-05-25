"use client";

import { useMemo, useState } from "react";
import type { PublicAiWork, PublicResumeHighlight, PublicTimelineItem } from "@/lib/public-suite-feed";

type ChatWidgetProps = {
  resumeHighlights: PublicResumeHighlight[];
  timeline: PublicTimelineItem[];
  aiWork: PublicAiWork[];
};

const starterPrompts = [
  { id: "resume", label: "Resume" },
  { id: "timeline", label: "Timeline" },
  { id: "ai", label: "AI work" },
] as const;

export function ChatWidget({ resumeHighlights, timeline, aiWork }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<(typeof starterPrompts)[number]["id"]>("resume");

  const answer = useMemo(() => {
    if (active === "timeline") {
      return timeline
        .slice(0, 6)
        .map((item) => `${item.date}: ${item.title}`)
        .join(" | ");
    }

    if (active === "ai") {
      return aiWork
        .slice(0, 4)
        .map((item) => item.title)
        .join(" | ");
    }

    return resumeHighlights
      .slice(0, 5)
      .map((item) => `${item.title}: ${item.detail}`)
      .join(" | ");
  }, [active, aiWork, resumeHighlights, timeline]);

  return (
    <div className={`chat-widget${open ? " is-open" : ""}`}>
      {open ? (
        <section className="chat-panel" aria-label="Pratik site character chat">
          <div className="chat-head">
            <div>
              <span>PSR</span>
              <strong>Ask</strong>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              x
            </button>
          </div>
          <p className="chat-bubble">{answer}</p>
          <div className="chat-actions" aria-label="Starter questions">
            {starterPrompts.map((prompt) => (
              <button
                key={prompt.id}
                type="button"
                className={active === prompt.id ? "is-active" : ""}
                onClick={() => setActive(prompt.id)}
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </section>
      ) : null}
      <button className="chat-launcher" type="button" onClick={() => setOpen((value) => !value)} aria-label="Open chat">
        <span>PSR</span>
      </button>
    </div>
  );
}
