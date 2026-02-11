import React from 'react';
import './footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <h2 className="footer-heading">Let’s build something great together.</h2>
        <div className="footer-contacts">
          <a className="footer-contact" href="mailto:dumisanemadondo926@gmail.com" rel="noopener noreferrer">
            <span className="contact-pill">
              <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M22 7l-10 7L2 7" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
            </span>
            <span>dumisanemadondo926@gmail.com</span>
          </a>
          <span className="footer-sep" aria-hidden="true">|</span>
          <div className="socials">
          <a aria-label="LinkedIn" className="social-link" href="https://www.linkedin.com/in/dumisane-madondo-34261626b" target="_blank" rel="noopener noreferrer">
            <svg className="social-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48s.88 1.98 1.98 1.98 1.98-.88 1.98-1.98S6.08 3.5 4.98 3.5zM3 8.98h3.96V21H3V8.98zm7.47 0H14v1.58h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.55V21h-3.55v-5.4c0-1.29 0-2.95-1.8-2.95-1.8 0-2.08 1.41-2.08 2.86V21H10.47V8.98z" fill="currentColor"/></svg>
          </a>
          <a aria-label="GitHub" className="social-link" href="https://github.com/Madondo07" target="_blank" rel="noopener noreferrer">
            <svg className="social-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.48 2 2 6.58 2 12.2c0 4.5 2.87 8.32 6.85 9.67.5.1.65-.22.65-.49v-1.74c-2.79.61-3.37-1.21-3.37-1.21-.46-1.17-1.12-1.48-1.12-1.48-.91-.63.07-.62.07-.62 1.01.07 1.55 1.06 1.55 1.06.9 1.59 2.36 1.13 2.94.86.09-.67.35-1.13.64-1.39-2.23-.26-4.57-1.16-4.57-5.19 0-1.15.41-2.09 1.08-2.83-.11-.27-.47-1.36.1-2.83 0 0 .88-.29 2.9 1.08.84-.24 1.73-.37 2.62-.37.89 0 1.78.13 2.62.37 2.02-1.37 2.9-1.08 2.9-1.08.57 1.47.21 2.56.1 2.83.67.74 1.08 1.68 1.08 2.83 0 4.04-2.34 4.93-4.58 5.19.36.31.69.92.69 1.86v2.76c0 .27.15.6.66.49C19.13 20.52 22 16.7 22 12.2 22 6.58 17.52 2 12 2z" fill="currentColor"/></svg>
          </a>
          <a aria-label="Discord" className="social-link" href="#" target="_blank" rel="noopener noreferrer">
            <svg className="social-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 4.5A16 16 0 0 0 15.9 3l-.4.8a14 14 0 0 1 3.5 1.3c-3.3-1.6-7-1.6-10.3 0a14 14 0 0 1 3.5-1.3L12.2 3A16 16 0 0 0 8 4.5c-2.1 3.2-3.3 6.9-3.1 10.7A16 16 0 0 0 8.9 18l.7-1c-1-.3-1.9-.8-2.7-1.4.2.1.4.2.7.4 4.1 2.3 9 2.3 13.1 0 .2-.1.5-.3.7-.4-.8.6-1.7 1.1-2.7 1.4l.7 1a16 16 0 0 0 4-2.8c.3-3.8-1-7.5-3.1-10.7zM9.5 12.9c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8zm5 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8z" fill="currentColor"/></svg>
          </a>
        </div>
        </div>
        <div className="footer-divider" aria-hidden="true" />
        <p className="footer-copy">© 2026 DUMISANE MARTIN MADONDO.</p>
      </div>
    </footer>
  );
}
