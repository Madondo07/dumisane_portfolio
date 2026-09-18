import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop({ sectionId = 'projects', boundaryId = 'certificates' }) {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const section = document.getElementById(sectionId);
    const boundary = document.getElementById(boundaryId);
    if (!section || !boundary) return undefined;

    const updateVisibility = () => {
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      setVisible(window.scrollY >= sectionTop);

      const boundaryBottom = boundary.getBoundingClientRect().bottom + window.scrollY;
      const requiredOffset = window.scrollY + window.innerHeight - boundaryBottom + 24;
      setBottomOffset(Math.max(24, requiredOffset));
    };

    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('resize', updateVisibility);
    };
  }, [boundaryId, sectionId]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className={`back-to-top ${visible ? 'back-to-top-visible' : ''}`}
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      tabIndex={visible ? 0 : -1}
      style={{ bottom: `${bottomOffset}px` }}
    >
      <ArrowUp size={20} strokeWidth={2.5} aria-hidden="true" />
    </button>
  );
}