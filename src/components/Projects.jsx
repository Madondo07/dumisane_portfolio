'use client';
import React, { useEffect, useRef, useState } from "react";

// ─── Tech stack category mapping ──────────────────────────────────────────────
// Mirrors the category system used by Bootcamp Projects / Skills marquee:
//   frontend → blue     backend  → emerald
//   database → amber    tools    → violet
const techCategory = {
  // Frontend
  'Next.js':        'frontend',
  'React':           'frontend',
  'Tailwind CSS':    'frontend',
  'FullCalendar':    'frontend',
  'Swing':           'frontend',
  'HTML5':           'frontend',
  'CSS3':            'frontend',
  'JavaScript':      'frontend',
  // Backend
  'TypeScript':      'backend',
  'Supabase':        'backend',
  'Java':            'backend',
  'PHP':             'backend',
  // Database
  'JDBC':            'database',
  'MySQL':           'database',
  // Tools / Platforms
  'LocalNotifications': 'tools',
  'Figma':           'tools',
  'Fluent Icons':    'tools',
};

const getCategory = (tool) => techCategory[tool] || 'tools';

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

// ─── Project Data ─────────────────────────────────────────────────────────────
const projects = [
  {
    title: "Modern RSVP Platform",
    role: "Full-Stack Web App",
    roleContext: "Solo project · live on Vercel",
    objectives:
      "Provide a modern, reliable way to manage guests and capture RSVPs across multiple events with a single source of truth.",
    technique:
      "Server-first Next.js app backed by Supabase, with cautious localStorage fallback for offline resilience. Normalizes schema differences (guestId/guest_id/guestid, etc.), and delivers clear feedback for attendees and admins.",
    impact:
      "Enables streamlined guest management, a responsive UI, and secure data synchronization guided by Supabase RLS policies.",
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase"],
    links: {
      github: "https://github.com/Madondo07/birthday_rsvp",
      live: "https://hillarybdparty-rsvp.vercel.app",
    },
  },
  {
    title: "SafeRide",
    featured: true,
    role: "Full-Stack Web App",
    roleContext: "Group project · 🏆 2nd Place, hackathon",
    objectives:
      "Incorporate e-hailing services to streamline ride selection, availability and user safety.",
    technique:
      "TypeScript-first web app that connects to external ride-hailing and mapping APIs, uses a realtime update layer, and implements safety-focused UX (share route, emergency contact) plus push notifications.",
    impact:
      "Enables unified booking across providers, faster booking decisions, clearer availability, and improved rider confidence without jumping through multiple ride-booking platforms.",
    tools: ["React", "FullCalendar", "LocalNotifications"],
    links: {
      github: "https://github.com/Madondo07/saferide_system",
      live: "https://saferide-system.vercel.app/booking",
    },
  },
  {
    title: "Enrollment System App",
    role: "Desktop Application",
    roleContext: "Solo project · Java Swing",
    objectives:
      "Provide a reliable, easy-to-use system for managing student enrollment, course registration, and administrative workflows to reduce manual errors and make term registration faster and more transparent.",
    technique:
      "A modular Java-based application that models users (students, admins), courses, sections and enrollment workflows.",
    impact:
      "Streamlines course registration, prevents over-enrollment through capacity checks and waitlists, and improves transparency for students and staff.",
    tools: ["Java", "Swing", "JDBC"],
    links: {
      github: "https://github.com/Madondo07/enrollment_system_app/",
      live: "",
    },
  },
  {
    title: "CPUT Clinic Booking",
    role: "Full-Stack Web App",
    roleContext: "Group project · live on Netlify",
    objectives:
      "Streamline healthcare management for CPUT students and clinic staff by providing an intuitive appointment booking system with real-time queue management.",
    technique:
      "Full-stack web application architecture with role-based access control, RESTful API integration, and responsive SPA design for seamless cross-device user experience.",
    impact:
      "Improved clinic operational efficiency through automated appointment scheduling, real-time patient queue tracking, and comprehensive staff dashboard analytics.",
    tools: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL"],
    links: {
      github: "https://github.com/Madondo07/clinic_booking_cput",
      live: "https://clinicbookingsystem.netlify.app/",
    },
  },
  {
    title: "Sudoku Validator & Solver",
    role: "Algorithm & Tooling",
    roleContext: "Solo project · Java console app",
    objectives:
      "Provide a reliable tool to validate Sudoku solutions and solve incomplete 9x9 Sudoku puzzles entered by the user.",
    technique:
      "Deterministic backtracking solver with row/column/3x3-block constraint checking and zero (0) as the marker for empty cells.",
    impact:
      "Enables automatic validation and solving of puzzles, useful for learning algorithms, verifying solutions, and assisting puzzle solvers, while demonstrating classic algorithmic problem solving.",
    tools: ["Java"],
    links: {
      github: "https://github.com/Madondo07/SodukoChecker",
      live: "",
    },
  },
  {
    title: "Airbnb Booking UX Flow",
    role: "UI/UX Design",
    roleContext: "Group project · Figma prototype",
    objectives:
      "Design a seamless and intuitive user interface for booking and managing reservations on the Airbnb platform, optimized for mobile devices.",
    technique:
      "Modular design using Figma frames for reservation, confirmation, wishlist, and payment, with a smart comparison UI and AI-driven personalized recommendations.",
    impact:
      "The comparison feature empowers users to choose listings confidently; the design anticipates future AI modules for personalized recommendations.",
    tools: ["Figma", "Fluent Icons"],
    links: {
      github: "",
      live: "https://www.figma.com/design/bTjx2dsMvyGEZfBvagpXBp/Airbnb-MAF?node-id=0-1&p=f&t=u2rr9CVcNzxhXq9O-0",
    },
  },
];

