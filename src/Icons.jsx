// SVG icon sprite (rendered once in App) and the arrow used in buttons.

export function IconSprite() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <defs>
        <symbol id="i-arrow" viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6" /></symbol>
        <symbol id="i-left" viewBox="0 0 24 24"><path d="M15 6l-6 6 6 6" /></symbol>
        <symbol id="i-right" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></symbol>
        <symbol id="i-up" viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6" /></symbol>
        <symbol id="i-close" viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18" /></symbol>
        <symbol id="i-plus" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M11 8v6M8 11h6M16.5 16.5L21 21" /></symbol>
        <symbol id="i-minus" viewBox="0 0 24 24"><circle cx="11" cy="11" r="7" /><path d="M8 11h6M16.5 16.5L21 21" /></symbol>
        <symbol id="i-fit" viewBox="0 0 24 24"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" /></symbol>
        <symbol id="spin" viewBox="0 0 16 16"><path d="M8 1.5v2M8 12.5v2M1.5 8h2M12.5 8h2M3.4 3.4l1.4 1.4M11.2 11.2l1.4 1.4M3.4 12.6l1.4-1.4M11.2 4.8l1.4-1.4" /></symbol>
      </defs>
    </svg>
  );
}

export function Icon({ name }) {
  return <svg aria-hidden="true"><use href={`#${name}`} /></svg>;
}

export function ArrowIcon() {
  return (
    <svg className="arr" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
