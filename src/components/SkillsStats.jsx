import React, { useEffect, useMemo, useRef, useState } from "react";
import "./skills-stats.css";

export default function SkillsStats() {
  const ref = useRef(null);
  const [active, setActive] = useState(false);
  const targets = useMemo(() => ([
    { label: "Frontend", rating: 9 },
    { label: "Backend", rating: 8 },
    { label: "Database", rating: 7 },
    { label: "Tools", rating: 8 },
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
        <div className="stats-header reveal">
          <h2>Skills Ratings</h2>
          <p className="stats-sub">Ratings out of 10 for core areas</p>
        </div>
        <div className="stats-grid">
          {targets.map((t, i) => (
            <div key={t.label} className="stat-item reveal" style={{ transitionDelay: `${i * 120}ms` }}>
              <div className="stat-inner">
                <div className="stat-title">
                  <span>{t.label}</span>
                  <span className="stat-value">{vals[i]}/10</span>
                </div>
                <div className="stat-divider" />
                <div className="bar">
                  <div className="bar-fill" style={{ width: `${(vals[i] / 10) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}