import { useEffect, useRef } from 'react';
import CONFIG from './config';
import { initCountUp } from './lib/effects';
import ambassadors from './data/ambassadors';

/* Universities = the distinct universities our campus ambassadors come from,
   so the number follows the Ambassadors list automatically. */
const UNIVERSITIES = new Set(
  ambassadors.map((a) => (a.uniName || a.university || '').trim().toLowerCase()).filter(Boolean)
).size;
const AUTO = { Universities: UNIVERSITIES };

const ICON = {
  editions: <><path d="M12 3 3 7.5l9 4.5 9-4.5L12 3Z" /><path d="m3 12 9 4.5 9-4.5" /><path d="m3 16.5 9 4.5 9-4.5" /></>,
  network: <><circle cx="12" cy="5" r="2.2" /><circle cx="5" cy="18" r="2.2" /><circle cx="19" cy="18" r="2.2" /><path d="M11 7 6 16M13 7l5 9M7.2 18h9.6" /></>,
  people: <><circle cx="9" cy="8" r="3.2" /><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" /><path d="M16 5.2a3 3 0 0 1 0 5.6M18 14.4c1.8.8 3 2.6 3 4.6" /></>,
  expert: <><rect x="3" y="7" width="18" height="13" rx="1.5" /><path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7M3 12.5h18M11 12.5v2h2v-2" /></>,
};

/* Metric cards from CONFIG.metrics. A value of null shows "TBA". */
export default function Metrics() {
  const ref = useRef(null);
  useEffect(() => initCountUp(ref.current), []);

  return (
    <section className="metrics" id="metrics" aria-labelledby="metrics-title">
      <div className="in">
        <div className="m-intro" data-reveal>
          <span className="mono-label">SPARC at a glance</span>
          <h2 id="metrics-title">The fourth edition, now <span>regional.</span></h2>
        </div>
        <div className="m-cards" ref={ref}>
          {CONFIG.metrics.map((m0, i) => {
            const m = m0.value == null && AUTO[m0.label] ? { ...m0, value: AUTO[m0.label] } : m0;
            const known = typeof m.value === 'number';
            return (
              <div key={m.label} className={`metric${known ? '' : ' tba'}`} data-reveal style={{ '--d': `${0.07 * i}s` }}>
                <div className="m-head">
                  <svg viewBox="0 0 24 24" aria-hidden="true">{ICON[m.icon] || ICON.network}</svg>
                  <span className="m-note">{m.note}</span>
                </div>
                <div className="m-num">
                  {known ? (<><span data-target={m.value}>{m.value}</span><sup>{m.suffix || ''}</sup></>) : <span>TBA</span>}
                </div>
                <div className="m-label">{m.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
