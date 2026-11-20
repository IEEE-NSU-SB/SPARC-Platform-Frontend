import React, { useEffect, useRef } from 'react';

const STYLE_ID = 'sparc-ambassadors-styles';

const AMBASSADORS_CSS = `
.sparc-amb-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  font-family: var(--f-head, 'Instrument Sans', system-ui, -apple-system, sans-serif);
}

.sparc-amb-card {
  position: relative;
  aspect-ratio: 4 / 5;
  border-radius: 20px;
  overflow: hidden;
  isolation: isolate;
  background-color: #f3f3f5;
  background-clip: padding-box;
  border: 1.5px solid #d6d6dc;
  box-shadow: 0 8px 24px rgba(15, 15, 20, 0.07);
  opacity: 0;
  transform: translateY(22px);
  transition:
    opacity 0.52s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.52s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s var(--ease, ease),
    box-shadow 0.25s var(--ease, ease);
}

.sparc-amb-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.sparc-amb-card:hover,
.sparc-amb-card:focus-within {
  border-color: var(--crimson, #d0002f);
  box-shadow:
    0 0 0 1px rgba(208, 0, 47, 0.25),
    0 14px 30px rgba(20, 4, 10, 0.15);
}

.sparc-amb-card__img {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.5s var(--ease, ease);
}

.sparc-amb-card:hover .sparc-amb-card__img {
  transform: scale(1.035);
}

.sparc-amb-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    rgba(20, 4, 10, 0) 46%,
    rgba(20, 4, 10, 0.72) 76%,
    rgba(20, 4, 10, 0.92) 100%
  );
}

.sparc-amb-card__body {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  padding: 20px;
}

.sparc-amb-card__info {
  flex: 1;
  min-width: 0;
  text-align: left;
}

.sparc-amb-card__role {
  display: block;
  margin: 0 0 5px;
  font: 700 11px/1.25 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--crimson-hi, #ff3358);
  text-shadow: 0 1px 6px rgba(20, 4, 10, 0.75);
}

.sparc-amb-card__name {
  margin: 0;
  font-size: clamp(1.02rem, 1.35vw, 1.18rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -0.01em;
  color: var(--on-dark, #f3e3e7);
}

.sparc-amb-card__uni {
  margin: 5px 0 0;
  font-size: 0.78rem;
  line-height: 1.38;
  color: var(--on-dark-muted, #c7aab2);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.sparc-amb-card__short {
  color: rgba(243, 227, 231, 0.5);
  font-size: 0.73rem;
}

/* Bottom-to-top social stack: 1st item visible at bottom, rest reveal upward on hover */
.sparc-amb-socials {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 7px;
  flex-shrink: 0;
}

.sparc-amb-socials a {
  width: 34px;
  height: 34px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(42, 8, 18, 0.86);
  border: 1px solid rgba(243, 227, 231, 0.22);
  color: var(--on-dark, #f3e3e7);
  text-decoration: none;
  transition:
    opacity 0.2s ease,
    transform 0.2s var(--ease, ease),
    background-color 0.2s ease,
    border-color 0.2s ease;
}

.sparc-amb-socials a:nth-child(n+2) {
  opacity: 0;
  transform: translateY(8px) scale(0.9);
  pointer-events: none;
}

.sparc-amb-card:hover .sparc-amb-socials a:nth-child(n+2),
.sparc-amb-card:focus-within .sparc-amb-socials a:nth-child(n+2) {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

.sparc-amb-socials a:hover,
.sparc-amb-socials a:focus-visible {
  background: var(--crimson, #d0002f);
  border-color: var(--crimson-hi, #ff3358);
  color: #ffffff;
  outline: none;
}

.sparc-amb-socials svg {
  width: 15px;
  height: 15px;
  display: block;
}

@media (max-width: 900px) {
  .sparc-amb-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 560px) {
  .sparc-amb-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sparc-amb-card {
    opacity: 1;
    transform: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }
  .sparc-amb-card__img,
  .sparc-amb-socials a {
    transition: none;
  }
  .sparc-amb-card:hover .sparc-amb-card__img {
    transform: none;
  }
}
`;

