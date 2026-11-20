import React, { useEffect, useRef, useState } from 'react';

const STYLE_ID = 'sparc-speakers-styles';

const SPEAKERS_CSS = `
.sparc-spk-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
  font-family: var(--f-head, 'Instrument Sans', system-ui, sans-serif);
}

.sparc-spk-card {
  display: grid;
  grid-template-columns: 310px 1fr;
  border-radius: 20px;
  overflow: hidden;
  background: #ffffff;
  background-clip: padding-box;
  border: 1.5px solid #d6d6dc;
  box-shadow: 0 8px 24px rgba(15, 15, 20, 0.06);
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.52s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.52s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s var(--ease, ease),
    box-shadow 0.25s var(--ease, ease);
}

.sparc-spk-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.sparc-spk-card:hover {
  border-color: var(--crimson, #d0002f);
  box-shadow: 0 0 0 1px rgba(208, 0, 47, 0.25), 0 14px 30px rgba(20, 4, 10, 0.12);
}

.sparc-spk-media {
  min-height: 410px;
  background: #f3f3f5;
  border-right: 1px solid var(--hair, #ecdbe0);
  overflow: hidden;
}

.sparc-spk-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.5s var(--ease, ease);
}

.sparc-spk-card:hover .sparc-spk-media img {
  transform: scale(1.035);
}

.sparc-spk-body {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 32px 36px;
  text-align: left;
}

.sparc-spk-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.sparc-spk-name {
  margin: 0;
  font-size: clamp(1.4rem, 2.2vw, 1.75rem);
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--crimson, #d0002f);
}

.sparc-spk-role {
  margin: 6px 0 0;
  font: 600 11.5px/1.4 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted, #5e4a50);
}

.sparc-spk-org {
  font-weight: 500;
  opacity: 0.75;
}

.sparc-spk-time {
  flex-shrink: 0;
  padding: 4px 10px;
  border-radius: 9999px;
  background: #fff5f7;
  border: 1px solid rgba(208, 0, 47, 0.2);
  font: 600 11px/1.3 'JetBrains Mono', ui-monospace, monospace;
  color: var(--crimson-ink, #a3001f);
  white-space: nowrap;
}

.sparc-spk-topic {
  margin: 12px 0 0;
  font-size: 0.96rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--ink, #1c0a10);
}

.sparc-spk-desc {
  margin: 14px 0 0;
  font-size: 0.94rem;
  line-height: 1.7;
  color: var(--muted, #5e4a50);
  white-space: pre-line;
}

.sparc-spk-desc--clamped {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 9;
  overflow: hidden;
}

.sparc-spk-toggle {
  align-self: flex-start;
  margin-top: 18px;
  padding: 7px 16px;
  border-radius: 9999px;
  border: 1px solid rgba(208, 0, 47, 0.24);
  background: #fff5f7;
  color: var(--crimson, #d0002f);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}

.sparc-spk-toggle:hover,
.sparc-spk-toggle:focus-visible {
  background: var(--crimson, #d0002f);
  border-color: var(--crimson, #d0002f);
  color: #ffffff;
  outline: none;
}

@media (max-width: 760px) {
  .sparc-spk-card {
    grid-template-columns: 1fr;
  }
  .sparc-spk-media {
    min-height: 0;
    aspect-ratio: 4 / 4.5;
    border-right: none;
    border-bottom: 1px solid var(--hair, #ecdbe0);
  }
  .sparc-spk-body {
    padding: 22px 24px;
  }
  .sparc-spk-head {
    flex-direction: column;
    gap: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sparc-spk-card {
    opacity: 1;
    transform: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .sparc-spk-media img,
  .sparc-spk-toggle {
    transition: none;
  }
  .sparc-spk-card:hover .sparc-spk-media img {
    transform: none;
  }
}
`;

function SpeakerCard({ speaker }) {
  const [open, setOpen] = useState(false);

  const name = speaker.name || speaker.Name || '';
  const role = speaker.role || speaker.title || '';
  const org = speaker.organization || speaker.uniName || '';
  const desc = (speaker.description || '').trim();
  const canExpand = desc.length > 480;

  return (
    <article className="sparc-spk-card">
      <div className="sparc-spk-media">
        {speaker.image && (
          <img src={speaker.image} alt={name} loading="lazy" decoding="async" />
        )}
      </div>

      <div className="sparc-spk-body">
        <div className="sparc-spk-head">
          <div>
            <h3 className="sparc-spk-name">{name}</h3>
            {(role || org) && (
              <p className="sparc-spk-role">
                {role}
                {org && <span className="sparc-spk-org">{role ? ` · ${org}` : org}</span>}
              </p>
            )}
          </div>
          {speaker.time && <span className="sparc-spk-time">{speaker.time}</span>}
        </div>

        {speaker.topic && <p className="sparc-spk-topic">{speaker.topic}</p>}

        {desc && (
          <p className={`sparc-spk-desc${canExpand && !open ? ' sparc-spk-desc--clamped' : ''}`}>
            {desc}
          </p>
        )}

        {canExpand && (
          <button
            type="button"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="sparc-spk-toggle"
          >
            {open ? 'Show less' : 'Read more'}
          </button>
        )}
      </div>
    </article>
  );
}

export default function SpeakersObj({ speakers = [], className = '', style = {} }) {
  const listRef = useRef(null);
  const items = Array.isArray(speakers) ? speakers : speakers?.speakers || [];

  useEffect(() => {
    if (typeof document === 'undefined') return;
    let tag = document.getElementById(STYLE_ID);
    if (!tag) {
      tag = document.createElement('style');
      tag.id = STYLE_ID;
      document.head.appendChild(tag);
    }
    tag.textContent = SPEAKERS_CSS;
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return undefined;

    const cards = Array.from(list.querySelectorAll('.sparc-spk-card'));

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-visible'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.14,
        rootMargin: '0px 0px -36px 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [items]);

  return (
    <div className="RyIN">
      <div ref={listRef} className={`sparc-spk-list ${className}`.trim()} style={style}>
        {items.map((speaker, i) => (
          <SpeakerCard key={`${speaker.name || speaker.Name || 'spk'}-${i}`} speaker={speaker} />
        ))}
      </div>
    </div>
  );
}