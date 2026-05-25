"use client";

import { useMemo, useState } from "react";
import type { PublicProofItem, PublicTimelineItem } from "@/lib/public-suite-feed";

type TimelineRailProps = {
  timeline: PublicTimelineItem[];
  proofItems: PublicProofItem[];
};

export function TimelineRail({ timeline, proofItems }: TimelineRailProps) {
  const [selected, setSelected] = useState<PublicProofItem | null>(null);
  const railItems = useMemo(() => [...timeline, ...timeline], [timeline]);
  const proofByTimelineId = useMemo(() => {
    return new Map(proofItems.filter((item) => item.imageHref).map((item) => [item.id, item]));
  }, [proofItems]);

  return (
    <>
      <div className="rail-window" tabIndex={0} aria-label="Timeline scroller">
        <div className="rail rail-timeline">
          {railItems.map((item, index) => {
            const proof = proofByTimelineId.get(item.id);
            const isGhostCopy = index < timeline.length;

            return (
              <article
                key={`${item.id}-${index}`}
                className={`rail-card timeline-card${proof ? " has-proof" : ""}`}
                aria-hidden={isGhostCopy ? true : undefined}
              >
                <time>{item.date}</time>
                <strong>{item.title}</strong>
                {item.displayDetail ? <em>{item.displayDetail}</em> : null}
                {proof?.imageHref ? (
                  <button
                    type="button"
                    className="timeline-proof"
                    onPointerDown={(event) => {
                      event.preventDefault();
                      setSelected(proof);
                    }}
                    onClick={() => setSelected(proof)}
                    tabIndex={isGhostCopy ? -1 : undefined}
                    aria-label={`Open ${proof.title}`}
                  >
                    <img src={proof.imageHref} alt="" />
                  </button>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>

      {selected?.imageHref ? (
        <div className="proof-dialog" role="dialog" aria-modal="true" aria-label={selected.title}>
          <button className="proof-backdrop" type="button" aria-label="Close certificate" onClick={() => setSelected(null)} />
          <div className="proof-modal">
            <div className="proof-modal-head">
              <div>
                <span>{selected.year}</span>
                <strong>{selected.title}</strong>
              </div>
              <button className="proof-close" type="button" aria-label="Close certificate" onClick={() => setSelected(null)}>
                x
              </button>
            </div>
            <img src={selected.imageHref} alt={selected.title} />
          </div>
        </div>
      ) : null}
    </>
  );
}