// ─── Component ────────────────────────────────────────────────────────────────
function Projects() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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
      { threshold: 0.1 }
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
      const gap = parseFloat(style.columnGap || style.gap || "0") || 0;
      const cardW = first.getBoundingClientRect().width + gap;
      if (!cardW) return;
      const idx = Math.round(el.scrollLeft / cardW);
      setActiveIndex(Math.min(Math.max(idx, 0), projects.length - 1));
    };
    updateActive();
    el.addEventListener("scroll", updateActive, { passive: true });
    return () => el.removeEventListener("scroll", updateActive);
  }, []);

  const scrollBy = (direction) => {
    const el = sliderRef.current;
    if (!el) return;
    const first = el.firstElementChild;
    if (!first) return;
    const style = getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || "0") || 0;
    const cardW = first.getBoundingClientRect().width;
    el.scrollBy({ left: direction * (cardW + gap), behavior: "smooth" });
  };

  return (
    <section
      className={`ap-section ${visible ? "ap-visible" : ""}`}
      id="projects"
      ref={sectionRef}
    >
      <div className="section-divider reveal" />

      <div className="ap-container">
        {/* Header */}
        <div className="section-header reveal">
          <h2 className="section-title">Applied Projects</h2>
          <p className="ap-subtitle">
            Projects I've worked on, with a focus on creating user-friendly
            and impactful solutions.
          </p>
        </div>

        {/* Slider */}
        <div className="ap-slider-wrapper reveal">
          <span className="ap-counter" aria-label={`Project ${activeIndex + 1} of ${projects.length}`}>
            <span className="ap-counter-current">{activeIndex + 1}</span>
            <span className="ap-counter-sep">/</span>
            <span className="ap-counter-total">{projects.length}</span>
          </span>
          <div className="ap-slider" ref={sliderRef}>
            {projects.map((project, index) => (
              <div key={index} className="ap-slide">
                <div className={`ap-card ${project.featured ? "ap-featured" : ""}`}>
                  {project.featured && (
                    <span className="ap-achievement-badge">2nd Place</span>
                  )}

                  {/* ── Left Column ── */}
                  <div className="ap-card-left">
                    <div className="ap-role-badge">
                      <span>{project.role}</span>
                    </div>
                    <p className="ap-role-context">{project.roleContext}</p>

                    <h3 className="ap-title">{project.title}</h3>

                    <div className="ap-detail-block">
                      <h4 className="ap-detail-label">OBJECTIVE</h4>
                      <p className="ap-detail-text">{project.objectives}</p>
                    </div>

                    <div className="ap-detail-block">
                      <h4 className="ap-detail-label">TECHNIQUE</h4>
                      <p className="ap-detail-text">{project.technique}</p>
                    </div>

                    <div className="ap-detail-block">
                      <h4 className="ap-detail-label">IMPACT</h4>
                      <p className="ap-detail-text">{project.impact}</p>
                    </div>
                  </div>

                  {/* ── Right Column ── */}
                  <div className="ap-card-right-wrapper">
                    <div className="ap-card-right">
                      <h4 className="ap-detail-label">TECH STACK</h4>
                      <div className="ap-tech-tags">
                        {project.tools.map((tool, ti) => (
                          <span
                            key={ti}
                            className="ap-tech-tag"
                            data-category={getCategory(tool)}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Link Buttons — pinned to bottom, sharing full width */}
                    <div className="ap-links">
                      <a
                        href={project.links.github || "#"}
                        target={project.links.github ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className={`ap-link-icon ap-link-github${!project.links.github ? " ap-link-disabled" : ""}`}
                        aria-label="GitHub Repository"
                        onClick={(e) => { if (!project.links.github) e.preventDefault(); }}
                      >
                        <GitHubIcon />
                        <span>Visit GitHub</span>
                      </a>
                      <a
                        href={project.links.live || "#"}
                        target={project.links.live ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        className={`ap-link-icon ap-link-live${!project.links.live ? " ap-link-disabled" : ""}`}
                        aria-label="Live Site"
                        onClick={(e) => { if (!project.links.live) e.preventDefault(); }}
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

export default Projects;
