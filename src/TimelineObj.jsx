import React, { useEffect } from 'react';

const STYLE_ID = 'sparc-timeline-styles';

const TIMELINE_CSS = `
.sparc-tl {
  width: 100%;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  box-sizing: border-box;
}

.sparc-tl__row {
  display: grid;
  grid-template-columns: clamp(76px, 20vw, 118px) 24px 1fr;
  column-gap: clamp(10px, 2.2vw, 20px);
  padding: 16px 10px;
  border-radius: 8px;
  border-bottom: 1px solid rgba(20, 20, 23, 0.1);
  transition: background-color 0.18s ease;
}

.sparc-tl__row:last-child { border-bottom: none; }
.sparc-tl__row:hover { background-color: rgba(0, 0, 0, 0.045); }

/* Left: Flush-Left Time Column */
.sparc-tl__time {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  font-variant-numeric: tabular-nums;
}

.sparc-tl__time-start {
  font-size: clamp(0.9rem, 1.6vw, 1.02rem);
  font-weight: 700;
  line-height: 1.25;
  color: #b90e2c;
}

.sparc-tl__time-end {
  margin-top: 2px;
  font-size: clamp(0.76rem, 1.3vw, 0.84rem);
  font-weight: 500;
  color: #6b7280;
}

/* Center: Self-Centering Crimson String & Hollow Node */
.sparc-tl__rail {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -16px 0;
}

.sparc-tl__line {
  width: 2px;
  background-color: rgba(200, 16, 46, 0.35);
}

.sparc-tl__line--top { height: 19px; }
.sparc-tl__line--bot { flex: 1; }

.sparc-tl__row:first-child .sparc-tl__line--top,
.sparc-tl__row:last-child .sparc-tl__line--bot {
  visibility: hidden;
}

.sparc-tl__node {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: #ffffff;
  border: 3px solid #c8102e;
  box-shadow: 0 0 0 4px rgba(200, 16, 46, 0.12);
  box-sizing: border-box;
  flex-shrink: 0;
}

/* Right: Event Text */
.sparc-tl__title {
  margin: 0;
  font-size: clamp(0.96rem, 1.8vw, 1.12rem);
  font-weight: 700;
  line-height: 1.35;
  color: #141417;
}

.sparc-tl__desc {
  margin: 4px 0 0;
  font-size: clamp(0.85rem, 1.4vw, 0.94rem);
  line-height: 1.5;
  color: #52525b;
}

/* Optional Dark Theme Support */
.sparc-tl[data-theme='dark'] .sparc-tl__row { border-bottom-color: rgba(255, 255, 255, 0.1); }
.sparc-tl[data-theme='dark'] .sparc-tl__row:hover { background-color: rgba(255, 255, 255, 0.06); }
.sparc-tl[data-theme='dark'] .sparc-tl__node { background-color: #120306; }
.sparc-tl[data-theme='dark'] .sparc-tl__title { color: #ffffff; }
.sparc-tl[data-theme='dark'] .sparc-tl__time-end,
.sparc-tl[data-theme='dark'] .sparc-tl__desc { color: #a1a1aa; }
`;

export const DEFAULT_TIMELINE_EVENTS = [
  {
    title: 'Participant Reporting & Registration',
    time: '8:30 AM - 9:00 AM',
    description: 'Show your QR Code (sent-via-mail) at the booth',
  },
  {
    title: 'Breakfast and Orientation',
    time: '9:00 AM - 9:30 AM',
    description: 'Network with fellow attendees and enjoy refreshments',
  },
  {
    title: 'Inaugural ceremony',
    time: '9:30 AM - 10:00 AM',
  },
  {
    title: `Harnessing Solar Energy:
      Powering a Clean and
      Sustainable Future`,
    time: '10:00 AM - 10:40 AM',
  },
];

const cleanText = (value) => (value ? value.replace(/\s+/g, ' ').trim() : '');

export default function TimelineObj({
  events = DEFAULT_TIMELINE_EVENTS,
  theme = 'light',
  className = '',
  style = {},
}) {
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
      const tag = document.createElement('style');
      tag.id = STYLE_ID;
      tag.textContent = TIMELINE_CSS;
      document.head.appendChild(tag);
    }
  }, []);

  return (
    <div
      data-theme={theme}
      className={`sparc-tl ${className}`.trim()}
      style={style}
    >
      {events.map((item, i) => {
        const [start, end] = (item.time || '').split(/\s*[-–—]\s*/);
        const title = cleanText(item.title);
        const desc = cleanText(item.description);

        return (
          <div key={`${title}-${i}`} className="sparc-tl__row">
            <div className="sparc-tl__time">
              <span className="sparc-tl__time-start">{start}</span>
              {end && <span className="sparc-tl__time-end">{end}</span>}
            </div>

            <div className="sparc-tl__rail" aria-hidden="true">
              <span className="sparc-tl__line sparc-tl__line--top" />
              <span className="sparc-tl__node" />
              <span className="sparc-tl__line sparc-tl__line--bot" />
            </div>

            <div>
              <h3 className="sparc-tl__title">{title}</h3>
              {desc && <p className="sparc-tl__desc">{desc}</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
}