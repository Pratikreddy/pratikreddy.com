import { readPublicSuiteFeed } from "@/lib/public-suite-feed";
import { ChatWidget } from "./chat-widget";
import { ScrollScene } from "./scroll-scene";
import { TimelineRail } from "./timeline-rail";

export default async function Home() {
  const feed = await readPublicSuiteFeed();
  const educationItems = feed.resumeHighlights.filter((item) => ["bba-pes", "mba-iup"].includes(item.id));
  const jobItems = feed.resumeHighlights.filter((item) => ["eox-vantage", "ayotta"].includes(item.id));
  const suiteRail = [...feed.suiteLanes, ...feed.suiteLanes];

  return (
    <main>
      <ScrollScene />
      <section className="hero" aria-labelledby="site-title">
        <div className="hero-inner">
          <h1 id="site-title">Pratik</h1>
          <div className="identity-bands" aria-label="Resume and links">
            <div className="identity-band" aria-label="Education">
              <div className="band-items">
                {educationItems.map((item) => (
                  <span key={item.id}>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                    <em>{item.year}</em>
                  </span>
                ))}
              </div>
            </div>
            <div className="identity-band" aria-label="Job">
              <div className="band-items">
                {jobItems.map((item) => (
                  <span key={item.id}>
                    <strong>{item.title}</strong>
                    <small>{item.detail}</small>
                    <em>{item.year}</em>
                  </span>
                ))}
              </div>
            </div>
            <div className="identity-band identity-band-socials" aria-label="Socials">
              <div className="band-items">
                {feed.identity.links.map((link) => (
                  <a key={link.href} href={link.href}>
                    {link.label.replace("GitHub ", "")}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rail-section timeline-only" aria-labelledby="timeline-title">
        <h2 id="timeline-title">Timeline</h2>
        <TimelineRail timeline={feed.timeline} proofItems={feed.proofItems} />
      </section>

      <section className="rail-section" aria-labelledby="suite-title">
        <h2 id="suite-title">Suite</h2>
        <div className="rail-window" tabIndex={0} aria-label="Suite scroller">
          <div className="rail rail-suite">
            {suiteRail.map((lane, index) =>
              lane.href ? (
                <a key={`${lane.id}-${index}`} className="rail-card" href={lane.href}>
                  <strong>{lane.name}</strong>
                </a>
              ) : (
                <span key={`${lane.id}-${index}`} className="rail-card">
                  <strong>{lane.name}</strong>
                </span>
              ),
            )}
          </div>
        </div>
      </section>

      <ChatWidget resumeHighlights={feed.resumeHighlights} timeline={feed.timeline} suiteLanes={feed.suiteLanes} />
    </main>
  );
}
