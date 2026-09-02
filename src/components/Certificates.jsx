'use client';
import React, { useEffect, useRef, useState } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATE DATA
// Drop your certificate PDFs into /public/certificates/
// and update the `file` field to match the filename you used.
// ─────────────────────────────────────────────────────────────────────────────
const categories = [
  {
    id: 'google-ai',
    title: 'Google AI Essentials',
    icon: 'sparkle',
    courses: [
      { name: 'Google AI Essentials Professional Certificate', file: 'google-ai-essentials.pdf' },
    ],
  },
  {
    id: 'ml',
    title: 'AI & Machine Learning',
    icon: 'robot',
    courses: [
      { name: 'Unsupervised Machine Learning: Clustering and Association', file: 'unsupervised-ml.pdf' },
      { name: 'Supervised Machine Learning: Regression and Classification',   file: 'supervised-ml.pdf' },
      { name: 'Generative AI with LLMs',                                      file: 'generative-ai-llm.pdf' },
      { name: 'Introduction to Artificial Intelligence (AI)',                  file: 'introduction-ai.pdf' },
      { name: 'Introduction to Generative AI',                                file: 'introduction-generative-ai.pdf' },
    ],
  },
  {
    id: 'productivity',
    title: 'Productivity & AI Tools',
    icon: 'lightning',
    courses: [
      { name: 'Generative AI: Prompt Engineering Basics', file: 'generative-ai-propmt-engineering-basics.pdf' },
      { name: 'AI For Everyone',                          file: 'ai-for-everyone.pdf' },
    ],
  },
];

// ─── Icon Components ──────────────────────────────────────────────────────────
function CategoryIcon({ name }) {
  if (name === 'brain') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 3a3 3 0 0 0-3 3v1a3 3 0 0 0-3 3 3 3 0 0 0 3 3v1a3 3 0 0 0 3 3h1" />
      <path d="M15 3a3 3 0 0 1 3 3v1a3 3 0 0 1 3 3 3 3 0 0 1-3 3v1a3 3 0 0 1-3 3h-1" />
      <line x1="12" y1="3" x2="12" y2="21" />
    </svg>
  );
  if (name === 'sparkle') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
    </svg>
  );
  if (name === 'robot') return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="10" rx="2"/>
      <path d="M12 2v4M8 11V7a4 4 0 0 1 8 0v4"/>
      <circle cx="9" cy="16" r="1" fill="currentColor"/>
      <circle cx="15" cy="16" r="1" fill="currentColor"/>
      <path d="M8 20h8"/>
    </svg>
  );
  // lightning
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Certificates() {
  const sectionRef = useRef(null);
  const [visible, setVisible]         = useState(false);
  const [openId, setOpenId]           = useState(categories[0].id); // first open by default
  const [modal, setModal]             = useState(null); // { name, file }

  // Intersection observer for entry animation
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    if (!modal) return;
    const handler = (e) => { if (e.key === 'Escape') setModal(null); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [modal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = modal ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [modal]);

  const toggle = (id) => setOpenId(prev => (prev === id ? null : id));

  return (
    <section
      className={`certs-section ${visible ? 'certs-visible' : ''}`}
      id="certificates"
      ref={sectionRef}
    >

      <div className="certs-container">
        {/* Header */}
        <div className="section-header reveal">
          <h2 className="certs-eyebrow">CERTIFICATES</h2>
          <p className="section-title">Continuous Learning</p>
          <p className="certs-subtitle">Expand each category to view courses.</p>
        </div>

        {/* Accordion */}
        <div className="certs-accordion reveal">
          {categories.map((cat) => {
            const isOpen = openId === cat.id;
            return (
              <div key={cat.id} className={`certs-group ${isOpen ? 'certs-group--open' : ''}`}>
                {/* Group header (clickable row) */}
                <button
                  className="certs-group-header"
                  onClick={() => toggle(cat.id)}
                  aria-expanded={isOpen}
                >
                  <span className="certs-group-icon">
                    <CategoryIcon name={cat.icon} />
                  </span>
                  <span className="certs-group-info">
                    <span className="certs-group-title">{cat.title}</span>
                    <span className="certs-group-count">{cat.courses.length} course{cat.courses.length !== 1 ? 's' : ''}</span>
                  </span>
                  <span className="certs-group-badge">{cat.courses.length}</span>
                  <span className="certs-group-chevron">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <polyline points={isOpen ? '18 15 12 9 6 15' : '6 9 12 15 18 9'} />
                    </svg>
                  </span>
                </button>

                {/* Expandable course list */}
                {isOpen && (
                  <div className="certs-course-list">
                    {cat.courses.map((course, i) => (
                      <div key={i} className="certs-course-row">
                        <span className="certs-course-name">{course.name}</span>
                        <button
                          className="certs-view-btn"
                          onClick={() => setModal(course)}
                          aria-label={`View certificate: ${course.name}`}
                        >
                          View&nbsp;
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                            <polyline points="15 3 21 3 21 9"/>
                            <line x1="10" y1="14" x2="21" y2="3"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Certificate Modal ── */}
      {modal && (
        <div className="cert-modal-overlay" onClick={() => setModal(null)} role="dialog" aria-modal="true" aria-label={modal.name}>
          <div className="cert-modal" onClick={(e) => e.stopPropagation()}>
            {/* Close button */}
            <div className="cert-modal-header">
              <p className="cert-modal-name">{modal.name}</p>
              <button className="cert-modal-close" onClick={() => setModal(null)} aria-label="Close">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>

            {/* PDF viewer — toolbar=0 hides Chrome/Edge download & print buttons */}
            <div className="cert-pdf-wrapper">
              <iframe
                key={modal.file}
                src={`/certificates/${modal.file}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                title={modal.name}
                className="cert-modal-pdf"
              />
              {/* Transparent overlay blocks right-click save-as on the PDF */}
              <div className="cert-pdf-guard" onContextMenu={(e) => e.preventDefault()} />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
