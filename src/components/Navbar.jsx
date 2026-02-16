'use client';
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "../assets/logomain2.png";

function Navbar() {
  const [hidden, setHidden] = useState(false);
  const navRef = useRef(null);
  const router = useRouter();
  const pathname = router.pathname;

  useEffect(() => {
    const HIDE_AT = 280; // hide when scrolled deeper into the page
    const SHOW_AT = 240; // small hysteresis to avoid flicker
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const y = window.scrollY || 0;
          if (y > HIDE_AT) setHidden(true);
          else if (y < SHOW_AT) setHidden(false);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <nav ref={navRef} className={`fixed top-6 left-1/2 -translate-x-1/2 w-[90%] max-w-4xl fallback-navbar ${hidden ? "nav-hidden" : ""}`}>
      <div className="rounded-2xl shadow-xl px-6 py-3">
        <div className="flex items-center justify-between fallback-navbar__inner">
          {/* Logo/Home Button */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => {
              if (pathname !== "/") router.push("/");
              requestAnimationFrame(() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
              });
            }}
            aria-label="Home"
          >
            <img
              src={logo.src ?? logo}
              alt="Dumisane.dev"
              className="nav-logo h-5 md:h-6 w-auto mr-2 align-middle"
              width={32}
              height={32}
            />
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-2 rounded-xl px-4 py-2 fallback-navbar__links">
              <button
                className="px-4 py-2 rounded-lg transition-all duration-300 fallback-navbar__link"
                onClick={() => {
                  if (pathname !== "/") router.push("/");
                  setTimeout(() => {
                    const el = document.getElementById("home");
                    if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
                  }, 80);
                }}
              >
                About
              </button>
              <button
                className="px-4 py-2 rounded-lg transition-all duration-300 fallback-navbar__link"
                onClick={() => {
                  if (pathname !== "/") router.push("/");
                  setTimeout(() => {
                    const el = document.getElementById("skills");
                    if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
                  }, 80);
                }}
              >
                Skills
              </button>
              <button
                className="px-4 py-2 rounded-lg transition-all duration-300 fallback-navbar__link"
                onClick={() => {
                  if (pathname !== "/") router.push("/");
                  setTimeout(() => {
                    const el = document.getElementById("projects");
                    if (el) window.scrollTo({ top: el.offsetTop - 96, behavior: "smooth" });
                  }, 80);
                }}
              >
                Projects
              </button>
              <Link href="/contact" className="px-4 py-2 rounded-lg transition-all duration-300 fallback-navbar__link">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    </>
  );
}

export default Navbar;
