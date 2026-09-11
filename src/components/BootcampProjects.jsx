'use client';
import React, { useEffect, useRef, useState } from 'react';

// ─── Tech stack category mapping ──────────────────────────────────────────────
// Categories mirror the Skills marquee colour system:
//   frontend  → blue     backend  → emerald
//   database  → amber    tools    → violet
//   ai        → rose (new, for AI/ML specific tools)
const techCategory = {
  // Frontend
  'React':           'frontend',
  'React 19':        'frontend',
  'Streamlit':       'frontend',
  'Tailwind CSS':    'frontend',
  'Recharts':        'frontend',
  'HTML':            'frontend',
  'CSS':             'frontend',
  // Backend
  'Python':          'backend',
  'Node.js':         'backend',
  'Node.js/Express': 'backend',
  'TypeScript':      'backend',
  'tRPC':            'backend',
  'PHP':             'backend',
  'JS Backend':      'backend',
  'Express':         'backend',
  // Database
  'SQLite':          'database',
  'JSON':            'database',
  'MySQL':           'database',
  'TiDB':            'database',
  'Drizzle ORM':     'database',
  // AI / ML
  'LLM API':         'ai',
  'VADER':           'ai',
  'Hugging Face':    'ai',
  'Manus AI':        'ai',
  'Manus OAuth':     'ai',
  // Tools / Platforms
  'Lovable':         'tools',
  'Manus':           'tools',
  'Figma':           'tools',
  'PDF Export':      'tools',
};

const getCategory = (tool) => techCategory[tool] || 'tools';

// ─── Project Data ─────────────────────────────────────────────────────────────
const bootcampProjects = [

  {
    title: 'PathFinder AI — Advanced',
    role: 'Backend Developer',
    roleContext: 'End-to-end build · 6-person team',
    objectives:
      'Evolved the Week 1 MVP into a full end-to-end AI product — broadened the pathway system beyond degree streams to Study / Work / Skills / Business / Not Sure tracks, added real user accounts, persistence, and moved toward a production-grade architecture.',
    technique:
      'Full-stack rebuild with authenticated sessions, persisted chat history, and saved user pathways. Backend services built on tRPC / Drizzle ORM against a relational database, with LLM calls routed through a managed AI gateway.',
    impact:
      'Took the project from a single-day prototype to the team\'s flagship end-to-end submission by the bootcamp\'s final week, adding authentication, persistence, and a broader multi-track recommendation system aligned with the team\'s ML coursework.',
    tools: [
      'React 19', 'TypeScript', 'Tailwind CSS',
      'Node.js/Express', 'tRPC', 'Drizzle ORM',
      'MySQL', 'TiDB', 'Manus OAuth', 'Manus AI',
    ],
    links: { github: '', live: '' },
  },
  {
    title: 'SentiX — Takealot InsightEngine',
    role: 'Project Manager',
    roleContext: '6-person team · Week 3 deadline',
    objectives:
      'Built an aspect-based sentiment analysis and interactive data-intelligence platform for Takealot app reviews, delivering a dashboard, insights report, and technical explanation as part of the bootcamp\'s portfolio requirements.',
    technique:
      'Aspect-Based Sentiment Analysis (ABSA) and urgency classification using a dual-engine approach (VADER + Hugging Face) for transparency. Interactive KPI dashboard with citation-linked chat allowing users to click a cited review ID and filter the dataset to that topic.',
    impact:
      'Directed a 6-person team (Researcher, 2× Backend, Frontend, UI/UX) through a full pivot in tech stack and scope, landing a dual-engine sentiment platform with 7 live KPIs, guest-accessible "Quick Analysis," and full account-gated business workspaces.',
    tools: [
      'React', 'Tailwind CSS', 'Recharts',
      'Node.js', 'JS Backend',
      'VADER', 'Hugging Face',
      'Lovable', 'Manus',
    ],
    links: { github: '', live: '' },
  },
  {
    title: 'OmniLens AI',
    role: 'Lead / Product Owner',
    roleContext: 'Solo concept & design',
    objectives:
      'Designed a source-grounded, multi-department project intelligence platform that ingests project documents as an immutable source of truth, flags cross-source conflicts, and generates role-calibrated artifacts (decks, posters, SOPs, flashcards) for different departments.',
    technique:
      'Shared source pool with department "lens" applied at generation time rather than pre-sorted document buckets. Hard-conflict detection with soft advisory overrides. Cached, versioned lens outputs (by lens + artifact + source-set) flagged stale rather than auto-invalidated on source change.',
    impact:
      'Independently scoped and designed a full product concept end-to-end — from MVP definition through to a 5-lens, auth-enabled, analytics-integrated build spec — demonstrating solo product thinking and UX/architecture design skill outside a team structure.',
    tools: ['Lovable', 'Figma', 'PDF Export'],
    links: { github: '', live: '' },
  },
  {
    title: 'PathFinder AI — Week 1 MVP',
    role: 'Lead Researcher',
    roleContext: '1-week rotation · 6-person team',
    objectives:
      'Built an interactive diagnostic chatbot to help South African Grade 10–12 learners explore university course streams and career paths, using a lightweight prompt-based architecture deliverable within a single day.',
    technique:
      'Prompt-based content recommendation — the LLM handled state management and recommendations via system instructions plus an embedded JSON course catalog. A 3–4 question flow (subjects enjoyed, work style, problem-solving style) generated a personalized "Career Profile" with recommended degree streams and academic advice.',
    impact:
      'Delivered a working diagnostic MVP within the team\'s single-day build window, validating the prompt-based recommender approach and setting the foundation the team carried into the Week 4 advanced build.',
    tools: ['Python', 'Streamlit', 'LLM API', 'SQLite', 'JSON', 'Lovable'],
    links: { github: '', live: '' },
  }
];

