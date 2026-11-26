import React, { useEffect, useRef } from 'react';

const STYLE_ID = 'sparc-ambassadors-styles';

const CSS = `
.sparc-amb-grid {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 38px 32px;
  font-family: var(--f-head, 'Instrument Sans', system-ui, -apple-system, sans-serif);
}

.sparc-amb-item {
  position: relative;
  padding: 10px 10px 0 0;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity .45s ease, transform .45s ease;
}

.sparc-amb-item.is-visible {
  opacity: 1;
  transform: none;
}

/* Offset Dark Maroon Back Card */
.sparc-amb-item::before {
  content: '';
  position: absolute;
  inset: 0 0 10px 10px;
  border-radius: 8px;
  background: #3d0312;
  transition: transform .25s ease, box-shadow .25s ease;
}

.sparc-amb-item:hover::before,
.sparc-amb-item:focus-within::before {
  transform: translate(2px, -2px);
  box-shadow: 0 8px 24px rgba(153, 1, 40, 0.28);
}

/* Foreground Card */
.sparc-amb-card {
  position: relative;
  aspect-ratio: 3 / 4;
  border-radius: 8px;
  clip-path: inset(0 round 8px);
  overflow: hidden;
  background: #14040a;
  box-shadow: 0 10px 26px rgba(15, 15, 20, 0.14);
  transition: box-shadow .25s ease;
}

.sparc-amb-item:hover .sparc-amb-card,
.sparc-amb-item:focus-within .sparc-amb-card {
  box-shadow:
    0 18px 38px rgba(153, 1, 40, 0.3),
    0 0 24px rgba(153, 1, 40, 0.24);
}

.sparc-amb-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  backface-visibility: hidden;
  transition: transform .45s ease;
}

.sparc-amb-item:hover .sparc-amb-card img {
  transform: scale(1.035);
}

.sparc-amb-card::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    transparent 48%,
    rgba(8, 3, 5, 0.76) 76%,
    rgba(8, 3, 5, 0.96) 100%
  );
}

.sparc-amb-body {
  position: absolute;
  inset: 0;
  z-index: 2;
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 12px;
  padding: 18px;
}

.sparc-amb-info {
  flex: 1;
  min-width: 0;
  text-align: left;
}

.sparc-amb-role {
  display: block;
  margin: 0 0 4px;
  font: 700 10.5px/1.2 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: .1em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.78);
}

.sparc-amb-name {
  margin: 0;
  font-size: clamp(1.02rem, 1.35vw, 1.16rem);
  font-weight: 700;
  line-height: 1.25;
  letter-spacing: -.01em;
  color: #ffffff;
}

.sparc-amb-uni-row {
  display: flex;
  align-items: flex-start;
  gap: 5px;
  margin-top: 6px;
}

.sparc-amb-pin {
  width: 13px;
  height: 13px;
  margin-top: 2px;
  flex-shrink: 0;
  color: #990128;
}

.sparc-amb-uni {
  margin: 0;
  font-size: .76rem;
  line-height: 1.38;
  color: rgba(255, 255, 255, 0.82);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.sparc-amb-short {
  color: rgba(255, 255, 255, 0.48);
  font-size: .72rem;
}

/* Bottom-to-top social stack */
.sparc-amb-socials {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.sparc-amb-socials a {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.28);
  color: #ffffff;
  text-decoration: none;
  transition: background-color .2s ease, border-color .2s ease, transform .2s ease;
}

.sparc-amb-socials a:hover,
.sparc-amb-socials a:focus-visible {
  background: #990128;
  border-color: #990128;
  transform: scale(1.06);
  outline: none;
}

.sparc-amb-socials svg {
  width: 14px;
  height: 14px;
  display: block;
}

@media (max-width: 900px) {
  .sparc-amb-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 32px 24px;
  }
}

@media (max-width: 560px) {
  .sparc-amb-grid {
    grid-template-columns: 1fr;
    gap: 28px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .sparc-amb-item,
  .sparc-amb-item::before,
  .sparc-amb-card,
  .sparc-amb-card img,
  .sparc-amb-socials a {
    opacity: 1;
    transform: none !important;
    transition: none;
  }
}
`;

const PLATFORMS = [
  ['facebook', ['facebook', 'fb'], 'Facebook', <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />],
  ['instagram', ['instagram', 'ig'], 'Instagram', <><rect x="2" y="2" width="20" height="20" rx="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>],
  ['linkedin', ['linkedin'], 'LinkedIn', <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>],
  ['whatsapp', ['whatsapp', 'wa'], 'WhatsApp', <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />],
  ['twitter', ['twitter', 'x'], 'X', <path d="M4 4l11.733 16h4.267l-11.733-16zM4 20l6.768-6.768m2.46-2.46l6.772-6.772" />],
  ['email', ['email', 'mail'], 'Email', <><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></>],
  ['website', ['website', 'portfolio', 'web'], 'Website', <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>],
];

function getHref(id, raw) {
  const val = raw.trim();
  if (id === 'whatsapp' && !/^https?:\/\//i.test(val)) return `https://wa.me/${val.replace(/\D/g, '')}`;
  if (id === 'email' && !/^mailto:/i.test(val)) return `mailto:${val}`;
  return /^(https?:\/\/|mailto:|tel:)/i.test(val) ? val : `https://${val}`;
}

export default function AmbassadorsObj({ ambassadors = [], className = '', style = {} }) {
  const gridRef = useRef(null);

  useEffect(() => {
    if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
    const tag = document.createElement('style');
    tag.id = STYLE_ID;
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll('.sparc-amb-item');
    if (!('IntersectionObserver' in window)) {
      items.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            observer.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' }
    );

    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ambassadors]);

  return (
    <div className="RyIN">
      <div ref={gridRef} className={`sparc-amb-grid ${className}`.trim()} style={style}>
        {ambassadors.map((person, index) => {
          const name = person.name || person.Name || '';
          const role = person.role || person.Role || '';
          const uniName = person.uniName || person.university || '';
          const uniShort = person.uniNameShrt || '';
          const photo = person.image || person.photo || '';
          const src = person.socials || person;

          const links = PLATFORMS.reduce((acc, [id, keys, label, icon]) => {
            const k = keys.find((key) => typeof src[key] === 'string' && src[key].trim());
            if (k) acc.push({ id, label, icon, href: getHref(id, src[k]) });
            return acc;
          }, []);

          return (
            <article key={`${name}-${index}`} className="sparc-amb-item">
              <div className="sparc-amb-card">
                {photo && <img src={photo} alt={name} loading="lazy" decoding="async" />}

                <div className="sparc-amb-body">
                  <div className="sparc-amb-info">
                    {role && <span className="sparc-amb-role">{role}</span>}
                    <h3 className="sparc-amb-name">{name}</h3>

                    {(uniName || uniShort) && (
                      <div className="sparc-amb-uni-row">
                        <svg aria-hidden="true" className="sparc-amb-pin" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z" />
                        </svg>
                        <p className="sparc-amb-uni">
                          {uniName}
                          {uniShort && (
                            <span className="sparc-amb-short">{uniName ? ` · ${uniShort}` : uniShort}</span>
                          )}
                        </p>
                      </div>
                    )}
                  </div>

                  {links.length > 0 && (
                    <div className="sparc-amb-socials">
                      {links.map((item) => (
                        <a
                          key={item.id}
                          href={item.href}
                          target={item.id === 'email' ? undefined : '_blank'}
                          rel={item.id === 'email' ? undefined : 'noopener noreferrer'}
                          aria-label={`${name} on ${item.label}`}
                          title={item.label}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            {item.icon}
                          </svg>
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}