"use client";

import { useMemo, useState } from "react";
import type { PublicResumeHighlight, PublicSuiteLane, PublicTimelineItem } from "@/lib/public-suite-feed";

type ChatWidgetProps = {
  resumeHighlights: PublicResumeHighlight[];
  timeline: PublicTimelineItem[];
  suiteLanes: PublicSuiteLane[];
};

const starterPrompts = [
  { id: "resume", label: "Resume" },
  { id: "timeline", label: "Timeline" },
  { id: "suite", label: "Suite" },
] as const;

export function ChatWidget({ resumeHighlights, timeline, suiteLanes }: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<(typeof starterPrompts)[number]["id"]>("resume");

  const answer = useMemo(() => {
    if (active === "timeline") {
      return timeline
        .slice(0, 6)
        .map((item) => `${item.date}: ${item.title}`)
        .join(" | ");
    }

    if (active === "suite") {
      return suiteLanes
        .slice(0, 7)
        .map((item) => item.name)
        .join(" | ");
    }

    return resumeHighlights
      .slice(0, 5)
      .map((item) => `${item.title}: ${item.detail}`)
      .join(" | ");
  }, [active, resumeHighlights, suiteLanes, timeline]);

  return (
    <div className={`chat-widget${open ? " is-open" : ""}`}>
      {open ? (
        <section className="chat-panel" aria-label="Pratik site character chat">
          <div className="chat-head">
            <div className="chat-title">
              <img className="chat-avatar" src="/whis/whis-icon.png" alt="" />
              <div>
                <span>Whis</span>
                <strong>Ask</strong>
              </div>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close chat">
              x
            </button>
          </div>
          <div className="chat-response">
            <img className="whis-avatar" src="/whis/whis-icon.png" alt="" />
            <p className="chat-bubble">{answer}</p>
          </div>
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
        <img src="/whis/whis-icon.png" alt="" />
      </button>
    </div>
  );
}
