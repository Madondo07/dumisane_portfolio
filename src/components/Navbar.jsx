'use client';
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../assets/logomain2.png";
import ThemeToggle from './ThemeToggle';

function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();
  const pathname = router.pathname;

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  const navLinks = [
    { label: "Skills", id: "skills" },
    { label: "Academic", id: "academic" },
    { label: "Projects", id: "projects" },
    { label: "Contact", id: "contact", isLink: true },
  ];

  const handleNavClick = (link) => {
    closeMenu();
    if (link.isLink) {
      router.push("/contact");
      return;
    }
    const id = link.id;
    if (pathname !== "/") {
      router.push("/");
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const HIDE_AT = 280;
    const SHOW_AT = 240;
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || 0;
          if (y > HIDE_AT && !isOpen) setHidden(true);
          else if (y < SHOW_AT) setHidden(false);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isOpen]);

  return (
    <>
      <nav ref={navRef} className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl fallback-navbar ${hidden ? "nav-hidden" : ""} ${isOpen ? "nav-open" : ""}`}>
        <div className="rounded-2xl shadow-xl px-6 py-3">
          <div className="fallback-navbar__inner">
            {/* Logo - Left Side */}
            <div
              className="nav-logo-container"
              onClick={() => {
                closeMenu();
                if (pathname !== "/") router.push("/");
                requestAnimationFrame(() => {
                  window.scrollTo({ top: 0, behavior: "smooth" });
                });
              }}
            >
              <img
                src={logo.src ?? logo}
                alt="Dumisane.dev"
                className="nav-logo"
                width={32}
                height={32}
              />
            </div>

            {/* Combined Right Side: Links + Toggle + Hamburger */}
            <div className="nav-controls-right">
              {/* Desktop Links */}
              <div className="desktop-links">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    className="fallback-navbar__link"
                    onClick={() => handleNavClick(link)}
                  >
                    {link.label}
                  </button>
                ))}
              </div>

              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Mobile Hamburger - Always stays in place */}
              <button 
                className={`hamburger ${isOpen ? 'active' : ''}`} 
                onClick={toggleMenu}
                aria-label={isOpen ? "Close Menu" : "Open Menu"}
                style={{ zIndex: 10000 }} // Ensure it stays above overlay
              >
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
              </button>
            </div>
          </div>
        </div>
      </nav>
      {/* Mobile Menu Backdrop */}
      <div 
        className={`mobile-backdrop md:hidden ${isOpen ? 'show' : ''}`} 
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu md:hidden ${isOpen ? 'show' : ''}`}>
        <div className="mobile-menu-content">
          {navLinks.map((link) => (
            <button
              key={link.id}
              className="mobile-link"
              onClick={() => handleNavClick(link)}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}


export default Navbar;