// ─── Icons ────────────────────────────────────────────────────────────────────
function GitHubIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.85 9.67.5.1.65-.22.65-.49v-1.74c-2.79.61-3.37-1.21-3.37-1.21-.46-1.17-1.12-1.48-1.12-1.48-.91-.63.07-.62.07-.62 1.01.07 1.55 1.06 1.55 1.06.9 1.59 2.36 1.13 2.94.86.09-.67.35-1.13.64-1.39-2.23-.26-4.57-1.16-4.57-5.19 0-1.15.4-2.1 1.06-2.84-.11-.27-.46-1.36.1-2.83 0 0 .84-.27 2.76 1.08.8-.23 1.66-.34 2.52-.35.86.01 1.72.12 2.52.35 1.92-1.35 2.76-1.08 2.76-1.08.56 1.47.21 2.56.1 2.83.66.74 1.06 1.69 1.06 2.84 0 4.04-2.34 4.93-4.58 5.19.36.32.69.95.69 1.92v2.28c0 .27.15.59.65.49 3.98-1.35 6.85-5.17 6.85-9.67C22 6.58 17.52 2 12 2z" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function BootcampProjects() {
  const sectionRef = useRef(null);
  const sliderRef  = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll‑into‑view on mount (start on card 0)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Track which card is currently in focus so the "x / total" counter stays
  // in sync as the visitor scrolls or uses the prev/next arrows.
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    const updateActive = () => {
      const first = el.firstElementChild;
      if (!first) return;
      const style = getComputedStyle(el);
      const gap = parseFloat(style.columnGap || style.gap || '0') || 0;
      const cardW = first.getBoundingClientRect().width + gap;
      if (!cardW) return;
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveIndex(Math.min(Math.max(idx, 0), bootcampProjects.length - 1));
    };
    updateActive();
    el.addEventListener('scroll', updateActive, { passive: true });
    return () => el.removeEventListener('scroll', updateActive);
  }, []);

  const scrollBy = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    const first = el.firstElementChild;
    if (!first) return;
    const style = getComputedStyle(el);
    const gap   = parseFloat(style.columnGap || style.gap || '0') || 0;
    const cardW = first.getBoundingClientRect().width;
    el.scrollBy({ left: direction * (cardW + gap), behavior: 'smooth' });
  };

  return (
    <section
      className={`bp-section ${visible ? 'bp-visible' : ''}`}
      id="bootcamp-projects"
      ref={sectionRef}
    >
      <div className="section-divider reveal" />

      <div className="bp-container">
        {/* Header */}
        <div className="section-header reveal">
          <h2 className="section-title">Bootcamp Projects</h2>
          <p className="bp-subtitle">
            AI-focused products built during the ExploreAI / ALX bootcamp — from
            single-day MVPs to full end-to-end team submissions.
          </p>
        </div>

        {/* Slider */}
        <div className="bp-slider-wrapper reveal">
          <span className="bp-counter" aria-label={`Project ${activeIndex + 1} of ${bootcampProjects.length}`}>
            <span className="bp-counter-current">{activeIndex + 1}</span>
            <span className="bp-counter-sep">/</span>
            <span className="bp-counter-total">{bootcampProjects.length}</span>
          </span>
          <div className="bp-slider" ref={sliderRef}>
            {bootcampProjects.map((project, index) => (
              <div key={index} className="bp-slide">
                <div className="bp-card">
                  {/* ── Left Column ── */}
                  <div className="bp-card-left">
                    <div className="bp-role-badge">
                      <span>{project.role}</span>
                    </div>
                    <p className="bp-role-context">{project.roleContext}</p>

                    <h3 className="bp-title">{project.title}</h3>

                    <div className="bp-detail-block">
                      <h4 className="bp-detail-label">OBJECTIVE</h4>
                      <p className="bp-detail-text">{project.objectives}</p>
                    </div>

                    <div className="bp-detail-block">
                      <h4 className="bp-detail-label">TECHNIQUE</h4>
                      <p className="bp-detail-text">{project.technique}</p>
                    </div>

                    <div className="bp-detail-block">
                      <h4 className="bp-detail-label">IMPACT</h4>
                      <p className="bp-detail-text">{project.impact}</p>
                    </div>
                  </div>

                  {/* ── Right Column ── */}
                  <div className="bp-card-right-wrapper">
                    <div className="bp-card-right">
                      <h4 className="bp-detail-label">TECH STACK</h4>
                      <div className="bp-tech-tags">
                        {project.tools.map((tool, ti) => (
                          <span
                            key={ti}
                            className="bp-tech-tag"
                            data-category={getCategory(tool)}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Link Buttons — pinned to bottom, sharing full width */}
                    <div className="bp-links">
                      <a
                        href={project.links.github || '#'}
                        target={project.links.github ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className={`bp-link-icon bp-link-github${!project.links.github ? ' bp-link-disabled' : ''}`}
                        aria-label="GitHub Repository"
                        onClick={e => { if (!project.links.github) e.preventDefault(); }}
                      >
                        <GitHubIcon />
                        <span>Visit GitHub</span>
                      </a>
                      <a
                        href={project.links.live || '#'}
                        target={project.links.live ? '_blank' : undefined}
                        rel="noopener noreferrer"
                        className={`bp-link-icon bp-link-live${!project.links.live ? ' bp-link-disabled' : ''}`}
                        aria-label="Live Site"
                        onClick={e => { if (!project.links.live) e.preventDefault(); }}
                      >
                        <span>Visit Link</span>
                        <ExternalLinkIcon />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            className="slider-nav prev"
            onClick={() => scrollBy(-1)}
            aria-label="Previous project"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="nav-arrow-icon">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            className="slider-nav next"
            onClick={() => scrollBy(1)}
            aria-label="Next project"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="nav-arrow-icon">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