const PLATFORMS = [
  {
    keys: ['facebook', 'fb'],
    label: 'Facebook',
    icon: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    keys: ['instagram', 'ig'],
    label: 'Instagram',
    icon: <><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
  },
  {
    keys: ['linkedin'],
    label: 'LinkedIn',
    icon: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
  },
  {
    keys: ['whatsapp', 'wa'],
    label: 'WhatsApp',
    icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />,
  },
  {
    keys: ['twitter', 'x'],
    label: 'X',
    icon: <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768m2.46-2.46l6.772-6.772" />,
  },
  {
    keys: ['email', 'mail'],
    label: 'Email',
    icon: <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>,
  },
  {
    keys: ['website', 'portfolio', 'web'],
    label: 'Website',
    icon: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  },
];

export default function AmbassadorsObj({
  ambassadors = [],
  className = '',
  style = {},
}) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    let tag = document.getElementById(STYLE_ID);
    if (!tag) {
      tag = document.createElement('style');
      tag.id = STYLE_ID;
      document.head.appendChild(tag);
    }
    tag.textContent = AMBASSADORS_CSS;
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return undefined;

    const cards = Array.from(grid.querySelectorAll('.sparc-amb-card'));

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
        threshold: 0.12,
        rootMargin: '0px 0px -36px 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [ambassadors]);

  return (
    <div className="RyIN">
      <div
        ref={gridRef}
        className={`sparc-amb-grid ${className}`.trim()}
        style={style}
      >
        {ambassadors.map((person, index) => {
          const name = person.name ?? person.Name ?? '';
          const role = person.role ?? person.Role ?? '';
          const uniName = person.uniName ?? person.university ?? '';
          const uniShort = person.uniNameShrt ?? '';
          const photo = person.image ?? person.photo ?? '';
          const socialSource = person.socials || person;

          const links = [];
          for (let i = 0; i < PLATFORMS.length; i++) {
            const p = PLATFORMS[i];
            const key = p.keys.find(
              (k) => typeof socialSource[k] === 'string' && socialSource[k].trim() !== ''
            );
            if (!key) continue;

            const raw = socialSource[key].trim();
            const isEmail = p.label === 'Email';
            const href =
              p.label === 'WhatsApp' && !/^https?:\/\//i.test(raw)
                ? `https://wa.me/${raw.replace(/\D/g, '')}`
                : isEmail && !/^mailto:/i.test(raw)
                ? `mailto:${raw}`
                : /^(https?:\/\/|mailto:|tel:)/i.test(raw)
                ? raw
                : `https://${raw}`;

            links.push({ label: p.label, icon: p.icon, href, isEmail });
          }

          return (
            <article key={`${name}-${index}`} className="sparc-amb-card">
              {photo && (
                <img
                  src={photo}
                  alt={name}
                  loading="lazy"
                  decoding="async"
                  className="sparc-amb-card__img"
                />
              )}

              <div className="sparc-amb-card__body">
                <div className="sparc-amb-card__info">
                  {role && <span className="sparc-amb-card__role">{role}</span>}
                  <h3 className="sparc-amb-card__name">{name}</h3>
                  {(uniName || uniShort) && (
                    <p className="sparc-amb-card__uni">
                      {uniName}
                      {uniShort && (
                        <span className="sparc-amb-card__short">
                          {uniName ? ` · ${uniShort}` : uniShort}
                        </span>
                      )}
                    </p>
                  )}
                </div>

                {links.length > 0 && (
                  <div className="sparc-amb-socials">
                    {links.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.isEmail ? undefined : '_blank'}
                        rel={item.isEmail ? undefined : 'noopener noreferrer'}
                        aria-label={`${name} on ${item.label}`}
                        title={item.label}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          {item.icon}
                        </svg>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}