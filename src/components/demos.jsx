// Reusable interactive demos: streaming terminal, gating switch, trust chart.
import { useState, useEffect, useMemo, useRef } from 'react';

// ──────────────────────────────────────────────────────────────
// Streaming Terminal — animated, scripted "governed inference call"
// ──────────────────────────────────────────────────────────────
export function StreamingTerminal({ tall = false, autoplay = true }) {
  const lines = useMemo(() => [
    { t: 0,     k: 'cmd',    s: '$ recursa.invoke({ prompt: "refund customer #84221" })' },
    { t: 320,   k: 'meta',   s: '→ session_id   8e3a..d011' },
    { t: 380,   k: 'meta',   s: '→ agent        billing-ops-v3' },
    { t: 460,   k: 'meta',   s: '→ oracles      16 / loaded' },
    { t: 720,   k: 'phase',  s: '⏵ trust_score' },
    { t: 880,   k: 'kv',     k2: 'factual',     v: '0.91' },
    { t: 960,   k: 'kv',     k2: 'recursive',   v: '0.86' },
    { t: 1040,  k: 'kv',     k2: 'consistency', v: '0.79' },
    { t: 1120,  k: 'kv',     k2: 'composite',   v: '0.852' },
    { t: 1320,  k: 'phase',  s: '⏵ foresight' },
    { t: 1480,  k: 'kv',     k2: 'trajectory_24h', v: '0.84 → 0.81' },
    { t: 1560,  k: 'kv',     k2: 'drift_risk',     v: 'low' },
    { t: 1760,  k: 'phase',  s: '⏵ constraint_gate' },
    { t: 1920,  k: 'kv',     k2: 'policy.pii',      v: 'pass' },
    { t: 2000,  k: 'kv',     k2: 'policy.amount',   v: 'pass · within $500 limit' },
    { t: 2080,  k: 'kv',     k2: 'policy.recursion', v: 'pass' },
    { t: 2280,  k: 'allow',  s: '✓ DECISION  allow' },
    { t: 2380,  k: 'meta',   s: '→ ledger_id    rl_01HF…7q · committed' },
    { t: 2460,  k: 'meta',   s: '→ latency      41ms' },
  ], []);

  const [shown, setShown] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!autoplay) return;
    const el = containerRef.current;
    if (!el) return;
    let cancelled = false;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !intervalRef.current) {
          let i = 0;
          const next = () => {
            if (cancelled || i >= lines.length) return;
            setShown(i + 1);
            i++;
            const delay = lines[i] ? lines[i].t - lines[i - 1].t : 1800;
            intervalRef.current = setTimeout(next, Math.max(120, delay));
          };
          intervalRef.current = setTimeout(next, 200);
        }
      });
    }, { threshold: 0.4 });
    observer.observe(el);
    return () => {
      cancelled = true;
      observer.disconnect();
      if (intervalRef.current) clearTimeout(intervalRef.current);
      intervalRef.current = null;
    };
  }, [autoplay, lines]);

  const restart = () => {
    if (intervalRef.current) clearTimeout(intervalRef.current);
    setShown(0);
    let i = 0;
    const next = () => {
      if (i >= lines.length) return;
      setShown(i + 1);
      i++;
      const delay = lines[i] ? lines[i].t - lines[i - 1].t : 1800;
      intervalRef.current = setTimeout(next, Math.max(120, delay));
    };
    intervalRef.current = setTimeout(next, 200);
  };

  return (
    <div className="terminal" ref={containerRef}>
      <style>{`
        .terminal {
          border-radius: 14px;
          background: #0B1220;
          color: #E8EBF2;
          font-family: var(--font-mono);
          font-size: 12.5px;
          line-height: 1.65;
          overflow: hidden;
          position: relative;
          box-shadow: 0 30px 70px -30px rgba(11,30,63,0.45), 0 1px 0 rgba(255,255,255,0.06) inset;
        }
        .terminal-head {
          display: flex; align-items: center; justify-content: space-between;
          padding: 12px 16px;
          background: rgba(255,255,255,0.03);
          border-bottom: 1px solid rgba(255,255,255,0.06);
        }
        .terminal-head .dots { display: flex; gap: 6px; }
        .terminal-head .dot { width: 9px; height: 9px; border-radius: 50%; background: rgba(255,255,255,0.18); }
        .terminal-head .endpoint {
          font-size: 11.5px; color: rgba(255,255,255,0.55);
          letter-spacing: 0.02em;
        }
        .terminal-head button {
          font-size: 11px; color: rgba(255,255,255,0.65);
          padding: 4px 8px; border-radius: 6px;
          border: 1px solid rgba(255,255,255,0.1);
          transition: background 0.15s;
        }
        .terminal-head button:hover { background: rgba(255,255,255,0.06); color: #fff; }
        .terminal-body {
          padding: 18px 20px;
          max-height: ${tall ? '460px' : '380px'};
          min-height: ${tall ? '460px' : '380px'};
          overflow-y: auto;
        }
        .terminal-body::-webkit-scrollbar { width: 6px; }
        .terminal-body::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 3px; }
        .line { display: flex; gap: 12px; padding: 1px 0; }
        .line.cmd  { color: #fff; font-weight: 500; }
        .line.meta { color: rgba(255,255,255,0.5); }
        .line.phase { color: #E0B654; margin-top: 6px; font-weight: 500; }
        .line.kv   { color: rgba(255,255,255,0.8); padding-left: 18px; }
        .line.kv .key { color: rgba(255,255,255,0.5); min-width: 130px; }
        .line.kv .val { color: #E8EBF2; }
        .line.allow {
          color: #7FD3A6;
          background: rgba(31,138,91,0.12);
          padding: 6px 10px;
          border-radius: 6px;
          margin: 8px 0;
          font-weight: 500;
          border-left: 2px solid #1F8A5B;
        }
        .cursor {
          display: inline-block; width: 7px; height: 14px;
          background: #E0B654;
          vertical-align: -2px;
          margin-left: 4px;
          animation: blink 1.1s steps(2) infinite;
        }
        @keyframes blink { 50% { opacity: 0; } }
        .line-enter { animation: lineIn 0.22s var(--ease-out) both; }
        @keyframes lineIn { from { opacity: 0; transform: translateY(2px); } to { opacity: 1; transform: none; } }
      `}</style>
      <div className="terminal-head">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="dots"><span className="dot" /><span className="dot" /><span className="dot" /></div>
          <span className="endpoint">recursa.syntropiq.ai · POST /v1/invoke</span>
        </div>
        <button onClick={restart}>↻ replay</button>
      </div>
      <div className="terminal-body">
        {lines.slice(0, shown).map((l, i) => {
          if (l.k === 'kv') {
            return (
              <div key={i} className="line kv line-enter">
                <span className="key">{l.k2}</span>
                <span className="val">{l.v}</span>
              </div>
            );
          }
          return <div key={i} className={'line ' + l.k + ' line-enter'}>{l.s}</div>;
        })}
        {shown < lines.length && <span className="cursor" />}
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Gating Demo — hover or click to switch Allow / Review / Deny
// ──────────────────────────────────────────────────────────────
export function GatingDemo() {
  const [state, setState] = useState('allow');
  const variants = {
    allow:  { color: '#1F8A5B', label: 'Allow', desc: 'Trust > 0.80, no policy violations. Action commits.', score: 0.85, bar: 85 },
    review: { color: '#C8941F', label: 'Review', desc: 'Drift detected. Routed to human with full reasoning chain.', score: 0.62, bar: 62 },
    deny:   { color: '#B23A3A', label: 'Deny',  desc: 'Constraint violation. Circuit breaker fires pre-execution.', score: 0.21, bar: 21 },
  };
  const v = variants[state];
  return (
    <div className="gating">
      <style>{`
        .gating {
          border: 1px solid var(--line); border-radius: 14px;
          background: #fff;
          padding: 24px;
          display: flex; flex-direction: column; gap: 20px;
        }
        .gating-tabs {
          display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 6px;
          background: var(--bg-3);
          padding: 4px; border-radius: 10px;
        }
        .gating-tabs button {
          padding: 9px 12px; border-radius: 7px;
          font-size: 13px; font-weight: 500; letter-spacing: -0.005em;
          color: var(--muted);
          transition: all 0.2s var(--ease-out);
        }
        .gating-tabs button.on {
          background: #fff; color: var(--ink);
          box-shadow: 0 1px 0 rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06);
        }
        .gating-tabs button .swatch {
          display: inline-block; width: 7px; height: 7px; border-radius: 50%;
          margin-right: 8px; vertical-align: 1px;
        }
        .gating-body {
          display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
        }
        @media (max-width: 720px) { .gating-body { grid-template-columns: 1fr; } }
        .gating-score {
          display: flex; flex-direction: column; gap: 10px;
        }
        .gating-bar {
          height: 6px; background: var(--bg-3); border-radius: 999px; overflow: hidden;
          margin-top: 4px;
        }
        .gating-bar > span {
          display: block; height: 100%; border-radius: 999px;
          transition: width 0.6s var(--ease-out), background 0.3s;
        }
        .gating-outcome {
          padding: 16px; border-radius: 10px;
          background: var(--bg-2);
          border-left: 3px solid;
          transition: border-color 0.3s, background 0.3s;
        }
        .gating-arrow {
          display: flex; align-items: center; gap: 10px;
          color: var(--muted); font-size: 12px;
          font-family: var(--font-mono); letter-spacing: 0.04em; text-transform: uppercase;
        }
        .gating-line {
          flex: 1; height: 1px; background: var(--line);
          position: relative;
        }
        @keyframes travel {
          from { left: -24px; }
          to { left: 100%; }
        }
      `}</style>
      <div className="gating-tabs" role="tablist">
        {Object.entries(variants).map(([k, vv]) => (
          <button
            key={k}
            className={state === k ? 'on' : ''}
            onMouseEnter={() => setState(k)}
            onClick={() => setState(k)}
          >
            <span className="swatch" style={{ background: vv.color }} />
            {vv.label}
          </button>
        ))}
      </div>
      <div className="gating-arrow">
        <span>Agent</span>
        <span className="gating-line"><span style={{ background: v.color, position: 'absolute', top: -2, width: 24, height: 5, borderRadius: 999, animation: 'travel 2.6s linear infinite' }} /></span>
        <span style={{ color: v.color }}>{v.label}</span>
        <span className="gating-line"><span style={{ background: v.color, position: 'absolute', top: -2, width: 24, height: 5, borderRadius: 999, animation: 'travel 2.6s linear infinite', animationDelay: '1.3s' }} /></span>
        <span>World</span>
      </div>
      <div className="gating-body">
        <div className="gating-score">
          <div className="eyebrow">Composite trust score</div>
          <div style={{ fontSize: 38, fontWeight: 450, letterSpacing: '-0.03em', fontFamily: 'var(--font-mono)' }}>
            {v.score.toFixed(3)}
          </div>
          <div className="gating-bar">
            <span style={{ width: v.bar + '%', background: v.color }} />
          </div>
          <div style={{ fontSize: 12, color: 'var(--muted)', fontFamily: 'var(--font-mono)', display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
            <span>deny ≤ 0.40</span>
            <span>review ≤ 0.75</span>
            <span>allow {'>'} 0.75</span>
          </div>
        </div>
        <div className="gating-outcome" style={{ borderColor: v.color, background: v.color + '0d' }}>
          <div className="eyebrow" style={{ color: v.color }}>
            <span className="dot" style={{ background: v.color }} /> Decision · {v.label}
          </div>
          <p style={{ margin: '10px 0 0', fontSize: 14, lineHeight: 1.55 }}>{v.desc}</p>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Trust Trajectory chart — animated SVG line with foresight cone
// ──────────────────────────────────────────────────────────────
export function TrustTrajectory() {
  const W = 600, H = 280;
  const padL = 50, padR = 30, padT = 30, padB = 38;
  const innerW = W - padL - padR, innerH = H - padT - padB;

  // Past values (real-ish) and future foresight band
  const past = [0.82, 0.79, 0.84, 0.86, 0.83, 0.81, 0.85, 0.79, 0.74, 0.71, 0.68, 0.66];
  const future = [0.64, 0.61, 0.59, 0.57, 0.55, 0.53];
  const futureUp = future.map((v) => Math.min(1, v + 0.08));
  const futureDn = future.map((v) => Math.max(0, v - 0.10));

  const all = [...past, ...future];
  const xStep = innerW / (all.length - 1);
  const y = (v) => padT + innerH * (1 - v);
  const x = (i) => padL + i * xStep;

  const linePast = past.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i)} ${y(v)}`).join(' ');
  const lineFuture = future.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(past.length - 1 + i)} ${y(v)}`).join(' ');

  // Foresight cone polygon
  const conePts = [
    ...futureUp.map((v, i) => `${x(past.length - 1 + i)},${y(v)}`),
    ...futureDn.slice().reverse().map((v, i) => `${x(past.length - 1 + (futureDn.length - 1 - i))},${y(v)}`),
  ].join(' ');

  const reviewLine = y(0.75);
  const denyLine = y(0.40);

  const [animKey, setAnimKey] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) setAnimKey((k) => k + 1);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const breachIdx = future.findIndex((v) => v < 0.55);
  const breachX = breachIdx >= 0 ? x(past.length - 1 + breachIdx) : null;
  const breachY = breachIdx >= 0 ? y(future[breachIdx]) : null;

  return (
    <div ref={ref} className="trust-chart" key={animKey}>
      <style>{`
        .trust-chart { background: #fff; border: 1px solid var(--line); border-radius: 14px; padding: 20px; }
        .chart-head { display: flex; justify-content: space-between; align-items: end; margin-bottom: 12px; }
        .chart-title { font-size: 14px; font-weight: 500; color: var(--ink); }
        .chart-sub { font-size: 11.5px; color: var(--muted); font-family: var(--font-mono); letter-spacing: 0.02em; }
        .chart-legend { display: flex; gap: 16px; font-size: 11.5px; color: var(--muted); font-family: var(--font-mono); }
        .chart-legend .sw { display: inline-block; width: 14px; height: 3px; border-radius: 2px; margin-right: 6px; vertical-align: 3px; }
        .trust-line-past { animation: drawIn 1.6s var(--ease-out) both; stroke-dasharray: 1200; stroke-dashoffset: 1200; }
        .trust-line-future { animation: drawIn 1.4s 1.4s var(--ease-out) both; stroke-dasharray: 600; stroke-dashoffset: 600; }
        .trust-cone { animation: fadeIn 0.8s 1.6s var(--ease-out) both; opacity: 0; }
        .breach-marker { animation: fadeIn 0.4s 2.4s var(--ease-out) both; opacity: 0; }
        @keyframes drawIn { to { stroke-dashoffset: 0; } }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
      <div className="chart-head">
        <div>
          <div className="chart-title">Trust trajectory · 24h foresight</div>
          <div className="chart-sub">agent: doc-classifier-v7 · drift detected before degradation</div>
        </div>
        <div className="chart-legend">
          <span><span className="sw" style={{ background: 'var(--ink)' }} />observed</span>
          <span><span className="sw" style={{ background: 'var(--amber)' }} />forecast</span>
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }}>
        {/* gridlines */}
        {[0, 0.25, 0.5, 0.75, 1].map((g) => (
          <g key={g}>
            <line x1={padL} x2={W - padR} y1={y(g)} y2={y(g)} stroke="#EFEFF2" strokeWidth="1" />
            <text x={padL - 8} y={y(g) + 4} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10.5" fill="#9AA3B5">{g.toFixed(2)}</text>
          </g>
        ))}
        {/* policy bands */}
        <line x1={padL} x2={W - padR} y1={reviewLine} y2={reviewLine} stroke="#C8941F" strokeWidth="1" strokeDasharray="3 3" opacity="0.55" />
        <text x={W - padR - 4} y={reviewLine - 5} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="#B5821A">review threshold</text>
        <line x1={padL} x2={W - padR} y1={denyLine} y2={denyLine} stroke="#B23A3A" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
        <text x={W - padR - 4} y={denyLine - 5} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="#B23A3A">deny threshold</text>
        {/* divider between past and future */}
        <line x1={x(past.length - 1)} x2={x(past.length - 1)} y1={padT} y2={H - padB} stroke="#D5D8DF" strokeDasharray="2 4" />
        <text x={x(past.length - 1) - 6} y={padT + 12} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="#9AA3B5">now</text>

        {/* foresight cone */}
        <polygon className="trust-cone" points={conePts} fill="#C8941F" opacity="0.12" />

        {/* past line */}
        <path className="trust-line-past" d={linePast} fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* future line */}
        <path className="trust-line-future" d={lineFuture} fill="none" stroke="var(--amber)" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" strokeLinejoin="round" />

        {/* breach marker */}
        {breachX && (
          <g className="breach-marker">
            <circle cx={breachX} cy={breachY} r="5" fill="#fff" stroke="#B23A3A" strokeWidth="2" />
            <line x1={breachX} x2={breachX} y1={breachY - 14} y2={padT + 28} stroke="#B23A3A" strokeWidth="1" strokeDasharray="2 2" />
            <text x={breachX + 6} y={padT + 24} fontFamily="var(--font-mono)" fontSize="10.5" fill="#B23A3A">drift breach · t+18h</text>
          </g>
        )}

        {/* x labels */}
        <text x={padL} y={H - padB + 18} fontFamily="var(--font-mono)" fontSize="10" fill="#9AA3B5">-12h</text>
        <text x={x(past.length - 1)} y={H - padB + 18} textAnchor="middle" fontFamily="var(--font-mono)" fontSize="10" fill="#9AA3B5">now</text>
        <text x={W - padR} y={H - padB + 18} textAnchor="end" fontFamily="var(--font-mono)" fontSize="10" fill="#9AA3B5">+24h</text>
      </svg>
    </div>
  );
}
