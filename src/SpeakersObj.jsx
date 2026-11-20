import React, { useEffect, useMemo, useRef, useState } from 'react';

const STYLE_ID = 'sparc-speakers-styles';

const SPEAKERS_CSS = `
/* 1. Single-Column Vertical Stack */
.sparc-spk-list {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: clamp(18px, 2.4vw, 26px);
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  box-sizing: border-box;
}

/* 2. Speaker Card (Snug Framing + Perimeter Hover Stroke) */
.sparc-spk-card {
  position: relative;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: clamp(16px, 2.4vw, 26px);
  align-items: start;
  padding: 10px;
  border-radius: 18px;
  overflow: hidden;
  isolation: isolate;
  background-color: #f2f0f1;
  border: 1.5px solid rgba(20, 20, 23, 0.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.045);
  box-sizing: border-box;

  opacity: 0;
  transform: translateY(26px);
  transition:
    opacity 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.3s ease,
    box-shadow 0.3s ease,
    background-color 0.3s ease;
}

.sparc-spk-card.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.sparc-spk-card:hover {
  background-color: #f8f6f7;
  border-color: #b90e2c;
  box-shadow:
    0 0 0 1px rgba(185, 14, 44, 0.32),
    0 14px 32px rgba(185, 14, 44, 0.13);
}

/* 3. Diagonal Moving Hollow Polka-Dot Card Background (Top-Left to Bottom-Right) */
.sparc-spk-card__dots-viewport {
  position: absolute;
  inset: 0;
  z-index: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
}

.sparc-spk-card__drift-base {
  position: absolute;
  top: -48px;
  left: -56px;
  right: 0;
  bottom: 0;
  will-change: transform;
  animation: spkPolkaDiagonal 4.2s linear infinite;
}

.sparc-spk-card__drift-boost {
  position: absolute;
  inset: 0;
  will-change: transform;
  animation: spkPolkaDiagonal 1.7s linear infinite;
  animation-play-state: paused;
}

.sparc-spk-card:hover .sparc-spk-card__drift-boost {
  animation-play-state: running;
}

.sparc-spk-card__dots {
  position: absolute;
  inset: 0;
  background-repeat: repeat;
  background-size: 28px 24px;
  transition: opacity 0.28s ease;
}

.sparc-spk-card__dots--rest {
  opacity: 1;
}

.sparc-spk-card__dots--hover {
  opacity: 0;
}

.sparc-spk-card:hover .sparc-spk-card__dots--rest {
  opacity: 0;
}

.sparc-spk-card:hover .sparc-spk-card__dots--hover {
  opacity: 1;
}

/* 4. Fixed 400:560 Portrait Frame with 1px Dark Outer Stroke */
.sparc-spk-card__media {
  position: relative;
  z-index: 1;
  width: 300px;
  height: 420px;
  border-radius: 11px;
  overflow: hidden;
  background-color: #d4d4d8;
  border: 1px solid rgba(20, 20, 23, 0.35);
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.14);
  box-sizing: border-box;
  flex-shrink: 0;
}

.sparc-spk-card__img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.sparc-spk-card:hover .sparc-spk-card__img {
  transform: scale(1.035);
}

/* 5. Right Content Column */
.sparc-spk-card__body {
  position: relative;
  z-index: 1;
  padding: 14px 16px;
  text-align: left;
}

.sparc-spk-card__name {
  position: relative;
  display: inline-block;
  margin: 0;
  font-size: clamp(1.48rem, 2.5vw, 1.98rem);
  font-weight: 800;
  line-height: 1.2;
  letter-spacing: -0.015em;
  color: #b90e2c;
  transition: text-shadow 0.28s ease;
}

/* Animated Underline Sweeping Across Name on Hover */
.sparc-spk-card__name::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -4px;
  width: 100%;
  height: 3px;
  border-radius: 2px;
  background-color: #b90e2c;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.38s cubic-bezier(0.22, 1, 0.36, 1);
}

.sparc-spk-card:hover .sparc-spk-card__name::after {
  transform: scaleX(1);
}

.sparc-spk-card__role {
  margin: 8px 0 0;
  font-size: clamp(0.95rem, 1.35vw, 1.08rem);
  font-weight: 600;
  line-height: 1.35;
  color: #7c5c64;
  transition: text-shadow 0.28s ease;
}

.sparc-spk-card__desc {
  margin: 14px 0 0;
  font-size: clamp(0.94rem, 1.35vw, 1.02rem);
  font-weight: 400;
  line-height: 1.65;
  color: #18181b;
  transition: text-shadow 0.28s ease;
}

.sparc-spk-card__desc--clamped {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 10;
  overflow: hidden;
}

/* 1px White Spread + Strong Multi-Layered White Glow on Hover */
.sparc-spk-card:hover .sparc-spk-card__name,
.sparc-spk-card:hover .sparc-spk-card__role,
.sparc-spk-card:hover .sparc-spk-card__desc {
  text-shadow:
    1px 0 0 #ffffff,
    -1px 0 0 #ffffff,
    0 1px 0 #ffffff,
    0 -1px 0 #ffffff,
    1px 1px 0 #ffffff,
    -1px -1px 0 #ffffff,
    1px -1px 0 #ffffff,
    -1px 1px 0 #ffffff,
    0 0 8px #ffffff,
    0 0 16px #ffffff,
    0 0 28px #ffffff,
    0 0 42px rgba(255, 255, 255, 0.96);
}

/* 6. Read More Toggle Button */
.sparc-spk-card__toggle {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 12px;
  padding: 5px 12px;
  border-radius: 9999px;
  border: 1px solid rgba(185, 14, 44, 0.28);
  background-color: rgba(255, 255, 255, 0.9);
  color: #b90e2c;
  font-family: inherit;
  font-size: 0.82rem;
  font-weight: 700;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease;
}

.sparc-spk-card__toggle:hover {
  background-color: #b90e2c;
  border-color: #b90e2c;
  color: #ffffff;
}

/* 7. Keyframes, Mobile Breakpoint & Reduced Motion */
@keyframes spkPolkaDiagonal {
  0% {
    transform: translate3d(0px, 0px, 0);
  }
  100% {
    transform: translate3d(28px, 24px, 0);
  }
}

@media (max-width: 720px) {
  .sparc-spk-card {
    grid-template-columns: 1fr;
    justify-items: center;
  }

  .sparc-spk-card__media {
    width: min(100%, 300px);
    height: 420px;
  }

  .sparc-spk-card__body {
    width: 100%;
    padding: 8px 10px 10px;
    box-sizing: border-box;
  }

  .sparc-spk-card__desc--clamped {
    -webkit-line-clamp: 6;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sparc-spk-card,
  .sparc-spk-card__img,
  .sparc-spk-card__name::after {
    opacity: 1;
    transform: none;
    transition: border-color 0.25s ease, box-shadow 0.25s ease;
  }

  .sparc-spk-card__drift-base,
  .sparc-spk-card__drift-boost {
    animation: none;
  }
}
`;

