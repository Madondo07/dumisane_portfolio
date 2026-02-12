'use client';
import React, { useRef, useEffect, useState } from "react";

function Projects() {
  const projects = [
    {
      title: "Mordern RSVP Platform",
      objective: "Provide a modern, reliable way to manage guests and capture RSVPs across multiple events with a single source of truth.",
      technique: "Server-first Next.js app backed by Supabase, with cautious localStorage fallback for offline resilience. Normalizes schema differences (guestId/guest_id/guestid, etc.), and delivers clear feedback for attendees and admins.",
      tools: "Next.js, TypeScript, Tailwind CSS, Supabase. Enables streamlined guest management, responsive UI, and secure data synchronization guided by Supabase RLS policies.",
      demo: "https://hillarybdparty-rsvp.vercel.app",
      repo: "https://github.com/Madondo07/birthday_rsvp"
},
{
      title: "SafeRide",
      objective: "Incorporate e-hailing services streamline ride selection, availability and user safety.",
      technique: "TypeScript first web app that connects to external ride hailing and mapping APIs, uses a realtime update layer, and implements safety focused UX (share route, emergency contact) plus push notifications.",
      tools: "React, FullCalendar, LocalNotifications. Enables unified booking across providers, faster booking decisions, clearer availability, and improved rider confidence without jumping through multiple ride booking platforms.",
      demo: "https://saferide-system.vercel.app/booking",
      repo: "https://github.com/Madondo07/saferide_system",
    },
    {
      title: "Enrollment System App",
      objective: "Provide a reliable, easy-to-use system for managing student enrollment, course registration, and administrative workflows to reduce manual errors and make term registration faster and more transparent.",
      technique: "A modular Java-based application that models users (students, admins), courses, sections and enrollment workflows.",
      tools: "Java, Swing and JDBC. Streamlines course registration, prevents over-enrollment through capacity checks and waitlists, and improves transparency for students and staff.",
      demo: "https://github.com/Madondo07/enrollment_system_app/",
      repo: "",
    },
    {
      title: "CPUT Clinic Booking",
      objective: "Streamline healthcare management for CPUT students and clinic staff by providing an intuitive appointment booking system with real-time queue management.",
      technique: "Full-stack web application architecture with role-based access control, RESTful API integration, and responsive SPA design for seamless cross-device user experience.",
      tools: "HTML5, CSS3, JavaScript, PHP 7.4+, MySQL. Improved clinic operational efficiency through automated appointment scheduling, real-time patient queue tracking, and comprehensive staff dashboard analytics.",
      demo: "https://clinicbookingsystem.netlify.app/",
      repo: "https://github.com/Madondo07/clinic_booking_cput",
    },
    {
      title: "Sudoku Validator & Solver",
      objective: "Provide a reliable tool to validate Sudoku solutions and solve incomplete 9x9 Sudoku puzzles entered by the user.",
      technique: "Deterministic backtracking solver with row/column/3x3-block constraint checking and zero (0) as the marker for empty cells.",
      tools: "Java console program. Enables automatic validation and solving of puzzles, useful for learning algorithms, verifying solutions, and assisting puzzle solvers. Improves correctness checking and demonstrates classic algorithmic problem solving.",
      demo: "https://github.com/Madondo07/SodukoChecker",
      repo: "",
    },
    {
      title: "Airbnb Booking UX Flow",
      objective: "Design a seamless and intuitive user interface for booking and managing reservations on the Airbnb platform, optimized for mobile devices.",
      technique: "Modular design using Figma frames for reservation, confirmation, wishlist, and payment. With smart comparison UI and AI-driven personalized recommendations.",
      tools: "Figma, Fluent Icons. Comparison feature empowers users to choose listings confidently, design anticipates future AI modules for personalized recommendations.",
      demo: "https://www.figma.com/design/bTjx2dsMvyGEZfBvagpXBp/Airbnb-MAF?node-id=0-1&p=f&t=u2rr9CVcNzxhXq9O-0",
      repo: "",
    },
  ];

  const carouselRef = useRef(null);
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(true);
  const handleView = (project) => {
    const url = project?.demo || project?.repo;
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };
  const handleRepo = (project) => {
    const url = project?.repo;
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const scrollBy = (dir) => {
    const el = carouselRef.current;
    if (!el) return;
    const first = el.firstElementChild;
    const style = getComputedStyle(el);
    const gap = parseFloat(style.columnGap || style.gap || "0") || 0;
    const cardW = first ? first.getBoundingClientRect().width : Math.max(el.clientWidth / 3, 240);
    const amount = cardW + gap;
    const target = el.scrollLeft + (dir === "left" ? -amount : amount);
    el.scrollTo({ left: target, behavior: "smooth" });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const frame = sectionRef.current;
    const container = carouselRef.current;
    if (!frame || !container) return;
    const calc = () => {
      const inners = container.querySelectorAll('.project-inner');
      let max = 0;
      inners.forEach((n) => { max = Math.max(max, n.offsetHeight || 0); });
      const extra = 56; // leave space for actions
      frame.style.setProperty('--card-h', `${max + extra}px`);
    };
    calc();
    const ro = new ResizeObserver(calc);
    const inners = container.querySelectorAll('.project-inner');
    inners.forEach((n) => ro.observe(n));
    window.addEventListener('resize', calc);
    return () => {
      window.removeEventListener('resize', calc);
      ro.disconnect();
    };
  }, [projects.length, visible]);

  return (
    <section className={`projects-section ${visible ? "projects-visible" : ""}`} id="projects" ref={sectionRef}>
      <div className="projects-frame">
        <div className="projects-header reveal">
          <h2>Projects</h2>
          <p className="projects-sub">Projects I've worked on, with a focus on creating user-friendly and impactful solutions.</p>
        </div>
        <div className="projects-carousel reveal" ref={carouselRef}>
          {projects.map((project, index) => (
            <div key={index} className={`project-item reveal ${project.title === 'SafeRide' ? 'featured' : ''}`} style={{ transitionDelay: `${index * 140}ms` }}>
              <div className="project-inner">
                {project.title === 'SafeRide' ? (
                  <span className="project-badge">2nd Place</span>
                ) : null}
                <h3 className="project-title">{project.title}</h3>
                <div className="project-divider"></div>
                <ul className="project-list">
                  <li><strong>Objective:</strong> {project.objective}</li>
                  <li><strong>Technique:</strong> {project.technique}</li>
                  <li><strong>Tools & impact:</strong> {project.tools}</li>
                </ul>
                <div className="project-actions">
                  <button className="project-btn" type="button" onClick={() => handleView(project)}>
                    <span>View Project</span>
                    <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><path d="M15 3h6v6"/><path d="M10 14 21 3"/></svg>
                  </button>
                  {project.repo && (
                    <button className="project-icon-btn" type="button" aria-label="Open GitHub Repo" onClick={() => handleRepo(project)}>
                      <svg className="btn-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" focusable="false" aria-hidden="true" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.85 9.67.5.1.65-.22.65-.49v-1.74c-2.79.61-3.37-1.21-3.37-1.21-.46-1.17-1.12-1.48-1.12-1.48-.91-.63.07-.62.07-.62 1.01.07 1.55 1.06 1.55 1.06.9 1.59 2.36 1.13 2.94.86.09-.67.35-1.13.64-1.39-2.23-.26-4.57-1.16-4.57-5.19 0-1.15.4-2.1 1.06-2.84-.11-.27-.46-1.36.1-2.83 0 0 .84-.27 2.76 1.08.8-.23 1.66-.34 2.52-.35.86.01 1.72.12 2.52.35 1.92-1.35 2.76-1.08 2.76-1.08.56 1.47.21 2.56.1 2.83.66.74 1.06 1.69 1.06 2.84 0 4.04-2.34 4.93-4.58 5.19.36.32.69.95.69 1.92v2.28c0 .27.15.59.65.49 3.98-1.35 6.85-5.17 6.85-9.67C22 6.58 17.52 2 12 2z"/>
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="projects-controls reveal" style={{ transitionDelay: `${projects.length * 140}ms` }}>
          <button className="proj-arrow left" aria-label="Previous" onClick={() => scrollBy("left")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="proj-arrow right" aria-label="Next" onClick={() => scrollBy("right")}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Projects;
