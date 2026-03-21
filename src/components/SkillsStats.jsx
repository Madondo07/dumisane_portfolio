'use client';
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Code, Database, Globe, Smartphone, Server, Terminal } from 'lucide-react';

export default function SkillsStats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const targets = useMemo(() => ([
    { label: "Frontend", rating: 9, icon: <Globe size={20} /> },
    { label: "Backend", rating: 8, icon: <Server size={20} /> },
    { label: "Database", rating: 8, icon: <Database size={20} /> },
    { label: "Mobile Dev", rating: 7, icon: <Smartphone size={20} /> },
    { label: "API Design", rating: 8, icon: <Code size={20} /> },
    { label: "DevOps/Tools", rating: 7, icon: <Terminal size={20} /> },
  ]), []);
  const [vals, setVals] = useState(targets.map(() => 0));
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setActive(true);
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!active || done) return;
    let cancelled = false;
    const timers = [];
    const delayPer = 260;
    targets.forEach((t, i) => {
      const timer = setTimeout(() => {
        if (cancelled) return;
        setVals((prev) => prev.map((v, idx) => (idx === i ? t.rating : v)));
      }, i * delayPer);
      timers.push(timer);
    });
    const doneTimer = setTimeout(() => { if (!cancelled) setDone(true); }, targets.length * delayPer + 300);
    timers.push(doneTimer);
    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [active, done, targets]);

  return (
    <section className={`stats-section ${active ? 'stats-visible' : ''}`} id="skills-stats" ref={ref}>
      <div className="stats-frame">
        <div className="section-header reveal">
          <h2 className="section-title">Skills Ratings</h2>
          <p className="stats-sub">Ratings showcasing technical progression.</p>
        </div>
        <div className="stats-grid">
          {targets.map((t, i) => (
            <div key={i} className="stat-card reveal" style={{ transitionDelay: `${i * 100}ms` }}>
              <div className="stat-info">
                <div className="stat-label-group">
                  <span className="stat-icon">{t.icon}</span>
                  <span className="stat-label">{t.label}</span>
                </div>
                <span className="stat-value">{vals[i]}/10</span>
              </div>
              <div className="stat-divider" />
              <div className="bar">
                <div className="bar-fill" style={{ width: `${(vals[i] / 10) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
