import { useState, useEffect, useRef } from 'react';

// Section header
export function SectionHeader({ eyebrow, title, sub, align = 'left' }) {
  return (
    <div className="section-header" style={{ textAlign: align, maxWidth: 760, margin: align === 'center' ? '0 auto' : 0 }}>
      {eyebrow && <div className="eyebrow" data-reveal><span className="dot" />{eyebrow}</div>}
      <h2 className="display" data-reveal data-reveal-delay="1" style={{ fontSize: 'clamp(34px, 4.4vw, 56px)', margin: '14px 0 0' }}>{title}</h2>
      {sub && <p data-reveal data-reveal-delay="2" style={{ fontSize: 17, color: 'var(--muted)', margin: '18px 0 0', maxWidth: 580, textWrap: 'pretty', marginLeft: align === 'center' ? 'auto' : 0, marginRight: align === 'center' ? 'auto' : 0 }}>{sub}</p>}
    </div>
  );
}

// Animated counter
export function Counter({ to, suffix = '', prefix = '', decimals = 0, duration = 1400 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setVal(eased * to);
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);
  return <span ref={ref} className="mono">{prefix}{val.toFixed(decimals)}{suffix}</span>;
}
