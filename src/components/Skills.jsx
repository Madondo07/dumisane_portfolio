'use client';
import React, { useEffect, useRef, useState } from "react";

function Icon({ name }) {
  if (name === "frontend") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5"/><path d="M8 21H3v-5"/><path d="M21 3l-7 7"/><path d="M3 21l7-7"/></svg>
    );
  }
  if (name === "backend") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="6" rx="2"/><rect x="3" y="14" width="18" height="6" rx="2"/></svg>
    );
  }
  if (name === "database") {
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v6c0 1.7 4 3 9 3s9-1.3 9-3V5"/><path d="M3 11v6c0 1.7 4 3 9 3s9-1.3 9-3v-6"/></svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 2h4v4h-4z"/><path d="M4 10h4v4H4z"/><path d="M16 10h4v4h-4z"/><path d="M10 18h4v4h-4z"/></svg>
  );
}

export default function Skills() {
  const groups = [
    { title: "Frontend", icon: "frontend", items: ["HTML/CSS", "JavaScript", "React", "Tailwind CSS", "Responsive Design", "Performance Optimization"] },
    { title: "Backend", icon: "backend", items: ["Java", "Python", "PHP", "REST APIs", "JWT Authentication", "Workflow Troubleshooting"] },
    { title: "Database", icon: "database", items: ["MySQL", "SQLite (Python)", "Schema Design", "Query Optimization", "Firebase/Firestore"] },
    { title: "Tools", icon: "tools", items: ["Git/GitHub", "VS Code", "Postman", "DevTools", "Figma", "Netlify"] },
  ];

  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
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

  return (
    <section className={`skills-section ${visible ? 'skills-visible' : ''}`} id="skills" ref={sectionRef}>
      <div className="skills-frame">
        <div className="skills-header reveal">
          <h2>Technical Skills</h2>
        </div>
        <div className="skills-grid">
          {groups.map((g, i) => (
            <div key={i} className="skill-item reveal" style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="skill-inner">
                <div className="skill-title">
                  <Icon name={g.icon} />
                  <span>{g.title}</span>
                </div>
                <div className="skill-divider" />
                <p className="skills-sentence">
                  {g.items.map((s) => s.toUpperCase()).join(", ")}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
