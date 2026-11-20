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
    rgba(8, 2, 4, 0.9) 100%
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
  flex-direction: column;
  justify-content: flex-end;
  padding: clamp(16px, 2.2vw, 22px);
  pointer-events: none;
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
    0 2px 12px rgba(48, 48, 48, 0.95),
    0 0 24px rgba(36, 36, 36, 0.7);
  transition: text-shadow 0.35s ease;
}

.sparc-amb-card:hover .sparc-amb-card__name {
  text-shadow:
    0 2px 12px rgba(48, 48, 48, 0.95),
    0 0 24px rgba(36, 36, 36, 0.7);
}

.sparc-amb-card__uni-row {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  margin-top: 7px;
  color: rgba(255, 255, 255, 0.78);
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
  .sparc-amb-card {
    opacity: 1;
    transform: none;
    transition: box-shadow 0.3s ease;
  }
  .sparc-amb-card.is-visible:hover {
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
          </article>
        );
      })}
    </div>
  );
}