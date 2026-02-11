import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import "./contact.css";

export default function Contact() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);
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

  async function onSubmit(data) {
    try {
      setSending(true);
      setResult(null);
      const access_key = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      if (!access_key) {
        throw new Error("Missing access key");
      }
      const payload = {
        access_key,
        subject: "Dumisane Madondo | Contact Form",
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      };
      const res = await axios.post("https://api.web3forms.com/submit", payload, { headers: { "Content-Type": "application/json" } });
      if (res?.data?.success) {
        setResult({ ok: true, msg: "Email sent successfully from your portfolio." });
        reset();
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setResult({ ok: false, msg: "Failed to send email. Please try again." });
    } finally {
      setSending(false);
    }
  }

  return (
    <main className={`contact-page ${visible ? 'contact-visible' : ''}`}>
      <section className="contact-panel" ref={sectionRef}>
        <div className="contact-grid">
          <div className="contact-left reveal" style={{ transitionDelay: '80ms' }}>
            <h3 className="contact-title">Reach Me</h3>
            <ul className="contact-list">
              <li>
                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7z" 
      fill="none" stroke="currentColor" strokeWidth="2"/>
</svg>
                10 Dorset Street, Woodstock, Cape Town, Western Cape, 8001
              </li>
              <li>
                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z" fill="none" stroke="currentColor" strokeWidth="2"/><path d="M22 7l-10 7L2 7" fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                dumisanemadondo926@gmail.com
              </li>
              <li>
                <svg className="contact-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1.1-.2c1.2.4 2.5.6 3.8.6a1 1 0 0 1 1 1v3.5a1 1 0 0 1-1 1C12.4 21 3 11.6 3 3a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.6.6 3.8a1 1 0 0 1-.2 1.1l-2.3 2.2z" 
      fill="none" stroke="currentColor" strokeWidth="2"/></svg>
                +27 76 045 0332
              </li>
            </ul>

            <div className="contact-socials">
              <a href="#" aria-label="LinkedIn" className="social-a">
                <svg className="social-svg" viewBox="0 0 24 24"><path d="M4.98 3.5C3.88 3.5 3 4.38 3 5.48s.88 1.98 1.98 1.98 1.98-.88 1.98-1.98S6.08 3.5 4.98 3.5zM3 8.98h3.96V21H3V8.98zm7.47 0H14v1.58h.05c.48-.9 1.66-1.85 3.42-1.85 3.66 0 4.34 2.41 4.34 5.55V21h-3.55v-5.4c0-1.29 0-2.95-1.8-2.95-1.8 0-2.08 1.41-2.08 2.86V21h-3.41V8.98z"/></svg>
              </a>
              <a href="#" aria-label="GitHub" className="social-a">
                <svg className="social-svg" viewBox="0 0 24 24"><path d="M12 .5A12 12 0 0 0 0 12.6c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1 1.8.8 2.3 1.2.1-.9.4-1.6.8-2-2.7-.3-5.5-1.4-5.5-6.1 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2A11.4 11.4 0 0 1 12 7.9c1 0 2-.1 3-.4 2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.3 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.8-5.5 6.1.4.3.8 1.1.8 2.2v3.2c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4A12 12 0 0 0 12 .5z"/></svg>
              </a>
              <a href="#" aria-label="Discord" className="social-a">
                <svg className="social-svg" viewBox="0 0 24 24"><path d="M20 4.5A16 16 0 0 0 15.9 3l-.4.8a14 14 0 0 1 3.5 1.3c-3.3-1.6-7-1.6-10.3 0a14 14 0 0 1 3.5-1.3L12.2 3A16 16 0 0 0 8 4.5c-2.1 3.2-3.3 6.9-3.1 10.7A16 16 0 0 0 8.9 18l.7-1c-1-.3-1.9-.8-2.7-1.4.2.1.4.2.7.4 4.1 2.3 9 2.3 13.1 0 .2-.1.5-.3.7-.4-.8.6-1.7 1.1-2.7 1.4l.7 1a16 16 0 0 0 4-2.8c.3-3.8-1-7.5-3.1-10.7zM9.5 12.9c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8zm5 0c-.9 0-1.6-.8-1.6-1.8s.7-1.8 1.6-1.8 1.6.8 1.6 1.8-.7 1.8-1.6 1.8z"/></svg>
              </a>
            </div>
          </div>

          <div className="contact-v-divider" aria-hidden="true" />
          <form className="contact-right reveal" style={{ transitionDelay: '160ms' }} onSubmit={handleSubmit(onSubmit)}>
            <h3 className="contact-title">Get in Touch</h3>
            <div className="form-row">
              <input type="text" placeholder="Name" className="input" {...register("name", { required: true, minLength: 2 })} />
            </div>
            <div className="form-row">
              <input type="email" placeholder="Email" className="input" {...register("email", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
            </div>
            <div className="form-row">
              <textarea placeholder="Message" className="textarea" rows={4} {...register("message", { required: true, minLength: 10 })}></textarea>
            </div>
            <button type="submit" className="submit" disabled={sending}>{sending ? "Sending..." : "Submit"}</button>
            {result && (
              <div className={`contact-status ${result.ok ? "success" : "error"}`} aria-live="polite">
                <strong>{result.ok ? "Portfolio Contact" : "Error"}</strong>
                <span> — {result.msg}</span>
              </div>
            )}
          </form>
        </div>
      </section>
    </main>
  );
}