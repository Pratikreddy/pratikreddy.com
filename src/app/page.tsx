import { readPublicSuiteFeed } from "@/lib/public-suite-feed";
import { ChatWidget } from "./chat-widget";

export default async function Home() {
  const feed = await readPublicSuiteFeed();
  const resumeItems = feed.resumeHighlights.filter((item) =>
    ["bba-pes", "mba-iup", "eox-vantage", "ayotta", "ai-chatbots", "agentic-suite"].includes(item.id),
  );
  const timelineRail = [...feed.timeline, ...feed.timeline];
  const suiteRail = [...feed.suiteLanes, ...feed.suiteLanes];

  return (
    <main>
      <section className="hero" aria-labelledby="site-title">
        <div className="hero-inner">
          <h1 id="site-title">Pratik</h1>
          <div className="resume-line" aria-label="Resume">
            {resumeItems.map((item) => (
              <span key={item.id}>
                <strong>{item.title}</strong>
                <em>{item.year}</em>
              </span>
            ))}
          </div>
          <div className="link-line" aria-label="Public links">
            {feed.identity.links.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label.replace("GitHub ", "")}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="rail-section" aria-labelledby="suite-title">
        <h2 id="suite-title">Suite</h2>
        <div className="rail-window" tabIndex={0} aria-label="Suite scroller">
          <div className="rail rail-suite">
            {suiteRail.map((lane, index) =>
              lane.href ? (
                <a key={`${lane.id}-${index}`} className="rail-card" href={lane.href}>
                  <strong>{lane.name}</strong>
                  <span>{lane.state}</span>
                </a>
              ) : (
                <span key={`${lane.id}-${index}`} className="rail-card">
                  <strong>{lane.name}</strong>
                  <span>{lane.state}</span>
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <section className="rail-section timeline-only" aria-labelledby="timeline-title">
        <h2 id="timeline-title">Timeline</h2>
        <div className="rail-window" tabIndex={0} aria-label="Timeline scroller">
          <div className="rail rail-timeline">
            {timelineRail.map((item, index) => (
              <article key={`${item.id}-${index}`} className="rail-card timeline-card">
                <time>{item.date}</time>
                <strong>{item.title}</strong>
                <span>{item.lane}</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ChatWidget resumeHighlights={feed.resumeHighlights} timeline={feed.timeline} aiWork={feed.aiWork} />
    </main>
  );
}