function buildHollowDotsSvg({ strokeColor, radius, strokeWidth }) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 24">
      <circle cx="7" cy="6" r="${radius}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
      <circle cx="21" cy="18" r="${radius}" fill="none" stroke="${strokeColor}" stroke-width="${strokeWidth}" />
    </svg>
  `.trim();

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

function resolveSpeakersList(input) {
  if (Array.isArray(input)) return input;
  if (input && typeof input === 'object') {
    if (Array.isArray(input.speakers)) return input.speakers;
    const firstArray = Object.values(input).find(Array.isArray);
    if (firstArray) return firstArray;
  }
  return [];
}

function SpeakerCard({ speaker, dotsRest, dotsHover }) {
  const descRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canExpand, setCanExpand] = useState(false);

  const roleText = speaker.role || speaker.title;

  useEffect(() => {
    const checkOverflow = () => {
      const el = descRef.current;
      if (!el || isExpanded) return;
      setCanExpand(el.scrollHeight > el.clientHeight + 2);
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow, { passive: true });
    return () => window.removeEventListener('resize', checkOverflow);
  }, [speaker.description, isExpanded]);

  return (
    <article className="sparc-spk-card">
      {/* Diagonal Moving Hollow Polka-Dot Background */}
      <span aria-hidden="true" className="sparc-spk-card__dots-viewport">
        <span className="sparc-spk-card__drift-base">
          <span className="sparc-spk-card__drift-boost">
            <span
              className="sparc-spk-card__dots sparc-spk-card__dots--rest"
              style={{ backgroundImage: dotsRest }}
            />
            <span
              className="sparc-spk-card__dots sparc-spk-card__dots--hover"
              style={{ backgroundImage: dotsHover }}
            />
          </span>
        </span>
      </span>

      {/* Fixed 400:560 Portrait Image with 1px Dark Stroke */}
      <div className="sparc-spk-card__media">
        {speaker.image && (
          <img
            src={speaker.image}
            alt={speaker.name}
            loading="lazy"
            className="sparc-spk-card__img"
          />
        )}
      </div>

      {/* Right Speaker Info */}
      <div className="sparc-spk-card__body">
        <h3 className="sparc-spk-card__name">{speaker.name}</h3>

        {roleText && <p className="sparc-spk-card__role">{roleText}</p>}

        {speaker.description && (
          <>
            <p
              ref={descRef}
              className={`sparc-spk-card__desc ${
                !isExpanded ? 'sparc-spk-card__desc--clamped' : ''
              }`.trim()}
            >
              {speaker.description}
            </p>

            {(canExpand || isExpanded) && (
              <button
                type="button"
                aria-expanded={isExpanded}
                onClick={() => setIsExpanded((prev) => !prev)}
                className="sparc-spk-card__toggle"
              >
                {isExpanded ? 'Show less' : 'Read more'}
              </button>
            )}
          </>
        )}
      </div>
    </article>
  );
}

export default function SpeakersSection({
  speakers = {},
  className = '',
  style = {},
}) {
  const listRef = useRef(null);
  const items = resolveSpeakersList(speakers);

  const { dotsRest, dotsHover } = useMemo(
    () => ({
      dotsRest: buildHollowDotsSvg({
        strokeColor: 'rgba(185, 14, 44, 0.1)',
        radius: 3.1,
        strokeWidth: 1.6,
      }),
      dotsHover: buildHollowDotsSvg({
        strokeColor: 'rgba(185, 14, 44, 0.24)',
        radius: 4.6,
        strokeWidth: 2.0,
      }),
    }),
    []
  );

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
    const container = listRef.current;
    if (!container) return undefined;

    const cards = Array.from(container.querySelectorAll('.sparc-spk-card'));

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
    <div
      ref={listRef}
      className={`sparc-spk-list ${className}`.trim()}
      style={style}
    >
      {items.map((speaker, index) => (
        <SpeakerCard
          key={`${speaker.name}-${index}`}
          speaker={speaker}
          dotsRest={dotsRest}
          dotsHover={dotsHover}
        />
      ))}
    </div>
  );
}