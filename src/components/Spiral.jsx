// SpiralMark — the signature phyllotaxis motif.
// Renders Fibonacci/golden-angle distributed squares. Animated and configurable.
import { useRef, useEffect } from 'react';

export function SpiralMark({
  size = 280,
  count = 233,            // Fibonacci number
  color = '#C9701A',
  bg = 'transparent',
  rotate = 0,
  animate = true,
  speed = 1,              // 1 = baseline
  pulse = false,          // pulse opacity per ring
  flatten = 1,            // 1 = full spiral; <1 = compressed
  fadeOuter = false,      // outer dots get smaller/fainter
}) {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);

  useEffect(() => {
    const cnv = canvasRef.current;
    if (!cnv) return;
    const dpr = window.devicePixelRatio || 1;
    cnv.width = size * dpr;
    cnv.height = size * dpr;
    cnv.style.width = size + 'px';
    cnv.style.height = size + 'px';
    const ctx = cnv.getContext('2d');
    ctx.scale(dpr, dpr);

    // Resolve CSS custom properties (canvas can't read var()).
    let fill = color;
    if (typeof color === 'string' && color.startsWith('var(')) {
      const name = color.slice(4, -1).trim();
      const resolved = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      if (resolved) fill = resolved;
    }

    const cx = size / 2;
    const cy = size / 2;
    const golden = Math.PI * (3 - Math.sqrt(5)); // ~137.5°
    const maxR = (size / 2) * 0.96 * flatten;
    const baseSquare = Math.max(1.4, size / 90);

    const draw = (t) => {
      ctx.clearRect(0, 0, size, size);
      if (bg !== 'transparent') {
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, size, size);
      }
      const phase = animate ? (t / 1000) * 0.08 * speed : 0;
      for (let i = 0; i < count; i++) {
        const norm = i / count;
        const r = maxR * Math.sqrt(norm);
        const a = i * golden + (rotate * Math.PI) / 180 + phase * (1 + norm * 0.3);
        const x = cx + r * Math.cos(a);
        const y = cy + r * Math.sin(a);
        const sz = baseSquare * (fadeOuter ? (1 - norm * 0.45) : (1 - norm * 0.15));
        let alpha = 1;
        if (fadeOuter) alpha = 0.25 + (1 - norm) * 0.75;
        if (pulse) {
          alpha *= 0.55 + 0.45 * Math.sin(phase * 4 + i * 0.08);
        }
        ctx.fillStyle = fill;
        ctx.globalAlpha = alpha;
        ctx.fillRect(x - sz / 2, y - sz / 2, sz, sz);
      }
      ctx.globalAlpha = 1;
      if (animate) rafRef.current = requestAnimationFrame(draw);
    };

    if (animate) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      draw(0);
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, [size, count, color, bg, rotate, animate, speed, pulse, flatten, fadeOuter]);

  return <canvas ref={canvasRef} style={{ display: 'block' }} />;
}

// A subtle SVG version for very small / static contexts (logos, footers)
export function SpiralMarkSVG({ size = 24, color = '#C9701A', count = 89 }) {
  const golden = Math.PI * (3 - Math.sqrt(5));
  const cx = size / 2, cy = size / 2;
  const maxR = size / 2 * 0.92;
  const sq = Math.max(1.2, size / 18);
  const cells = [];
  for (let i = 0; i < count; i++) {
    const r = maxR * Math.sqrt(i / count);
    const a = i * golden;
    const x = cx + r * Math.cos(a);
    const y = cy + r * Math.sin(a);
    cells.push(<rect key={i} x={x - sq / 2} y={y - sq / 2} width={sq} height={sq} fill={color} />);
  }
  return <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>{cells}</svg>;
}
