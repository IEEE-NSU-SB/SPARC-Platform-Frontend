import React, { useEffect, useRef } from 'react';

const STYLE_ID = 'sparc-ambassadors-styles';

const AMBASSADORS_CSS = `
.sparc-amb-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(16px, 2.2vw, 26px);
  align-items: start;
  box-sizing: border-box;
}

.sparc-amb-card {
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  border-radius: 10px;
  overflow: hidden;
  isolation: isolate;
  background-color: #1a0a0f;
  color: #ffffff;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  opacity: 0;
  transform: translateY(28px) scale(0.98);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s cubic-bezier(0.22, 1, 0.36, 1);
}

.sparc-amb-card.is-visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

/* Column offset stagger while keeping all cards identical in size */
@media (min-width: 901px) {
  .sparc-amb-card:nth-child(3n + 2) {
    margin-top: 44px;
  }
  .sparc-amb-card:nth-child(3n + 3) {
    margin-top: 18px;
  }
}

.sparc-amb-card.is-visible:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 62px rgba(0, 0, 0, 0.52);
}

.sparc-amb-card__img {
  position: absolute;
  inset: 0;
  z-index: -2;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  filter: saturate(0.76) brightness(0.84);
  transition:
    transform 0.75s cubic-bezier(0.22, 1, 0.36, 1),
    filter 0.45s ease;
}

.sparc-amb-card:hover .sparc-amb-card__img {
  transform: scale(1.04);
  filter: saturate(0.95) brightness(0.94);
}

.sparc-amb-card::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.12) 0%,
    rgba(0, 0, 0, 0.06) 44%,
    rgba(8, 2, 4, 0.92) 100%
  );
  pointer-events: none;
}

.sparc-amb-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  opacity: 0;
  background: linear-gradient(
    180deg,
    transparent 45%,
    rgba(124, 0, 34, 0.38) 100%
  );
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.sparc-amb-card:hover::after {
  opacity: 1;
}

.sparc-amb-card__content {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  padding: clamp(16px, 2.2vw, 22px);
  pointer-events: none;
}

.sparc-amb-card__info {
  flex: 1;
  min-width: 0;
}

.sparc-amb-card__name {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: clamp(1.04rem, 1.5vw, 1.2rem);
  font-weight: 700;
  line-height: 1.25;
  color: #ffffff;
  letter-spacing: -0.01em;
  text-shadow:
    0 2px 10px rgba(0, 0, 0, 0.85),
    0 1px 2px rgba(0, 0, 0, 0.95);
}

.sparc-amb-card__uni-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 7px;
  color: rgba(255, 255, 255, 0.82);
  text-shadow: 0 1px 6px rgba(0, 0, 0, 0.85);
}

.sparc-amb-card__pin {
  width: 13px;
  height: 13px;
  margin-top: 2px;
  flex-shrink: 0;
  color: #c8102e;
}

.sparc-amb-card__university {
  margin: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  line-height: 1.4;
}

/* Vertically Stacked Circular Frosted-Glass Social Buttons (Right-Aligned) */
.sparc-amb-card__socials {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 8px;
  flex-shrink: 0;
  pointer-events: auto;
}

.sparc-amb-card__social-btn {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.92);
  background-color: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.35);
  text-decoration: none;
  transition:
    background-color 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1);
}

.sparc-amb-card__social-btn:hover,
.sparc-amb-card__social-btn:focus-visible {
  color: #ffffff;
  background-color: rgba(124, 0, 34, 0.82);
  border-color: rgba(255, 255, 255, 0.65);
  transform: translateY(-2px) scale(1.06);
  outline: none;
}

.sparc-amb-card__social-btn svg {
  width: 16px;
  height: 16px;
  display: block;
}

@media (max-width: 900px) {
  .sparc-amb-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 540px) {
  .sparc-amb-grid {
    grid-template-columns: 1fr;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sparc-amb-card,
  .sparc-amb-card__social-btn {
    opacity: 1;
    transform: none;
    transition: box-shadow 0.3s ease, background-color 0.2s ease;
  }
  .sparc-amb-card.is-visible:hover,
  .sparc-amb-card__social-btn:hover {
    transform: none;
  }
}
`;

