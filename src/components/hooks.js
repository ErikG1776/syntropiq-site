import { useEffect, useRef } from 'react';

// ──────────────────────────────────────────────────────────────
// Scroll reveal — attaches IntersectionObserver to all [data-reveal]
// ──────────────────────────────────────────────────────────────
export function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('[data-reveal]:not(.in)');
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

// ──────────────────────────────────────────────────────────────
// Magnetic hover — subtle pull-toward-cursor for CTAs
// ──────────────────────────────────────────────────────────────
export function useMagnetic(strength = 0.25) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);
  return ref;
}
