// Cmd+K — jump to sections + investor actions
import { useState, useEffect, useMemo, useRef } from 'react';
import { Icon } from './Icon.jsx';
import { scrollToSection } from '../utils.js';

export function CmdK() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hi, setHi] = useState(0);
  const inputRef = useRef(null);

  const items = useMemo(() => [
    { group: 'Sections', label: 'The problem', icon: 'spark', id: 'problem' },
    { group: 'Sections', label: 'The solution', icon: 'shield', id: 'solution' },
    { group: 'Sections', label: 'Approach & roadmap', icon: 'layers', id: 'approach' },
    { group: 'Sections', label: 'Market & regulation', icon: 'graph', id: 'market' },
    { group: 'Sections', label: 'The moat', icon: 'lock', id: 'moat' },
    { group: 'Investors', label: 'Request information', icon: 'arrow', id: 'ask' },
    { group: 'Investors', label: 'Book a call', icon: 'arrow', id: 'ask' },
    { group: 'Investors', label: 'Email the founder', icon: 'arrowUR', href: 'mailto:erik@syntropiq.ai' },
  ], []);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return items;
    return items.filter((i) => i.label.toLowerCase().includes(s) || i.group.toLowerCase().includes(s));
  }, [q, items]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setOpen((o) => !o); }
      else if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    const onOpen = () => setOpen(true);
    window.addEventListener('open-cmdk', onOpen);
    return () => { window.removeEventListener('keydown', onKey); window.removeEventListener('open-cmdk', onOpen); };
  }, []);

  useEffect(() => {
    if (open) { setQ(''); setHi(0); setTimeout(() => inputRef.current?.focus(), 30); document.body.style.overflow = 'hidden'; }
    else document.body.style.overflow = '';
  }, [open]);
  useEffect(() => { setHi(0); }, [q]);

  const select = (it) => {
    setOpen(false);
    if (it.href) window.location.href = it.href;
    else if (it.id) setTimeout(() => scrollToSection(it.id), 60);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHi((h) => Math.min(h + 1, filtered.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHi((h) => Math.max(h - 1, 0)); }
    else if (e.key === 'Enter') { e.preventDefault(); filtered[hi] && select(filtered[hi]); }
  };

  if (!open) return null;

  const groups = {};
  filtered.forEach((it, idx) => { (groups[it.group] = groups[it.group] || []).push({ ...it, _idx: idx }); });

  return (
    <>
      <style>{`
        .cmdk-overlay { position: fixed; inset: 0; background: rgba(11,18,32,0.34); backdrop-filter: blur(8px); z-index: 100; animation: cmdkFade 0.2s var(--ease-out); }
        @keyframes cmdkFade { from { opacity: 0 } to { opacity: 1 } }
        .cmdk-modal {
          position: fixed; left: 50%; top: 16vh; transform: translateX(-50%);
          width: min(560px, calc(100vw - 32px)); background: #fff; border-radius: 14px;
          box-shadow: 0 30px 80px -20px rgba(11,18,32,0.4); z-index: 101; border: 1px solid var(--line);
          overflow: hidden; animation: cmdkPop 0.22s var(--ease-out);
        }
        @keyframes cmdkPop { from { opacity: 0; transform: translateX(-50%) translateY(-8px) scale(0.985); } to { opacity: 1; transform: translateX(-50%) translateY(0) scale(1); } }
        .cmdk-input-row { display: flex; align-items: center; gap: 12px; padding: 16px 18px; border-bottom: 1px solid var(--line); }
        .cmdk-input { flex: 1; border: 0; outline: 0; background: transparent; font-size: 16px; color: var(--ink); letter-spacing: -0.005em; }
        .cmdk-input::placeholder { color: var(--soft); }
        .cmdk-list { max-height: 52vh; overflow-y: auto; padding: 8px; }
        .cmdk-group-label { font-family: var(--font-mono); font-size: 10.5px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--soft); padding: 12px 10px 6px; }
        .cmdk-item { display: flex; align-items: center; gap: 12px; padding: 8px 10px; border-radius: 8px; cursor: pointer; font-size: 14px; }
        .cmdk-item .icon { width: 28px; height: 28px; border-radius: 6px; display: inline-flex; align-items: center; justify-content: center; background: var(--bg-2); color: var(--muted); flex-shrink: 0; }
        .cmdk-item.hi { background: var(--bg-3); }
        .cmdk-item.hi .icon { background: var(--amber-soft); color: var(--amber-2); }
        .cmdk-item .label { flex: 1; color: var(--ink); }
        .cmdk-footer { display: flex; align-items: center; justify-content: space-between; padding: 10px 18px; border-top: 1px solid var(--line); background: var(--bg-2); font-size: 11.5px; color: var(--muted); font-family: var(--font-mono); }
        .cmdk-footer .keys { display: flex; gap: 6px; align-items: center; }
        .cmdk-empty { padding: 40px 20px; text-align: center; color: var(--soft); font-size: 14px; }
      `}</style>
      <div className="cmdk-overlay" onClick={() => setOpen(false)} />
      <div className="cmdk-modal" role="dialog">
        <div className="cmdk-input-row">
          <Icon.search s={16} />
          <input ref={inputRef} className="cmdk-input" value={q} onChange={(e) => setQ(e.target.value)} onKeyDown={onKey} placeholder="Jump to a section…" />
          <span className="kbd">esc</span>
        </div>
        <div className="cmdk-list">
          {filtered.length === 0 && <div className="cmdk-empty">No matches. Try “market” or “request”.</div>}
          {Object.entries(groups).map(([g, list]) => (
            <div key={g}>
              <div className="cmdk-group-label">{g}</div>
              {list.map((it) => {
                const IconComp = Icon[it.icon] || Icon.arrow;
                return (
                  <div key={it._idx} className={'cmdk-item' + (it._idx === hi ? ' hi' : '')} onMouseEnter={() => setHi(it._idx)} onClick={() => select(it)}>
                    <span className="icon"><IconComp s={14} /></span>
                    <span className="label">{it.label}</span>
                    <Icon.arrow s={12} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="cmdk-footer">
          <span>Syntropiq</span>
          <span className="keys"><span className="kbd">↑</span><span className="kbd">↓</span> navigate · <span className="kbd">↵</span> go</span>
        </div>
      </div>
    </>
  );
}
