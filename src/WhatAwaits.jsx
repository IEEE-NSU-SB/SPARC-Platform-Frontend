import { useEffect, useState } from 'react';

const CARDS = [
  {
    img: '/assets/spac24-46.jpg', alt: 'Students talking with professionals at SPAC 2024',
    title: 'Professional Networking', meta: 'Connect · Face to face', short: 'Meet the people already doing the work.',
    long: 'Meet engineers, leaders and industry professionals face to face, and ask them what their work is really like.',
  },
  {
    img: '/assets/spac24-64.jpg', alt: 'A speaker at the podium during SPAC 2024',
    title: 'Talks from Professionals', meta: 'Listen · Career stories', short: 'Careers, told by the people who built them.',
    long: 'Hear experienced professionals share how they built their careers and what the industry expects from graduates.',
  },
  {
    img: '/assets/spac24-82.jpg', alt: 'Guests seated for the formal dinner at SPAC 2024',
    title: 'Formal Dinner', meta: 'Dine · The conclave table', short: 'The conversation continues over dinner.',
    long: 'Continue the conversation over a formal dinner with guests, speakers and students from across the region.',
  },
];

/* Staggered experience cards; the + button opens the details (Esc closes). */
export default function WhatAwaits() {
  const [open, setOpen] = useState([]);
  const toggle = (i) => setOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]));

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setOpen([]); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <section className="awaits on-dark" id="experiences">
      <div className="in">
        <h2 className="aw-title" data-reveal>What awaits you.</h2>
        <p className="aw-lead" data-reveal>
          An evening built around conversations with the people already doing the work you are studying for.
        </p>
        <div className="exp">
          {CARDS.map((c, i) => {
            const isOpen = open.includes(i);
            return (
              <article key={c.title} className={`xcard${isOpen ? ' open' : ''}`} data-reveal style={{ '--d': `${0.08 * i}s` }}>
                <img src={c.img} alt={c.alt} loading="lazy" />
                <div className="xbody"><h3>{c.title}</h3><span className="xmeta">{c.meta}</span><p>{c.short}</p></div>
                <div className="xmore" id={`xm-${i + 1}`}>
                  <span className="xmeta">{c.meta}</span><h3>{c.title}</h3><p>{c.long}</p><small>Photo: SPAC 2024</small>
                </div>
                <button
                  className="xplus" type="button" aria-expanded={isOpen} aria-controls={`xm-${i + 1}`}
                  aria-label={`${isOpen ? 'Close details for' : 'More about'} ${c.title}`}
                  onClick={() => toggle(i)}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
