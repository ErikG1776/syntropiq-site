// Site chrome for the single-page investor site: Logo, Nav, Footer.
import { useState, useEffect } from 'react';
import { Icon } from './Icon.jsx';
import { SpiralMark, SpiralMarkSVG } from './Spiral.jsx';
import { scrollToSection } from '../utils.js';

// ──────────────────────────────────────────────────────────────
// Logo — spiral hugging the wordmark, "iq" in gold
// ──────────────────────────────────────────────────────────────
export function Logo({ light = false, size = 22 }) {
  const ink = light ? '#fff' : 'var(--ink)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: ink }}>
      <SpiralMarkSVG size={size} color="var(--gold)" count={89} />
      <span style={{ fontWeight: 600, fontSize: 17.5, letterSpacing: '-0.03em' }}>
        syntrop<span style={{ color: 'var(--gold)' }}>iq</span>
      </span>
    </span>
  );
}

// ──────────────────────────────────────────────────────────────
// Top Nav — anchor links + two CTAs
// ──────────────────────────────────────────────────────────────
const NAV_ANCHORS = [
  { label: 'Problem', id: 'problem' },
  { label: 'Solution', id: 'solution' },
  { label: 'Approach', id: 'approach' },
  { label: 'Market', id: 'market' },
  { label: 'Moat', id: 'moat' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-spy
  useEffect(() => {
    const ids = NAV_ANCHORS.map((a) => a.id);
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  const jump = (id) => { setOpen(false); scrollToSection(id); };

  return (
    <>
      <style>{`
        .nav-wrap {
          position: sticky; top: 0; z-index: 50;
          background: rgba(255,255,255,0.72);
          backdrop-filter: saturate(180%) blur(14px);
          -webkit-backdrop-filter: saturate(180%) blur(14px);
          transition: border-color 0.2s, background 0.2s;
          border-bottom: 1px solid transparent;
        }
        .nav-wrap.scrolled { background: rgba(255,255,255,0.88); border-bottom-color: var(--line); }
        .nav { height: 60px; display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .nav-links { display: flex; align-items: center; gap: 2px; }
        .nav-link {
          padding: 7px 12px; border-radius: 8px;
          font-size: 14px; font-weight: 450; color: var(--muted);
          letter-spacing: -0.005em; transition: color 0.15s, background 0.15s;
          background: transparent; cursor: pointer;
        }
        .nav-link:hover { color: var(--ink); background: var(--bg-2); }
        .nav-link.active { color: var(--ink); }
        .nav-link.active::after {
          content: ''; display: block; height: 2px; border-radius: 2px;
          background: var(--gold); margin-top: 4px;
        }
        .nav-right { display: flex; align-items: center; gap: 8px; }
        .mobile-toggle { display: none; }
        .mobile-menu {
          display: none; position: fixed; inset: 60px 0 0 0;
          background: #fff; z-index: 49; padding: 24px;
          transform: translateY(-8px); opacity: 0; pointer-events: none;
          transition: opacity 0.25s var(--ease-out), transform 0.25s var(--ease-out);
          border-top: 1px solid var(--line); overflow-y: auto;
        }
        .mobile-menu button {
          display: block; width: 100%; text-align: left; font-size: 22px; padding: 14px 0;
          border-bottom: 1px solid var(--line); font-weight: 500; letter-spacing: -0.02em; color: var(--ink);
        }
        @media (max-width: 880px) {
          .nav-links { display: none; }
          .nav-right .desktop-cta { display: none; }
          .mobile-toggle { display: inline-flex; }
          .mobile-menu { display: block; }
          .mobile-menu.open { opacity: 1; transform: none; pointer-events: auto; }
        }
      `}</style>
      <div className={'nav-wrap' + (scrolled ? ' scrolled' : '')}>
        <div className="container">
          <div className="nav">
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} style={{ display: 'flex', alignItems: 'center' }} aria-label="Top">
              <Logo />
            </button>
            <div className="nav-links">
              {NAV_ANCHORS.map((a) => (
                <button key={a.id} className={'nav-link' + (active === a.id ? ' active' : '')} onClick={() => jump(a.id)}>{a.label}</button>
              ))}
            </div>
            <div className="nav-right">
              <button className="btn ghost desktop-cta" style={{ height: 34, fontSize: 13.5 }} onClick={() => jump('ask')}>Book a call</button>
              <button className="btn primary" style={{ height: 34, fontSize: 13.5 }} onClick={() => jump('ask')}>
                Request information <Icon.arrow s={12} />
              </button>
              <button className="mobile-toggle btn ghost" style={{ height: 34, width: 34, padding: 0, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
                <Icon.menu />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={'mobile-menu' + (open ? ' open' : '')}>
        {NAV_ANCHORS.map((a) => (
          <button key={a.id} onClick={() => jump(a.id)}>{a.label}</button>
        ))}
        <button onClick={() => jump('ask')} style={{ color: 'var(--gold)' }}>Request information</button>
      </div>
    </>
  );
}

// ──────────────────────────────────────────────────────────────
// Footer — simplified for single page
// ──────────────────────────────────────────────────────────────
export function Footer() {
  return (
    <>
      <style>{`
        .footer { background: var(--bg-2); color: var(--muted); padding: 72px 0 36px; position: relative; overflow: hidden; border-top: 1px solid var(--line); }
        .footer-bg { position: absolute; right: -140px; bottom: -160px; opacity: 0.10; pointer-events: none; }
        .footer-top { display: flex; justify-content: space-between; gap: 40px; flex-wrap: wrap; position: relative; }
        .footer-tagline { max-width: 360px; font-size: 14px; line-height: 1.55; color: var(--muted); margin: 20px 0 0; }
        .footer-links { display: flex; gap: 56px; flex-wrap: wrap; }
        .footer h4 { font-family: var(--font-mono); font-size: 11px; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; color: var(--soft); margin: 0 0 16px; }
        .footer ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
        .footer ul button, .footer ul a { color: var(--ink-2); font-size: 14px; transition: color 0.15s; background: transparent; text-align: left; cursor: pointer; }
        .footer ul button:hover, .footer ul a:hover { color: var(--gold-deep); }
        .footer-bottom {
          margin-top: 64px; padding-top: 26px; border-top: 1px solid var(--line);
          display: flex; justify-content: space-between; align-items: center; gap: 16px;
          font-size: 12.5px; color: var(--soft); font-family: var(--font-mono); letter-spacing: 0.02em; flex-wrap: wrap;
        }
      `}</style>
      <footer className="footer">
        <div className="footer-bg">
          <SpiralMark size={520} color="var(--gold)" animate={true} speed={0.4} fadeOuter />
        </div>
        <div className="container">
          <div className="footer-top">
            <div>
              <Logo />
              <p className="footer-tagline">Trust-as-a-Service for the agent economy — the patent-pending governance layer between every AI decision and every consequence.</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 22 }}>
                <span className="pill">Patent pending</span>
                <span className="pill amber">Seed · 2026</span>
              </div>
            </div>
            <div className="footer-links">
              <div>
                <h4>Sections</h4>
                <ul>
                  <li><button onClick={() => scrollToSection('problem')}>The problem</button></li>
                  <li><button onClick={() => scrollToSection('solution')}>The solution</button></li>
                  <li><button onClick={() => scrollToSection('approach')}>Approach</button></li>
                  <li><button onClick={() => scrollToSection('market')}>Market</button></li>
                  <li><button onClick={() => scrollToSection('moat')}>The moat</button></li>
                </ul>
              </div>
              <div>
                <h4>Investors</h4>
                <ul>
                  <li><button onClick={() => scrollToSection('ask')}>Request information</button></li>
                  <li><button onClick={() => scrollToSection('ask')}>Book a call</button></li>
                  <li><a href="mailto:erik@syntropiq.ai">erik@syntropiq.ai</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© 2026 Syntropiq, Inc. · Delaware C-Corp · EIN 37-2201087</span>
            <span>Patent pending · PCT/US26/19117 · Confidential</span>
          </div>
        </div>
      </footer>
    </>
  );
}