function LocationPinIcon() {
  return (
    <svg
      aria-hidden="true"
      className="sparc-amb-card__pin"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

const SOCIAL_PLATFORMS = [
  {
    key: 'instagram',
    aliases: ['instagram', 'ig'],
    label: 'Instagram',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    key: 'facebook',
    aliases: ['facebook', 'fb'],
    label: 'Facebook',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    key: 'linkedin',
    aliases: ['linkedin', 'linkedIn'],
    label: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    key: 'whatsapp',
    aliases: ['whatsapp', 'whatsApp', 'wa'],
    label: 'WhatsApp',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
      </svg>
    ),
  },
  {
    key: 'twitter',
    aliases: ['twitter', 'x'],
    label: 'X (Twitter)',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  {
    key: 'email',
    aliases: ['email', 'mail'],
    label: 'Email',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    ),
  },
  {
    key: 'website',
    aliases: ['website', 'portfolio', 'web', 'url'],
    label: 'Website',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
  },
];

function normalizeSocialHref(key, rawValue) {
  const val = String(rawValue).trim();
  if (!val) return '';

  if (key === 'whatsapp' && !/^https?:\/\//i.test(val)) {
    const digits = val.replace(/\D/g, '');
    return digits ? `https://wa.me/${digits}` : '';
  }

  if (key === 'email' && !/^mailto:/i.test(val)) {
    return `mailto:${val}`;
  }

  if (!/^(https?:\/\/|mailto:|tel:)/i.test(val)) {
    return `https://${val}`;
  }

  return val;
}

function getAmbassadorSocials(person) {
  const merged = { ...(person.socials || {}), ...person };
  const links = [];

  for (const platform of SOCIAL_PLATFORMS) {
    const matchedAlias = platform.aliases.find(
      (alias) => typeof merged[alias] === 'string' && merged[alias].trim() !== ''
    );

    if (matchedAlias) {
      const href = normalizeSocialHref(platform.key, merged[matchedAlias]);
      if (href) {
        links.push({
          key: platform.key,
          label: platform.label,
          href,
          icon: platform.icon,
        });
      }
    }
  }

  return links;
}

export default function AmbassadorsObj({
  ambassadors = [],
  className = '',
  style = {},
}) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    let styleTag = document.getElementById(STYLE_ID);
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = STYLE_ID;
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = AMBASSADORS_CSS;
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
        rootMargin: '0px 0px -40px 0px',
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, [ambassadors]);

  return (
    <div
      ref={gridRef}
      className={`sparc-amb-grid ${className}`.trim()}
      style={style}
    >
      {ambassadors.map((person, index) => {
        const photoSrc = person.image || person.photo || person.photoUrl || '';
        const socials = getAmbassadorSocials(person);

        return (
          <article key={`${person.name}-${index}`} className="sparc-amb-card">
            {photoSrc && (
              <img
                src={photoSrc}
                alt={person.name}
                loading="lazy"
                className="sparc-amb-card__img"
              />
            )}

            <div className="sparc-amb-card__content">
              <div className="sparc-amb-card__info">
                <h3 className="sparc-amb-card__name">{person.name}</h3>

                {person.university && (
                  <div className="sparc-amb-card__uni-row">
                    <LocationPinIcon />
                    <p className="sparc-amb-card__university">
                      {person.university}
                    </p>
                  </div>
                )}
              </div>

              {socials.length > 0 && (
                <div className="sparc-amb-card__socials">
                  {socials.map((item) => (
                    <a
                      key={item.key}
                      href={item.href}
                      target={item.key === 'email' ? undefined : '_blank'}
                      rel={item.key === 'email' ? undefined : 'noopener noreferrer'}
                      aria-label={`${person.name} on ${item.label}`}
                      title={item.label}
                      className="sparc-amb-card__social-btn"
                    >
                      {item.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </article>
        );
      })}
    </div>
  );
}