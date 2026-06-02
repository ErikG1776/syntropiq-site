// Investor-facing single page.
import { useState } from 'react';
import { useForm } from '@formspree/react';
import { Icon } from './Icon.jsx';
import { SectionHeader } from './primitives.jsx';
import { useMagnetic } from './hooks.js';
import { SpiralMark } from './Spiral.jsx';
import { StreamingTerminal, GatingDemo, TrustTrajectory } from './demos.jsx';
import { scrollToSection } from '../utils.js';

export function Investor() {
  return (
    <div className="page-enter">
      <Hero />
      <Problem />
      <Solution />
      <Approach />
      <Market />
      <Moat />
      <Ask />
    </div>
  );
}

// ─── Hero ─────────────────────────────────────────────────────
function Hero() {
  const ctaRef = useMagnetic(0.18);
  return (
    <section className="hero">
      <style>{`
        .hero { position: relative; padding: clamp(56px, 8vw, 104px) 0 clamp(72px, 10vw, 128px); overflow: hidden; }
        .hero-grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 56px; align-items: center; }
        @media (max-width: 980px) { .hero-grid { grid-template-columns: 1fr; gap: 40px; } }
        .hero h1 {
          font-size: clamp(44px, 6.4vw, 86px); line-height: 0.96; letter-spacing: -0.04em;
          font-weight: 450; margin: 22px 0 26px; text-wrap: balance;
        }
        .hero h1 em {
          font-style: normal; font-weight: 450;
          background: linear-gradient(92deg, var(--gold-deep) 0%, var(--gold) 60%, var(--gold-bright) 100%);
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }
        .hero-sub { font-size: clamp(16px, 1.6vw, 19px); line-height: 1.55; color: var(--muted); max-width: 540px; text-wrap: pretty; margin: 0 0 34px; }
        .hero-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 36px; }
        .hero-trust { display: grid; grid-template-columns: repeat(4, auto); gap: 28px; padding-top: 26px; border-top: 1px solid var(--line); }
        @media (max-width: 560px) { .hero-trust { grid-template-columns: 1fr 1fr; gap: 20px 28px; } }
        .hero-trust-item .k { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--soft); }
        .hero-trust-item .v { font-size: 14px; color: var(--ink); margin-top: 5px; }
        .hero-visual { position: relative; min-height: 520px; display: flex; align-items: center; justify-content: center; }
        .hero-spiral { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; pointer-events: none; z-index: 0; }
        .hero-terminal-wrap { position: relative; z-index: 1; width: 100%; max-width: 540px; }
        .float-card { position: absolute; background: rgba(255,255,255,0.96); backdrop-filter: blur(12px); border: 1px solid var(--line); border-radius: 12px; padding: 12px 14px; box-shadow: 0 20px 40px -20px rgba(11,18,32,0.18); z-index: 2; }
        .float-card .lbl { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--soft); }
        .float-card .val { font-family: var(--font-mono); font-size: 16px; font-weight: 500; margin-top: 3px; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; padding: 6px 13px 6px 10px; border-radius: 999px; background: var(--bg-2); border: 1px solid var(--line); font-size: 12.5px; color: var(--muted); cursor: pointer; transition: border-color 0.2s; }
        .hero-badge:hover { border-color: var(--gold); }
        .hero-badge .glow { width: 8px; height: 8px; border-radius: 50%; background: var(--green); animation: glowPulse 1.8s infinite; }
        @keyframes glowPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(31,138,91,0.55); } 50% { box-shadow: 0 0 0 6px rgba(31,138,91,0); } }
      `}</style>
      <div className="container">
        <div className="hero-grid">
          <div>
            <button className="hero-badge" onClick={() => scrollToSection('approach')}>
              <span className="glow" />
              <span><strong style={{ color: 'var(--ink)', fontWeight: 500 }}>Recursa is live in production</strong> · access on request</span>
              <Icon.arrow s={11} />
            </button>
            <h1><em>Trust-as-a-Service</em><br />for the agent<br />economy.</h1>
            <p className="hero-sub">
              The patent-pending governance layer between every AI decision and every consequence. It scores trust, predicts drift, gates before action, and records every outcome — replayable and regulator-ready by construction.
            </p>
            <div className="hero-cta-row">
              <span ref={ctaRef} style={{ display: 'inline-block' }}>
                <button className="btn primary lg" onClick={() => scrollToSection('ask')}>Request information <Icon.arrow /></button>
              </span>
              <button className="btn ghost lg" onClick={() => scrollToSection('ask')}>Book a call</button>
            </div>
            <div className="hero-trust">
              <div className="hero-trust-item"><div className="k">Stage</div><div className="v">Seed · 2026</div></div>
              <div className="hero-trust-item"><div className="k">Market · 2030</div><div className="v">$15B governance spend</div></div>
              <div className="hero-trust-item"><div className="k">Wedge SAM</div><div className="v">$1.25B</div></div>
              <div className="hero-trust-item"><div className="k">Demand driver</div><div className="v">Regulation, already written</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-spiral">
              <SpiralMark size={620} color="var(--gold)" animate={true} speed={0.6} fadeOuter />
            </div>
            <div className="hero-terminal-wrap">
              <StreamingTerminal />
            </div>
            <div className="float-card" style={{ left: -8, top: 28 }}>
              <div className="lbl">Composite trust</div>
              <div className="val" style={{ color: 'var(--green)' }}>0.852 <span style={{ color: 'var(--soft)', fontSize: 12 }}>↗</span></div>
            </div>
            <div className="float-card" style={{ right: -10, bottom: 60 }}>
              <div className="lbl">Decision</div>
              <div className="val" style={{ color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 6 }}><Icon.check s={14} /> Allow</div>
            </div>
          </div>
        </div>
        <p style={{ marginTop: 18, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--soft)', letterSpacing: '0.04em' }}>
          Illustrative — a governed inference call. Not a live product interface.
        </p>
      </div>
    </section>
  );
}

// ─── Problem (kept) ──────────────────────────────────────────
function Problem() {
  const items = [
    { n: '01', k: 'TRUST',    t: 'No reliable signal',  d: 'Whether an agent’s output is right, wrong, or hallucinated — no one can tell at the moment of decision.' },
    { n: '02', k: 'CONTROL',  t: 'No gate before action', d: 'Nothing sits between a proposed action and its consequence. The agent acts. Then you find out.' },
    { n: '03', k: 'AUDIT',    t: 'No record to replay', d: '"Why did the model do that?" has no answer a regulator or a court can accept.' },
    { n: '04', k: 'RECOVERY', t: 'No catch when drift starts', d: 'When quality drifts, nothing notices until something visibly breaks — in production, in front of a customer.' },
  ];
  return (
    <section id="problem" className="section" style={{ scrollMarginTop: 64 }}>
      <style>{`
        .problem-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; margin-top: 64px; border-top: 1px solid var(--line); border-left: 1px solid var(--line); }
        @media (max-width: 880px) { .problem-grid { grid-template-columns: 1fr 1fr; } }
        .problem-cell { padding: 28px 24px; border-right: 1px solid var(--line); border-bottom: 1px solid var(--line); display: flex; flex-direction: column; gap: 12px; background: #fff; }
        .problem-cell .num { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; color: var(--soft); }
        .problem-cell .key { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; color: var(--gold-deep); text-transform: uppercase; }
        .problem-cell .title { font-size: 19px; font-weight: 500; letter-spacing: -0.02em; line-height: 1.25; }
        .problem-cell .desc { font-size: 13.5px; color: var(--muted); line-height: 1.55; text-wrap: pretty; }
      `}</style>
      <div className="container">
        <SectionHeader
          eyebrow="THE PROBLEM"
          title={<>Every enterprise is shipping AI agents.<br /><em style={{ color: 'var(--muted)', fontStyle: 'normal' }}>None of them can prove what those agents did.</em></>}
        />
        <div className="problem-grid">
          {items.map((it, i) => (
            <div className="problem-cell" key={it.n} data-reveal data-reveal-delay={Math.min(i + 1, 5)}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="num">{it.n}</span><span className="key">{it.k}</span>
              </div>
              <div className="title">{it.t}</div>
              <div className="desc">{it.d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Solution (kept) ─────────────────────────────────────────
function Solution() {
  return (
    <section id="solution" className="section" style={{ background: 'var(--bg-2)', scrollMarginTop: 64 }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }} className="solution-grid">
          <style>{`
            @media (max-width: 980px) { .solution-grid { grid-template-columns: 1fr !important; gap: 40px; } }
            .solution-features { display: flex; flex-direction: column; gap: 0; margin-top: 32px; }
            .sf-item { display: grid; grid-template-columns: 28px 1fr; gap: 16px; padding: 16px 0; border-top: 1px solid var(--line); }
            .sf-num { font-family: var(--font-mono); font-size: 11px; color: var(--gold-deep); letter-spacing: 0.04em; padding-top: 3px; }
            .sf-title { font-size: 15px; font-weight: 500; margin: 0 0 4px; }
            .sf-desc { font-size: 13.5px; color: var(--muted); line-height: 1.55; margin: 0; text-wrap: pretty; }
          `}</style>
          <div>
            <SectionHeader
              eyebrow="THE SOLUTION"
              title={<>The governance layer between every <em>agent</em> and every <em>decision</em>.</>}
              sub="Four governing primitives, working together. Hover the outcomes to see the gating decision change."
            />
            <div className="solution-features">
              {[
                { n: '01', t: 'Asymmetric trust scoring', d: 'Every action gets a composite trust score. Penalties exceed rewards 2.5×. Trust is harder to earn than to lose.' },
                { n: '02', t: 'Foresight prediction', d: 'Multi-step projection of trust over a 24h horizon. Drift caught before degradation, not after.' },
                { n: '03', t: 'Constraint-gated execution', d: 'Three-tier pre-execution gating — allow, review, deny — across factual, recursive, and consistency constraints.' },
                { n: '04', t: 'Append-only ledger', d: 'Cryptographically linked, deterministically replayable record of every decision. Regulator-ready by construction.' },
              ].map((f) => (
                <div className="sf-item" key={f.n} data-reveal>
                  <span className="sf-num">{f.n}</span>
                  <div><h4 className="sf-title">{f.t}</h4><p className="sf-desc">{f.d}</p></div>
                </div>
              ))}
            </div>
          </div>
          <div data-reveal data-reveal-delay="2"><GatingDemo /></div>
        </div>
      </div>
    </section>
  );
}

// ─── Approach / roadmap (redone stack) ───────────────────────
function Approach() {
  const stages = [
    {
      tag: 'LIVE TODAY', status: '● Live', statusClass: 'green',
      title: 'Recursa',
      sub: 'The governed inference engine.',
      desc: 'Running in production beneath the stack — proof the governing architecture works in real execution. We keep access gated to protect the engine; available to investors on request.',
      points: ['Trust scoring & constraint gating in code', 'Evidence, provenance & audit on every response', 'Low marginal cost per governed call'],
    },
    {
      tag: 'SHIPPING 2026', status: 'Q2 2026', statusClass: 'gold',
      title: 'V1 Platform',
      sub: 'Governance, made buyable.',
      desc: 'The same governing model, wrapped in a drag-and-drop workflow builder for regulated enterprise. Every node rubric-scored, every drift recovered, every decision logged. This is the commercial wedge.',
      points: ['Visual workflow builder', 'Drift dashboard & replay', 'Built for the Chief Risk Officer'],
    },
    {
      tag: 'THE HORIZON', status: '2028+', statusClass: 'ink',
      title: 'Autonomous governance',
      sub: 'When humans can’t review at scale.',
      desc: 'Full pre-execution governance at population scale. Humans set the rubric; the system enforces it across billions of agent decisions. The endgame the patent was filed for.',
      points: ['Population-level drift monitoring', 'Autonomous suppression & recovery', 'Human sets policy, system enforces'],
    },
  ];
  return (
    <section id="approach" className="section" style={{ scrollMarginTop: 64 }}>
      <div className="container">
        <SectionHeader
          eyebrow="THE APPROACH"
          title={<>One governing model.<br /><em>Three steps to the standard.</em></>}
          sub="We are not raising to discover whether the governance layer works. The architecture is proven in production today. We are raising to establish it as the default."
        />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 60 }} className="approach-grid">
          <style>{`
            @media (max-width: 980px) { .approach-grid { grid-template-columns: 1fr !important; } }
            .approach-card { position: relative; background: #fff; border: 1px solid var(--line); border-radius: 16px; padding: 28px; overflow: hidden; transition: border-color 0.2s, transform 0.3s var(--ease-out), box-shadow 0.3s; display: flex; flex-direction: column; }
            .approach-card:hover { border-color: #D8D4C8; transform: translateY(-3px); box-shadow: 0 30px 60px -42px rgba(11,18,32,0.25); }
            .approach-card .bg { position: absolute; right: -70px; top: -70px; opacity: 0.06; pointer-events: none; transition: opacity 0.3s, transform 0.5s; }
            .approach-card:hover .bg { opacity: 0.11; transform: scale(1.06) rotate(8deg); }
            .approach-head { display: flex; justify-content: space-between; align-items: center; position: relative; z-index: 1; margin-bottom: 18px; }
            .approach-head .tag { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.1em; color: var(--gold-deep); text-transform: uppercase; }
            .approach-title { font-size: 28px; font-weight: 450; letter-spacing: -0.025em; margin: 0; position: relative; z-index: 1; }
            .approach-sub { font-size: 14.5px; color: var(--ink); font-weight: 500; margin: 6px 0 12px; position: relative; z-index: 1; }
            .approach-desc { font-size: 13.5px; color: var(--muted); line-height: 1.55; position: relative; z-index: 1; text-wrap: pretty; }
            .approach-points { list-style: none; padding: 18px 0 0; margin: 18px 0 0; border-top: 1px solid var(--line); display: flex; flex-direction: column; gap: 9px; position: relative; z-index: 1; }
            .approach-points li { display: flex; gap: 10px; align-items: flex-start; font-size: 13px; color: var(--ink); }
            .approach-points svg { color: var(--gold-deep); flex-shrink: 0; margin-top: 2px; }
          `}</style>
          {stages.map((s, i) => (
            <div className="approach-card" key={s.title} data-reveal data-reveal-delay={Math.min(i + 1, 5)}>
              <div className="bg"><SpiralMark size={240} color="var(--gold)" animate={false} fadeOuter /></div>
              <div className="approach-head">
                <span className="tag">{s.tag}</span>
                <span className={'pill ' + (s.statusClass === 'gold' ? 'amber' : s.statusClass)}>{s.status}</span>
              </div>
              <h3 className="approach-title">{s.title}</h3>
              <div className="approach-sub">{s.sub}</div>
              <p className="approach-desc">{s.desc}</p>
              <ul className="approach-points">
                {s.points.map((p) => <li key={p}><Icon.check s={13} /><span>{p}</span></li>)}
              </ul>
            </div>
          ))}
        </div>

        {/* Foresight illustration */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 56, alignItems: 'center', marginTop: 80 }} className="fore-grid">
          <style>{`@media (max-width: 980px) { .fore-grid { grid-template-columns: 1fr !important; } }`}</style>
          <div data-reveal><TrustTrajectory /></div>
          <div>
            <div className="eyebrow"><span className="dot" />WHY IT COMPOUNDS</div>
            <h3 className="display" style={{ fontSize: 'clamp(26px, 3vw, 38px)', margin: '16px 0 16px' }}>The system gets <em>smarter</em> as it runs.</h3>
            <p style={{ fontSize: 15.5, color: 'var(--muted)', lineHeight: 1.6, textWrap: 'pretty' }}>
              Every governed decision feeds the trust ledger. Foresight projects trajectories forward and catches drift before it degrades — roughly 18 hours of lead time in the illustration above. The more it governs, the harder it is to replace.
            </p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--soft)', letterSpacing: '0.04em', marginTop: 16 }}>Illustrative model output.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Market / wedge (kept) ───────────────────────────────────
function Market() {
  const verticals = [
    { n: '01', name: 'Financial services', reg: 'SR 11-7', desc: 'Validation, monitoring, and human oversight of AI decisions — now the federal expectation, not a recommendation.' },
    { n: '02', name: 'Insurance', reg: 'NAIC Model Bulletin', desc: 'AI-system governance and disclosure obligations adopted across most U.S. states.' },
    { n: '03', name: 'Healthcare', reg: 'HIPAA · FDA', desc: 'Decision support and clinical workflows need audit trails patient privacy can stand on.' },
    { n: '04', name: 'Public sector', reg: 'EU AI Act · OMB M-24-10', desc: 'Risk classification, transparency, and post-deployment monitoring become mandatory line items.' },
    { n: '05', name: 'Critical infrastructure', reg: 'NIST AI RMF', desc: 'Continuous risk management for safety-critical AI — the new federal baseline.' },
  ];
  return (
    <section id="market" className="section" style={{ background: 'var(--ink)', color: '#E8EBF2', position: 'relative', overflow: 'hidden', scrollMarginTop: 0 }}>
      <style>{`
        .wedge-section h2 { color: #fff; }
        .wedge-section .eyebrow { color: rgba(255,255,255,0.55); }
        .wedge-section .eyebrow .dot { background: var(--gold-bright); }
        .wedge-section .section-header p { color: rgba(255,255,255,0.68) !important; }
        .wedge-rows { margin-top: 52px; }
        .wedge-row { display: grid; grid-template-columns: 60px 1.2fr 220px 1.4fr 24px; align-items: center; gap: 28px; padding: 22px 0; border-bottom: 1px solid rgba(255,255,255,0.08); transition: background 0.2s; }
        .wedge-row:hover { background: rgba(255,255,255,0.02); }
        .wedge-row .num { font-family: var(--font-mono); font-size: 12px; color: rgba(255,255,255,0.4); letter-spacing: 0.08em; }
        .wedge-row .name { font-size: 22px; font-weight: 450; letter-spacing: -0.02em; color: #fff; }
        .wedge-row .reg { font-family: var(--font-mono); font-size: 11.5px; letter-spacing: 0.08em; color: var(--gold-bright); }
        .wedge-row .desc { font-size: 14px; color: rgba(255,255,255,0.65); text-wrap: pretty; }
        .wedge-row .arrow { color: rgba(255,255,255,0.4); transition: color 0.2s, transform 0.2s; }
        .wedge-row:hover .arrow { color: #fff; transform: translateX(4px); }
        @media (max-width: 980px) { .wedge-row { grid-template-columns: 40px 1fr 24px; } .wedge-row .reg, .wedge-row .desc { grid-column: 2; } }
        .wedge-bg { position: absolute; left: -200px; bottom: -200px; opacity: 0.12; pointer-events: none; }
        .wedge-totals { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 60px; padding-top: 40px; border-top: 1px solid rgba(255,255,255,0.08); }
        @media (max-width: 720px) { .wedge-totals { grid-template-columns: 1fr; } }
      `}</style>
      <div className="wedge-bg"><SpiralMark size={700} color="var(--gold-bright)" animate speed={0.3} fadeOuter /></div>
      <div className="container wedge-section" style={{ position: 'relative' }}>
        <SectionHeader
          eyebrow="THE MARKET · WHERE THE REGULATOR ALREADY WRITES THE CHECK"
          title={<>Every regulated workflow <em style={{ color: 'var(--gold-bright)' }}>needs this</em>.</>}
          sub="We sell to the ones that need it first — where the forcing function is already written into federal guidance."
        />
        <div className="wedge-rows">
          {verticals.map((v) => (
            <div className="wedge-row" key={v.n} data-reveal>
              <span className="num">{v.n}</span>
              <span className="name">{v.name}</span>
              <span className="reg">{v.reg}</span>
              <span className="desc">{v.desc}</span>
              <span className="arrow"><Icon.arrowUR /></span>
            </div>
          ))}
        </div>
        <div className="wedge-totals">
          <div>
            <div className="eyebrow">Top-down · Analyst forecast 2030</div>
            <div style={{ fontSize: 'clamp(48px,6vw,64px)', fontWeight: 450, letterSpacing: '-0.03em', color: '#fff', lineHeight: 1, marginTop: 12 }}>$15B</div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, maxWidth: 420, marginTop: 12 }}>Global AI governance & model-risk management spend by 2030. CAGR 30%+ as deployment overtakes oversight.</p>
          </div>
          <div>
            <div className="eyebrow">Bottom-up · Our wedge SAM</div>
            <div style={{ fontSize: 'clamp(48px,6vw,64px)', fontWeight: 450, letterSpacing: '-0.03em', color: 'var(--gold-bright)', lineHeight: 1, marginTop: 12 }}>$1.25B</div>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: 14, maxWidth: 420, marginTop: 12 }}>≈ 5,000 U.S. regulated mid-market & enterprise buyers × $250K platform ACV. Expands seven-figure once governance becomes a mandated line item.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Moat (patent-pending + competitive) ─────────────────────
function Moat() {
  const reasons = [
    { t: 'Production proof', d: 'Recursa is live in production — proving the governing model works in real execution today, not on a slide.', tag: 'De-risked' },
    { t: 'Commercial wedge', d: 'The V1 Platform packages the same model for regulated enterprise workflows, where the regulator already wrote the brief.', tag: 'Buyable' },
    { t: 'Embedded defensibility', d: 'Patent-pending architecture, a live engine, and a workflow product reinforce each other — and get harder to replace once integrated.', tag: 'Compounding' },
  ];
  const rows = [
    { feat: 'Scores live trust',            o: false, f: false, e: false },
    { feat: 'Predicts drift before breach', o: false, f: false, e: false },
    { feat: 'Gates before action',          o: false, f: true,  e: false },
    { feat: 'Replayable audit chain',       o: true,  f: false, e: false },
    { feat: 'Recovers when quality drifts', o: false, f: false, e: false },
  ];
  return (
    <section id="moat" className="section" style={{ scrollMarginTop: 64, paddingBottom: 'clamp(28px, 3.5vw, 48px)' }}>
      <div className="container">
        <SectionHeader
          eyebrow="THE MOAT"
          title={<>A position that <em>compounds</em>.</>}
          sub="Builders orchestrate. Eval tools score. Monitoring tools observe. Syntropiq governs — and the three reasons it wins reinforce one another."
        />
        <p className="display" data-reveal style={{ fontSize: 'clamp(22px, 2.8vw, 34px)', fontWeight: 450, letterSpacing: '-0.02em', lineHeight: 1.25, margin: '40px 0 0', maxWidth: 880, textWrap: 'balance' }}>
          Everyone else tells you what your agents did. <em style={{ color: 'var(--gold-deep)' }}>Syntropiq decides what they’re allowed to do — before they do it.</em>
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 56 }} className="moat-grid">
          <style>{`
            @media (max-width: 880px) { .moat-grid { grid-template-columns: 1fr !important; } }
            .moat-card { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 28px; transition: border-color 0.2s, transform 0.3s var(--ease-out); }
            .moat-card:hover { border-color: #D8D4C8; transform: translateY(-2px); }
            .moat-card .tag { display: inline-block; font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--gold-deep); background: var(--amber-soft); padding: 4px 9px; border-radius: 999px; }
            .moat-card h3 { font-size: 21px; font-weight: 500; letter-spacing: -0.02em; margin: 16px 0 10px; }
            .moat-card p { font-size: 14px; color: var(--muted); line-height: 1.55; margin: 0; text-wrap: pretty; }
          `}</style>
          {reasons.map((r, i) => (
            <div className="moat-card" key={r.t} data-reveal data-reveal-delay={Math.min(i + 1, 5)}>
              <span className="tag">{r.tag}</span>
              <h3>{r.t}</h3>
              <p>{r.d}</p>
            </div>
          ))}
        </div>

        {/* Competitive table */}
        <div style={{ marginTop: 48, overflow: 'auto' }} data-reveal>
          <style>{`
            .moat-table { width: 100%; border-collapse: collapse; background: #fff; border-radius: 14px; overflow: hidden; border: 1px solid var(--line); min-width: 680px; }
            .moat-table th, .moat-table td { padding: 14px 16px; text-align: left; border-bottom: 1px solid var(--line); font-size: 13.5px; }
            .moat-table th:not(:first-child) { text-align: center; }
            .moat-table th { font-family: var(--font-mono); font-size: 10.5px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--soft); background: var(--bg-2); }
            .moat-table th.syn { background: var(--ink); color: #fff; }
            .moat-table td:first-child { font-weight: 500; color: var(--ink); }
            .moat-table td.cell { text-align: center; }
            .moat-table td.cell .yes, .moat-table td.cell .no, .moat-table td.cell .syn-yes { display: inline-flex; align-items: center; justify-content: center; }
            .yes { color: var(--green); } .no { color: var(--muted); font-size: 18px; font-weight: 700; line-height: 1; } .syn-yes { color: var(--gold-deep); }
          `}</style>
          <table className="moat-table">
            <thead>
              <tr>
                <th>Capability</th>
                <th>Observability<br /><span style={{ color: 'var(--soft)' }}>LangSmith · Arize</span></th>
                <th>Filters<br /><span style={{ color: 'var(--soft)' }}>Guardrails · NeMo</span></th>
                <th>Eval suites<br /><span style={{ color: 'var(--soft)' }}>OpenAI · PromptFoo</span></th>
                <th className="syn">Syntropiq</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.feat}>
                  <td>{r.feat}</td>
                  <td className="cell">{r.o ? <span className="yes"><Icon.check s={18} /></span> : <span className="no">—</span>}</td>
                  <td className="cell">{r.f ? <span className="yes"><Icon.check s={18} /></span> : <span className="no">—</span>}</td>
                  <td className="cell">{r.e ? <span className="yes"><Icon.check s={18} /></span> : <span className="no">—</span>}</td>
                  <td className="cell"><span className="syn-yes"><Icon.check s={18} /></span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Quiet patent line */}
        <div style={{ marginTop: 40, padding: '22px 26px', background: 'var(--bg-2)', border: '1px solid var(--line)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 18, flexWrap: 'wrap' }} data-reveal>
          <span style={{ color: 'var(--gold-deep)' }}><Icon.lock s={20} /></span>
          <span style={{ fontSize: 14.5, color: 'var(--ink)', flex: 1, minWidth: 280, textWrap: 'pretty' }}>
            <strong style={{ fontWeight: 500 }}>Patent pending.</strong> <span style={{ color: 'var(--muted)' }}>The governing architecture — asymmetric trust scoring, suppression & rehabilitation, foresight prediction, and constraint-gated execution — is the subject of U.S. and International Patents Pending.</span>
          </span>
        </div>
      </div>
    </section>
  );
}

