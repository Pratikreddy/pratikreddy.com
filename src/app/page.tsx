import {
  readPublicSuiteFeed,
  type PublicConfirmationStatus,
  type PublicStatusState,
} from "@/lib/public-suite-feed";

function statusClass(state: PublicStatusState) {
  return `status-pill status-${state}`;
}

function confirmationClass(state: PublicConfirmationStatus) {
  return `confirm-pill confirm-${state}`;
}

function confirmationLabel(state: PublicConfirmationStatus) {
  if (state === "needs_ceo_confirmation") return "to confirm";
  if (state === "review_gated") return "review gated";
  return "confirmed";
}

export default async function Home() {
  const feed = await readPublicSuiteFeed();
  const confirmedEducation = feed.education.filter((item) => item.confirmationStatus === "confirmed");
  const reviewItems = feed.timeline.filter((item) => item.confirmationStatus !== "confirmed");
  const generatedAt = new Date(feed.generatedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <main>
      <section className="life-hero" aria-labelledby="site-title">
        <div className="hero-shell">
          <div className="hero-story">
            <p className="eyebrow">{feed.copyBlocks.heroKicker}</p>
            <h1 id="site-title">{feed.identity.name}</h1>
            <p className="hero-title">{feed.copyBlocks.heroTitle}</p>
            <p className="hero-body">{feed.copyBlocks.heroBody}</p>
            <div className="hero-links" aria-label="Public links">
              {feed.identity.links.map((link) => (
                <a key={link.href} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <aside className="identity-panel" aria-label="Public identity summary">
            <div className="archive-mark" aria-hidden="true">
              <span>2014</span>
              <span>2016</span>
              <span>2020</span>
              <span>2021</span>
              <span>2022</span>
              <span>2026</span>
            </div>
            <div className="identity-copy">
              <span>{feed.identity.locationPublic}</span>
              <strong>{feed.identity.headline}</strong>
              <p>{feed.copyBlocks.thesis}</p>
            </div>
            <dl className="quick-facts">
              <div>
                <dt>timeline</dt>
                <dd>{feed.timeline.length}</dd>
              </div>
              <div>
                <dt>education</dt>
                <dd>{confirmedEducation.length}</dd>
              </div>
              <div>
                <dt>proof</dt>
                <dd>{feed.proofItems.length}</dd>
              </div>
              <div>
                <dt>review</dt>
                <dd>{reviewItems.length}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="section-shell" aria-labelledby="tracks-title">
        <div className="section-head">
          <p className="eyebrow">What shaped this</p>
          <h2 id="tracks-title">Life tracks before project cards.</h2>
        </div>
        <div className="track-grid">
          {feed.lifeTracks.map((track) => (
            <article key={track.id} className="track-card">
              <div className="card-topline">
                <span>{track.label}</span>
                <span className={confirmationClass(track.confirmationStatus)}>
                  {confirmationLabel(track.confirmationStatus)}
                </span>
              </div>
              <h3>{track.title}</h3>
              <p>{track.summary}</p>
              <em>{track.status}</em>
            </article>
          ))}
        </div>
      </section>

      <section className="timeline-section" aria-labelledby="timeline-title">
        <div className="section-shell timeline-shell">
          <div className="section-copy">
            <p className="eyebrow">Timeline and education</p>
            <h2 id="timeline-title">The spine starts with the life record.</h2>
            <p>{feed.copyBlocks.educationIntro}</p>
          </div>
          <div className="timeline-list" aria-label="Public timeline">
            {feed.timeline.map((item) => (
              <article key={item.id} className="timeline-item">
                <time>{item.date}</time>
                <div>
                  <span className={confirmationClass(item.confirmationStatus)}>
                    {confirmationLabel(item.confirmationStatus)}
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.publicSummary}</p>
                  <em>{item.lane} / {item.confidence}</em>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell split-proof" aria-labelledby="education-title">
        <div>
          <p className="eyebrow">Education</p>
          <h2 id="education-title">Public metadata, not raw documents.</h2>
          <div className="education-list">
            {feed.education.map((item) => (
              <article key={item.id} className="education-row">
                <span>{item.year}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.institution}</p>
                  <small>{item.privacyBoundary}</small>
                </div>
              </article>
            ))}
          </div>
        </div>
        <aside className="proof-panel">
          <p className="eyebrow">Redacted proof</p>
          {feed.proofItems.map((item) => (
            <article key={item.id}>
              <span>{item.year}</span>
              <h3>{item.title}</h3>
              <p>{item.issuer}</p>
              <small>{item.redactionNote}</small>
            </article>
          ))}
        </aside>
      </section>

      <section className="section-shell" aria-labelledby="suite-title">
        <div className="section-head">
          <div>
            <p className="eyebrow">Current operating layer</p>
            <h2 id="suite-title">The agentic suite supports the archive.</h2>
          </div>
          <p className="section-note">{feed.copyBlocks.agenticSuiteIntro}</p>
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
                  Public source
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell project-section" aria-labelledby="projects-title">
        <div className="section-head">
          <p className="eyebrow">Public work</p>
          <h2 id="projects-title">Projects are proof, not the whole identity.</h2>
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
          <h2 id="privacy-title">Metadata-only boundary</h2>
          <p>{feed.copyBlocks.privacyIntro}</p>
          <small>Feed generated {generatedAt}</small>
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
