import { readPublicSuiteFeed, type PublicStatusState } from "@/lib/public-suite-feed";

function statusClass(state: PublicStatusState) {
  return `status-pill status-${state}`;
}

const statusOrder: PublicStatusState[] = ["live", "active", "stale", "blocked", "deferred", "unknown"];

export default async function Home() {
  const feed = await readPublicSuiteFeed();
  const statusCounts = feed.statusStrip.reduce(
    (counts, item) => {
      counts[item.state] += 1;
      return counts;
    },
    {
      live: 0,
      active: 0,
      stale: 0,
      blocked: 0,
      deferred: 0,
      unknown: 0,
    } satisfies Record<PublicStatusState, number>,
  );
  const generatedAt = new Date(feed.generatedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <main>
      <section className="hero" aria-labelledby="site-title">
        <div className="hero-inner">
          <article className="share-preview" aria-label="pratikreddy.com public preview card">
            <div className="preview-art">
              <div className="preview-copy">
                <p>PRATIK S REDDY</p>
                <h1 id="site-title">
                  <span>Agentic Systems</span>
                  <span>+ Operations</span>
                </h1>
                <div className="title-rule" aria-hidden="true" />
              </div>
              <div className="identity-badge">
                <img src="https://github.com/Pratikreddy.png" alt="Pratik S Reddy public profile avatar" />
                <span>public identity</span>
              </div>
            </div>
            <div className="preview-body">
              <h2>Pratik S Reddy | Agentic Systems + Operations</h2>
              <p>
                Portfolio of Pratik S Reddy, building agentic systems, automation, local-first evidence, and operations
                tools.
              </p>
              <div className="domain-row">
                <a href="https://pratikreddy.com">pratikreddy.com</a>
                <span>{feed.privacy.mode.replaceAll("_", " ")} gate</span>
              </div>
            </div>
          </article>

          <aside className="hero-panel" aria-label="Public suite summary">
            <p className="eyebrow">Public suite feed</p>
            <h2>{feed.identity.headline}</h2>
            <div className="hero-status-list" aria-label="Freshness summary">
              {statusOrder
                .filter((state) => statusCounts[state] > 0)
                .map((state) => (
                  <span key={state} className={statusClass(state)}>
                    {state} {statusCounts[state]}
                  </span>
                ))}
            </div>
            <p className="boundary-note">
              The site shows redacted metadata lanes only. Raw private records, transcripts, screenshots, credentials,
              and finance rows stay blocked.
            </p>
            <div className="link-row" aria-label="Public profiles">
              {feed.identity.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
            <div className="feed-stamp">
              <span>Feed generated</span>
              <strong>{generatedAt}</strong>
            </div>
          </aside>
        </div>
      </section>

      <section className="status-band" aria-labelledby="freshness-title">
        <div className="section-head">
          <p className="eyebrow">Live boundary</p>
          <h2 id="freshness-title">Freshness and gates</h2>
        </div>
        <div className="status-grid">
          {feed.statusStrip.map((item) => (
            <article key={item.id} className="status-item">
              <div className="status-line">
                <span className={statusClass(item.state)}>{item.state}</span>
                {item.asOf ? <time dateTime={item.asOf}>{new Date(item.asOf).toLocaleDateString("en-IN")}</time> : null}
              </div>
              <h3>{item.label}</h3>
              <p>{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" aria-labelledby="suite-title">
        <div className="section-head">
          <p className="eyebrow">Agentic suite</p>
          <h2 id="suite-title">Tools, adapters, and public-safe state</h2>
        </div>
        <div className="suite-grid">
          {feed.suiteLanes.map((lane) => (
            <article key={lane.id} className="lane-card">
              <div className="lane-top">
                <span className={statusClass(lane.state)}>{lane.state}</span>
                <span>{lane.role}</span>
              </div>
              <h3>{lane.name}</h3>
              <p>{lane.publicSummary}</p>
              <div className="metric-row">
                {lane.metrics.map((metric) => (
                  <span key={`${lane.id}-${metric.label}`}>
                    <strong>{metric.value}</strong>
                    {metric.label}
                  </span>
                ))}
              </div>
              <div className="boundary">
                <span>Boundary</span>
                <p>{lane.privacyBoundary}</p>
              </div>
              {lane.href ? (
                <a className="text-link" href={lane.href}>
                  Open public source
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="content-section tone-section" aria-labelledby="projects-title">
        <div className="section-head">
          <p className="eyebrow">Public candidates</p>
          <h2 id="projects-title">Projects cleared for metadata display</h2>
        </div>
        <div className="project-list">
          {feed.projects.map((project) => (
            <article key={project.id} className="project-row">
              <div>
                <span>{project.date}</span>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <aside>
                <strong>{project.stack}</strong>
                <span>{project.sourceStatus}</span>
                {project.href ? <a href={project.href}>Repository</a> : null}
              </aside>
            </article>
          ))}
        </div>
      </section>

      <section className="privacy-band" aria-labelledby="privacy-title">
        <div>
          <p className="eyebrow">Public data contract</p>
          <h2 id="privacy-title">Metadata-only adapter</h2>
          <p>{feed.privacy.summary}</p>
        </div>
        <div className="blocked-list" aria-label="Blocked source classes">
          {feed.privacy.forbiddenClasses.map((item) => (
            <span key={item}>{item.replaceAll("_", " ")}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
