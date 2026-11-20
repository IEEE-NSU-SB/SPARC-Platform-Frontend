import { useEffect, useState } from 'react';
import CONFIG from './config';
import { pad2 } from './lib/utils';

const cd = CONFIG.countdown || {};
const END = new Date(cd.deadline).getTime();

function remaining(now) {
  const diff = END - now;
  if (diff <= 0) return null;
  const s = Math.floor(diff / 1000);
  return { d: pad2(Math.floor(s / 86400)), h: pad2(Math.floor((s % 86400) / 3600)), m: pad2(Math.floor((s % 3600) / 60)), s: pad2(s % 60) };
}

function deadlineText() {
  try {
    const f = new Intl.DateTimeFormat('en-GB', {
      timeZone: cd.timeZone || 'Asia/Dhaka', day: 'numeric', month: 'long', year: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true,
    });
    return `Deadline: ${f.format(new Date(END))} (BST, UTC+6)`;
  } catch {
    return '';
  }
}
const WHEN = deadlineText();
const UNITS = [['d', 'Days'], ['h', 'Hours'], ['m', 'Minutes'], ['s', 'Seconds']];

/* Countdown to CONFIG.countdown.deadline in Bangladesh time.
   Each number slides in when it changes (CSS .tick). */
export default function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (!cd.enabled || Number.isNaN(END)) return null;
  const t = remaining(now);

  return (
    <div className="countdown" data-star-avoid aria-live="off">
      {t ? (
        <>
          <div className="cd-label"><span>{cd.label || 'Closes in'}</span></div>
          <div className="cd-units" role="timer" aria-label="Time remaining">
            {UNITS.map(([u, cap]) => (
              <div className="cd-unit" key={u}>
                <span className="cd-num"><span key={t[u]} className="tick">{t[u]}</span></span>
                <span className="cd-cap">{cap}</span>
              </div>
            ))}
          </div>
          {WHEN && <div className="cd-when">{WHEN}</div>}
        </>
      ) : (
        <p className="cd-done">{cd.expiredMessage || 'This deadline has passed.'}</p>
      )}
    </div>
  );
}
