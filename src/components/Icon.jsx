// Icons (line, 16/20px, currentColor)
export const Icon = {
  arrow: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  ),
  arrowUR: ({ s = 12 }) => (
    <svg width={s} height={s} viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l6-6M3.5 3h5.5v5.5" />
    </svg>
  ),
  check: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 8.5L6.5 12 13 4.5" />
    </svg>
  ),
  x: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
    </svg>
  ),
  dot: () => <span style={{ display: 'inline-block', width: 5, height: 5, background: 'currentColor', borderRadius: '50%' }} />,
  shield: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5L2.5 3.5v4.2c0 3.4 2.4 5.7 5.5 6.8 3.1-1.1 5.5-3.4 5.5-6.8V3.5L8 1.5z" />
      <path d="M5.5 8L7 9.5 10.5 6" />
    </svg>
  ),
  spark: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5v3M8 11.5v3M1.5 8h3M11.5 8h3M3.4 3.4l2.1 2.1M10.5 10.5l2.1 2.1M3.4 12.6l2.1-2.1M10.5 5.5l2.1-2.1" />
    </svg>
  ),
  layers: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 2L1.5 5 8 8l6.5-3L8 2z" />
      <path d="M1.5 8L8 11l6.5-3M1.5 11L8 14l6.5-3" />
    </svg>
  ),
  bolt: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 1.5L3 9h4l-1 5.5L13 7H9l0-5.5z" />
    </svg>
  ),
  graph: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 14V2M14 14H2" />
      <path d="M4 11l3-3 2.5 2L13 5.5" />
    </svg>
  ),
  brain: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3.5a2 2 0 014 0v9a2 2 0 01-4 0M5 6H3.5a1.5 1.5 0 000 3H5M9 7h1.5a1.5 1.5 0 010 3H9M9 4h1.5a1.5 1.5 0 010 3H9" />
    </svg>
  ),
  lock: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="10" height="7" rx="1.5" />
      <path d="M5 7V5a3 3 0 016 0v2" />
    </svg>
  ),
  search: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L13.5 13.5" />
    </svg>
  ),
  menu: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M2 4.5h12M2 8h12M2 11.5h12" />
    </svg>
  ),
  code: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5.5 4L2 8l3.5 4M10.5 4L14 8l-3.5 4" />
    </svg>
  ),
  book: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 3.5h4a2 2 0 012 2v8a1.5 1.5 0 00-1.5-1.5h-4.5v-8.5zM13.5 3.5h-4a2 2 0 00-2 2v8a1.5 1.5 0 011.5-1.5h4.5v-8.5z" />
    </svg>
  ),
  play: ({ s = 14 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="currentColor">
      <path d="M5 3.5v9l7-4.5z" />
    </svg>
  ),
  ledger: ({ s = 16 }) => (
    <svg width={s} height={s} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" />
      <path d="M5 6h6M5 8.5h6M5 11h4" />
    </svg>
  ),
};
