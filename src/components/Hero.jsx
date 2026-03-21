'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import fallback from '../assets/intro.png';

export default function Hero() {
  // hero image, otherwise fallback bundled asset
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const roles = useMemo(() => [
    'Full Stack Developer',
    'Backend Developer',
    'Database Administrator',
  ], []);
  const roleClasses = useMemo(() => [
    'accent-frontend',
    'accent-backend',
    'accent-db',
  ], []);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typed, setTyped] = useState('');
  const [showAbout, setShowAbout] = useState(false);
  const [aboutRoleIndex, setAboutRoleIndex] = useState(0);
  const [aboutTypedLen, setAboutTypedLen] = useState(0);

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
    const id = setInterval(() => {
      setRoleIndex((i) => (i + 1) % roles.length);
    }, 4000);
    return () => clearInterval(id);
  }, [roles.length]);

  useEffect(() => {
    let i = 0;
    const word = roles[roleIndex];
    setTyped('');
    const int = setInterval(() => {
      i += 1;
      setTyped(word.slice(0, i));
      if (i >= word.length) {
        clearInterval(int);
      }
    }, 70);
    return () => clearInterval(int);
  }, [roleIndex, roles]);

  useEffect(() => {
    if (!showAbout) return;
    setAboutRoleIndex(0);
    setAboutTypedLen(0);
  }, [showAbout]);

  useEffect(() => {
    if (!showAbout) return;
    setAboutTypedLen(0);
    let i = 0;
    const total = roles[aboutRoleIndex].length;
    const int = setInterval(() => {
      i += 1;
      setAboutTypedLen(Math.min(i, total));
      if (i >= total) {
        clearInterval(int);
        setTimeout(() => {
          setAboutRoleIndex((idx) => (idx + 1) % roles.length);
        }, 1200);
      }
    }, 60);
    return () => clearInterval(int);
  }, [showAbout, aboutRoleIndex, roles]);

  return (
    <section className={`hero-outer ${visible ? 'hero-visible' : ''}`} id="home" ref={sectionRef}>
      <div className="hero-frame">
        <div className="hero-inner">
          <div className="hero-media reveal" style={{ transitionDelay: '60ms' }}>
          <Image
            src={fallback}
            alt="dumisane display picture"
            className="hero-image"
            priority
            width={400}
            height={400}
          />
        </div>

        <div className="hero-content reveal" style={{ transitionDelay: '140ms' }}>
          {!showAbout ? (
            <>
              <h1 className="hero-title">Hey There, I'm Dumisane Madondo {'{'}
                <span className={`role-item ${roleClasses[roleIndex]}`}>{typed}</span>
              {'}'}<br className="role-br" /></h1>
              <p className="hero-sub">passionate about creating scalable, user-friendly applications. Currently pursuing a Diploma in ICT Application Development at Cape Peninsula University of Technology, I combine academic knowledge with hands-on experience to design and refine systems that balance functionality with user experience. Driven by curiosity and innovation, I thrive on turning ideas into solutions that empower both users and teams.</p>
              <div className="hero-ctas">
                <button className="btn" type="button" onClick={() => setShowAbout(true)}>More About Me</button>
                <a href="/resume.pdf" download="Dumisane_Madondo_Resume.pdf" className="btn btn-outline">Download Resume</a>
              </div>
            </>
          ) : (
            <>
              <p className="hero-sub">My name is Dumisane Madondo, and I'm a <span className={`role-item ${roleClasses[aboutRoleIndex]}`}>{roles[aboutRoleIndex].slice(0, aboutTypedLen)}</span><br className="role-br" /> driven by a passion for building efficient, scalable, and user-friendly applications.</p>
              <p className="hero-sub">With a strong foundation in academics and hands‑on project experience, I thrive at the intersection of problem‑solving and innovation, consistently transforming complex challenges into practical solutions.</p>
              <p className="hero-sub">Currently pursuing a Diploma in ICT: Application Development at Cape Peninsula University of Technology, I focus on mastering modern development practices and applying them to real‑world projects. From reusable APIs to seamless web workflows, I approach each challenge with curiosity, resilience, and a commitment to excellence. </p>
              <p className="hero-sub">My journey is anchored in continuous learning and innovation, with the goal of crafting systems that empower both users and teams. I am eager to contribute to projects that push boundaries in development.</p>
              <div className="hero-ctas">
                <button className="btn btn-outline" type="button" onClick={() => setShowAbout(false)}>Show Less</button>
                <a href="/resume.pdf" download="Dumisane_Madondo_Resume.pdf" className="btn">Download Resume</a>
              </div>
            </>
          )}
        </div>

        </div>
      </div>
    </section>
  );
}
