'use client';
import React, { useEffect, useRef, useState } from 'react';

export default function AcademicBackground() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const education = [
    {
      degree: "Secondary Education",
      institution: "Madisong Secondary School",
      class: "Class of 2021",
      status: "National Senior Certificate",
      description: "Built a strong academic foundation with a focus on Mathematics, Physics, and Geography, developing analytical thinking and problem‑solving skills that continue to shape my approach to technology and system design.",
      modules: [
        "Mathematics",
        "Physical Sciences",
        "English First Additional Language",
        "Life Sciences",
        "Geography"
      ]
    },
    {
      degree: "Higher Certificate in Information, Communication & Technology",
      institution: "Cape Peninsula University of Technology (CPUT)",
      class: "Class of 2023",
      status: "Completed Qualification",
      description: "A foundational qualification that introduced me to the principles of Information and Communication Technology, equipping me with essential technical and problem-solving skills for both academic progression and industry readiness.",
      modules: [
        "Information Systems Fundamentals",
        "Programming Basics",
        "Database Fundamentals",
        "Computer Literacy",
        "Communication Skills",
        "Mathematics for ICT "
      ]
    },
    {
      degree: "Diploma in ICT: Application Development",
      institution: "Cape Peninsula University of Technology (CPUT)",
      class: "Ongoing",
      status: "In Progress",
      description: "A comprehensive qualification focused on designing, developing, and maintaining software applications, with strong emphasis on backend systems, database design, and bridging academic knowledge with industry practice.",
      modules: [
        "Software Development",
        "Database Design & Management",
        "Systems Analysis & Design (UML)",
        "Project Management",
        "Testing & Quality Assurance",
        "Professional Communication"
      ]
    },
    {
      degree: "Advanced Diploma in ICT: Application Development",
      institution: "Cape Peninsula University of Technology (CPUT)",
      class: "Upcoming",
      status: "Pending",
      description: "An advanced qualification designed to deepen expertise in software engineering, enterprise systems, and applied research, preparing graduates for leadership roles in ICT projects and bridging academic knowledge with industry innovation.",
      modules: [
        "Advanced Software Engineering",
        "Database Optimization & Big Data",
        "Systems Integration",
        "Research Methods in ICT",
        "Project Leadership & Management",
        "Emerging Technologies"
      ]
    }
  ];

  // Auto-focus on the 'In Progress' qualification on load
  useEffect(() => {
    const inProgressIndex = education.findIndex(item => item.status === "In Progress");
    if (inProgressIndex !== -1) {
      setCurrentIndex(inProgressIndex);
    }
  }, []); // Only run once on mount

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % education.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + education.length) % education.length);
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisible(true);
        obs.disconnect();
      }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section className={`academic-section ${visible ? 'academic-visible' : ''}`} id="academic" ref={sectionRef}>
      <div className="section-divider reveal"></div>
      <div className="academic-container">
        <div className="section-header reveal">
          <h2 className="section-title">Academic Foundation</h2>
          <p className="academic-subtitle">
            A learning journey shaped by dedication and progress.
          </p>
        </div>

        <div className="academic-slider-wrapper reveal">
          <div 
            className="academic-slider" 
            style={{ 
              transform: `translateX(calc(7.5% - ${currentIndex * 85}% - ${currentIndex}rem))` 
            }}
          >
            {education.map((item, index) => (
              <div 
                key={index} 
                className={`academic-slide ${index === currentIndex ? 'active' : ''}`}
              >
                <div className="academic-card">
                  <div className="card-left">
                    <div className={`status-badge ${item.status.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span>{item.status}</span>
                </div>
                    <h3 className="degree-title">{item.degree}</h3>
                    <p className="institution-info">{item.institution} • {item.class}</p>
                    <p className="degree-description">{item.description}</p>
                  </div>

                  <div className="card-right">
                    <h4 className="modules-heading">CORE MODULES</h4>
                    <ul className="modules-list">
                      {item.modules.map((mod, mi) => (
                        <li key={mi} className="module-item">
                          <span className="bullet"></span>
                          {mod}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="slider-nav prev" onClick={prevSlide} aria-label="Previous slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>
          <button className="slider-nav next" onClick={nextSlide} aria-label="Next slide">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>

          <div className="slider-dots">
            {education.map((_, i) => (
              <button 
                key={i} 
                className={`dot ${i === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