// ─── Ask / Request information ───────────────────────────────
function Ask() {
  const [state, handleSubmit] = useForm('xgoqjwgo');
  const [form, setForm] = useState({ name: '', firm: '', email: '', note: '', call: false });
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  return (
    <section id="ask" className="section" style={{ scrollMarginTop: 64, paddingTop: 'clamp(20px, 2.5vw, 32px)', paddingBottom: 'clamp(56px, 7vw, 88px)' }}>
      <div className="container">
        <div style={{ background: 'var(--ink)', color: '#fff', borderRadius: 24, padding: 'clamp(36px, 5vw, 72px)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', left: -140, bottom: -120, opacity: 0.1, pointerEvents: 'none' }}>
            <SpiralMark size={620} color="var(--gold-bright)" animate speed={0.4} fadeOuter />
          </div>
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }} className="ask-grid">
            <style>{`
              @media (max-width: 980px) { .ask-grid { grid-template-columns: 1fr !important; gap: 36px; } }
              .ask-field { margin-bottom: 14px; }
              .ask-label { display: block; font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 7px; }
              .ask-input, .ask-textarea {
                width: 100%; padding: 12px 14px; border-radius: 10px; border: 1px solid rgba(255,255,255,0.14);
                background: rgba(255,255,255,0.04); color: #fff; font-size: 14.5px; transition: border-color 0.15s, background 0.15s;
              }
              .ask-input::placeholder, .ask-textarea::placeholder { color: rgba(255,255,255,0.35); }
              .ask-input:focus, .ask-textarea:focus { outline: none; border-color: var(--gold-bright); background: rgba(255,255,255,0.07); }
              .ask-textarea { min-height: 84px; resize: vertical; font-family: var(--font-sans); }
              .ask-row { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
              @media (max-width: 560px) { .ask-row { grid-template-columns: 1fr; } }
              .ask-check { display: flex; align-items: center; gap: 10px; font-size: 13.5px; color: rgba(255,255,255,0.8); cursor: pointer; margin: 6px 0 16px; }
              .ask-check input { accent-color: var(--gold-bright); width: 15px; height: 15px; }
            `}</style>
            <div>
              <div className="eyebrow" style={{ color: 'rgba(255,255,255,0.6)' }}><span className="dot" style={{ background: 'var(--gold-bright)' }} />FOR INVESTORS</div>
              <h2 className="display" style={{ fontSize: 'clamp(32px, 4.4vw, 56px)', color: '#fff', margin: '18px 0 18px' }}>
                We’re raising a <em style={{ color: 'var(--gold-bright)' }}>seed round</em>.
              </h2>
              <p style={{ fontSize: 16.5, color: 'rgba(255,255,255,0.72)', lineHeight: 1.6, maxWidth: 460, textWrap: 'pretty' }}>
                Built on a patent-pending architecture. Proven by a live engine. Aimed at a market the regulator is already mandating. Request the materials or book time with the founder — we respond within one business day.
              </p>
              <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {[['Founder', 'Erik Galardi · Founder & CEO'], ['Email', 'erik@syntropiq.ai'], ['Reference', 'U.S. and International Patents Pending']].map(([k, v]) => (
                  <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 13.5 }}>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', paddingTop: 3 }}>{k}</span>
                    <span style={{ color: '#fff', textAlign: 'right' }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              {state.succeeded ? (
                <div style={{ padding: 36, background: 'rgba(31,138,91,0.12)', border: '1px solid rgba(31,138,91,0.4)', borderRadius: 16 }}>
                  <div style={{ display: 'inline-flex', width: 48, height: 48, borderRadius: '50%', background: 'rgba(31,138,91,0.2)', color: '#7FD3A6', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}><Icon.check s={22} /></div>
                  <h3 style={{ fontSize: 24, fontWeight: 450, letterSpacing: '-0.02em', margin: '0 0 8px', color: '#fff' }}>Thank you, {form.name.split(' ')[0]}.</h3>
                  <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 15, margin: 0, lineHeight: 1.55 }}>
                    Your request is in. {form.call ? 'We’ll send a few times for a call' : 'We’ll send the materials'} within one business day — to <strong style={{ color: '#fff', fontWeight: 500 }}>{form.email}</strong>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 16, padding: 28 }}>
                  <div className="ask-row">
                    <div className="ask-field">
                      <label className="ask-label">Your name *</label>
                      <input className="ask-input" name="name" required value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Jane Smith" />
                    </div>
                    <div className="ask-field">
                      <label className="ask-label">Firm</label>
                      <input className="ask-input" name="firm" value={form.firm} onChange={(e) => set('firm', e.target.value)} placeholder="Capital Partners" />
                    </div>
                  </div>
                  <div className="ask-field">
                    <label className="ask-label">Work email *</label>
                    <input className="ask-input" name="_replyto" type="email" required value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="jane@firm.com" />
                  </div>
                  <div className="ask-field">
                    <label className="ask-label">Anything you’d like us to cover?</label>
                    <textarea className="ask-textarea" name="note" value={form.note} onChange={(e) => set('note', e.target.value)} placeholder="Optional — what you’d most like to understand." />
                  </div>
                  <label className="ask-check">
                    <input type="checkbox" name="book_a_call" value="yes" checked={form.call} onChange={(e) => set('call', e.target.checked)} />
                    I’d also like to book a 30-minute call with the founder
                  </label>
                  <button type="submit" disabled={state.submitting} className="btn amber lg" style={{ width: '100%', justifyContent: 'center', background: 'var(--gold)', color: '#0B1220', opacity: state.submitting ? 0.65 : 1, cursor: state.submitting ? 'default' : 'pointer' }}>
                    {state.submitting ? 'Sending…' : (form.call ? 'Request information & a call' : 'Request information')} <Icon.arrow s={13} />
                  </button>
                  <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.02em', marginTop: 12, textAlign: 'center' }}>
                    Confidential · we respond within one business day
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
