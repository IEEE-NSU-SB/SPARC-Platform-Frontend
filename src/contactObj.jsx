
import { useEffect, useState } from 'react';

const STYLE_ID = 'sparc-contact-styles';

const CSS = `
.contact-obj {
  --contact-bg: #fbf7f8;
  --contact-ink: #2a0a14;
  --contact-muted: #7a6068;
  --contact-dark: #1d0710;
  --contact-red: #e11d48;
  --contact-line: #ecd9de;
  font-family: Inter, system-ui, sans-serif;
  color: var(--contact-ink);
}

/* Hero description and countdown */

.contact-intro {
  text-align: center;
  padding: 10px 24px 30px;
  color: #f6e9ec;
}

.contact-intro h1 {
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(30px, 5vw, 46px);
  margin: 6px 0 10px;
  font-weight: 700;
}

.contact-intro .contact-lead {
  max-width: 560px;
  margin: 0 auto 26px;
  color: #d9bcc4;
  line-height: 1.7;
}

.contact-countdown {
  display: inline-flex;
  gap: 10px;
}

.contact-countdown > div {
  min-width: 78px;
  padding: 12px 8px;
  border: 1px solid #5a1a30;
  border-radius: 8px;
  background: rgba(255,255,255,.04);
}

.contact-countdown b {
  display: block;
  font: 700 28px "Space Grotesk", sans-serif;
  color: var(--contact-red);
  line-height: 1.1;
}

.contact-countdown span {
  font-size: 10.5px;
  letter-spacing: .14em;
  text-transform: uppercase;
  color: #d9bcc4;
}

.contact-countdown-label {
  margin-top: 14px;
  font-size: 12px;
  letter-spacing: .16em;
  text-transform: uppercase;
  color: #b88a97;
}

/* Main content */

.contact-content {
  padding: 64px 24px;
  background-color: var(--contact-bg);
  background-image:
    linear-gradient(var(--contact-line) 1px, transparent 1px),
    linear-gradient(90deg, var(--contact-line) 1px, transparent 1px);
  background-size: 44px 44px;
}

.contact-container {
  max-width: 1000px;
  margin: 0 auto;
}

.contact-heading {
  text-align: center;
  margin-bottom: 32px;
}

.contact-heading h2 {
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(28px, 4vw, 40px);
  margin: 0 0 8px;
}

.contact-heading p {
  color: var(--contact-muted);
  margin: 0;
}

/* Team leader cards */

.contact-team {
  display: grid;
  gap: 24px;
  margin-bottom: 24px;
}

.contact-card {
  position: relative;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  min-height: 340px;
  border-radius: 22px;
  overflow: hidden;
  isolation: isolate;
  background: #fff;
  border: 1px solid var(--contact-line);
  box-shadow: 0 12px 30px rgba(29,7,16,.1);
  transition: transform .45s ease, box-shadow .45s ease;
}

.contact-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 22px 44px rgba(225,29,72,.18);
}

.contact-card-info {
  position: relative;
  z-index: 2;
  padding: 38px 34px 34px 44px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 14px;
  min-width: 0;
}

.contact-badge {
  display: flex;
  align-items: center;
  gap: 12px;
  font: 600 12px Inter, sans-serif;
  letter-spacing: .14em;
  color: var(--contact-muted);
  text-transform: uppercase;
}

.contact-badge-icon {
  width: 36px;
  height: 36px;
  flex: none;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: rgba(225,29,72,.1);
  border: 1px solid rgba(225,29,72,.35);
  color: var(--contact-red);
}

.contact-badge-icon svg {
  width: 17px;
  height: 17px;
}

.contact-card-name {
  margin: 0;
  font: 800 clamp(30px, 5vw, 52px)/.98 Syne, "Space Grotesk", sans-serif;
  letter-spacing: -.01em;
  text-transform: uppercase;
  color: var(--contact-ink);
  overflow-wrap: anywhere;
}

.contact-card-name em {
  font: italic 400 1em/1 "Instrument Serif", Georgia, serif;
  text-transform: none;
  color: var(--contact-red);
  letter-spacing: 0;
  margin-left: .06em;
}

.contact-card-bio {
  margin: 0;
  max-width: 46ch;
  font-size: 15.5px;
  line-height: 1.6;
  color: var(--contact-muted);
}

.contact-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 4px;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 12px 18px;
  border-radius: 10px;
  font: 500 14px "Space Grotesk", Inter, sans-serif;
  color: var(--contact-ink);
  background: rgba(225,29,72,.05);
  border: 1px solid var(--contact-line);
  transition: all .3s ease;
  text-decoration : none;
}

.contact-btn svg {
  width: 18px;
  height: 18px;
}

.contact-btn:hover {
  color: #fff;
  background: var(--contact-red);
  border-color: var(--contact-red);
  transform: translateY(-3px);
  box-shadow: 0 12px 26px -10px rgba(225,29,72,.6);
}

.contact-card-meta {
  font-size: 12.5px;
  color: var(--contact-muted);
  word-break: break-word;
}

.contact-card-meta b {
  color: var(--contact-ink);
  font-weight: 600;
}

/* Card photo area */

.contact-card-photo {
  position: relative;
  min-height: 260px;
  overflow: hidden;
  background:
    radial-gradient(
      120% 90% at 70% 20%,
      #ffb3c4 0,
      #e11d48 48%,
      #4a0a1b 100%
    );
}

.contact-card-photo::before {
  content: "";
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    90deg,
    #fff 0,
    rgba(255,255,255,0) 42%
  );
}

.contact-card-photo img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: 50% 8%;
}

.contact-photo-placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
}

.contact-photo-placeholder svg {
  width: 70%;
  max-width: 260px;
  height: auto;
  opacity: .55;
}

/* Venue section */

.contact-venue {
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr auto auto;
  align-items: center;
  gap: 28px;
  padding: 32px 40px;
  border-radius: 22px;
  color: #f6e9ec;
  border: 1px solid #3a1220;
  background:
    radial-gradient(circle at 12% 0, rgba(225,29,72,.28), transparent 45%),
    radial-gradient(circle at 95% 100%, rgba(225,29,72,.2), transparent 40%),
    var(--contact-dark);
}

.contact-venue-pin {
  position: absolute;
  left: -18px;
  bottom: -30px;
  width: 170px;
  height: 170px;
  fill: var(--contact-red);
  opacity: .1;
  pointer-events: none;
}

.contact-venue > * {
  position: relative;
}

.contact-venue .contact-venue-pin {
  position: absolute;
}

.contact-venue-tag {
  display: inline-block;
  margin-bottom: 8px;
  font: 600 11px Inter, sans-serif;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #ff8fa9;
}

.contact-venue h3 {
  margin: 0 0 6px;
  font: 700 clamp(22px, 3vw, 30px) "Space Grotesk", sans-serif;
  color: #fff;
}

.contact-venue p {
  margin: 0;
  font-size: 14.5px;
  color: #d9bcc4;
}

.contact-venue-date {
  padding-left: 28px;
  border-left: 1px solid rgba(225,29,72,.4);
}

.contact-venue-date span {
  display: block;
  font: 600 11px Inter, sans-serif;
  letter-spacing: .18em;
  text-transform: uppercase;
  color: #ff8fa9;
  margin-bottom: 6px;
}

.contact-venue-date b {
  font: 700 20px "Space Grotesk", sans-serif;
  color: #fff;
  white-space: nowrap;
}

.contact-directions {
    display:inline-flex;
    gap:8px;
    padding:11px 22px;
    border:1px solid var(--red);
    background:rgb(161, 81, 81);
    color:#fff;
    font:600 12px Inter;
    letter-spacing:.08em;
    text-transform:uppercase;
    border-radius:10px;
    text-decoration: none;
}

.contact-directions:hover {
  color: #fff;
  background: var(--contact-red);
  border-color: var(--contact-red);
  transform: translateY(-3px);
  box-shadow: 0 12px 26px -10px rgba(225,29,72,.6);
}
.contact-directions.solid {
  background:var(--red);
  box-shadow:0 0 22px rgba(225,29,72,.45);
}
.contact-directions.solid:hover {
  background:var(--red2);
}

/* Responsive design */

@media (max-width: 860px) {
  .contact-venue {
    grid-template-columns: 1fr;
    gap: 18px;
    padding: 28px 24px;
  }

  .contact-venue-date {
    padding-left: 0;
    border-left: 0;
    border-top: 1px solid rgba(225,29,72,.4);
    padding-top: 16px;
  }

  .contact-directions {
    justify-self: start;
  }
}

@media (max-width: 720px) {
  .contact-card {
    grid-template-columns: 1fr;
  }

  .contact-card-photo {
    order: -1;
    min-height: 250px;
  }

  .contact-card-photo::before {
    background: linear-gradient(
      0deg,
      #fff 0,
      rgba(255,255,255,0) 45%
    );
  }

  .contact-card-info {
    padding: 24px 22px 28px;
  }
}

@media (max-width: 520px) {
  .contact-countdown {
    gap: 6px;
  }

  .contact-countdown > div {
    min-width: 62px;
  }

  .contact-countdown b {
    font-size: 22px;
  }

  .contact-actions {
    gap: 8px;
  }

  .contact-btn {
    padding: 10px 12px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .contact-card,
  .contact-btn,
  .contact-directions {
    transition: none;
  }
}
`;

const TEAM = [
  {
    role: "Lead Ambassador",
    first: "Ambassador",
    last: "Name",
    bio: "Your first point of contact for the campus ambassador program, university visits and SPARC 2026 updates.",
    email: "ambassador34@gmail.com",
    phone: "01756236486",
    photo: ""
  },
  {
    role: "Lead Ambassador",
    first: "Ambassador",
    last: "Name",
    bio: "Reach out for registration help, group participation and campus coordination ahead of the conclave.",
    email: "ambassador34@gmail.com",
    phone: "01756236486",
    photo: ""
  },
  {
    role: "IEEE Chair",
    first: "Chair",
    last: "Name",
    bio: "For official queries, partnerships and sponsorship discussions with IEEE NSU Student Branch.",
    email: "ambassador34@gmail.com",
    phone: "01756236486",
    photo: ""
  }
];

function getPhoneNumber(phone) {
  const number = phone.replace(/[^\d+]/g, '');

  return number.startsWith('0')
    ? `+88${number}`
    : number;
}

function getWhatsAppNumber(phone) {
  return getPhoneNumber(phone).replace(/\D/g, '');
}

function TeamCard({ person }) {
  const phone = getPhoneNumber(person.phone);
  const whatsapp = getWhatsAppNumber(person.phone);

  return (
    <article className="contact-card">
      <div className="contact-card-info">

        <div className="contact-badge">
          <span className="contact-badge-icon">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.3 6.8 19.1l1-5.8L3.5 9.2l5.9-.9z" />
            </svg>
          </span>

          {person.role}
        </div>

        <h3 className="contact-card-name">
          {person.first} <em>{person.last}</em>
        </h3>

        <p className="contact-card-bio">
          {person.bio}
        </p>

        <div className="contact-actions">
          <a className="contact-btn" href={`mailto:${person.email}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <path d="M3 7l9 6 9-6" />
            </svg>
            <span>Email</span>
          </a>

          <a className="contact-btn" href={`tel:${phone}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" />
            </svg>
            <span>Call</span>
          </a>

          <a
            className="contact-btn"
            href={`https://wa.me/${whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M21 12a9 9 0 01-13.4 7.8L3 21l1.3-4.4A9 9 0 1121 12z" />
            </svg>
            <span>Message</span>
          </a>
        </div>

        <div className="contact-card-meta">
          <b>{person.email}</b> · {person.phone}
        </div>
      </div>

      <div className="contact-card-photo">
        {person.photo ? (
          <img src={person.photo} alt="" loading="lazy" />
        ) : (
          <div className="contact-photo-placeholder" aria-hidden="true">
            <svg viewBox="0 0 400 440">
              <circle cx="270" cy="120" r="70" fill="none" stroke="#fff" strokeOpacity=".4" strokeWidth="2" />
              <circle cx="270" cy="120" r="52" fill="#fff" fillOpacity=".14" />
              <path d="M0 360L120 290 210 340 330 260 400 310V440H0Z" fill="#2a0612" fillOpacity=".4" />
              <circle cx="250" cy="215" r="48" fill="#fff" fillOpacity=".45" />
              <path d="M150 440C150 330 190 285 250 285 310 285 350 330 350 440Z" fill="#fff" fillOpacity=".4" />
            </svg>
          </div>
        )}
      </div>
    </article>
  );
}

export default function ContactObj() {
  const targetDate = new Date("2026-12-29T09:00:00+06:00").getTime();

  const [countdown, setCountdown] = useState({
    days: "--",
    hours: "--",
    minutes: "--",
    seconds: "--"
  });

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (!document.getElementById(STYLE_ID)) {
      const styleTag = document.createElement("style");
      styleTag.id = STYLE_ID;
      styleTag.textContent = CSS;
      document.head.appendChild(styleTag);
    }
  }, []);

  useEffect(() => {
    const updateCountdown = () => {
      const difference = targetDate - Date.now();

      if (difference <= 0) {
        setCountdown({
          days: "0",
          hours: "00",
          minutes: "00",
          seconds: "00"
        });
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);

      const pad = (number) =>
        number < 10 ? `0${number}` : `${number}`;

      setCountdown({
        days: Math.floor(totalSeconds / 86400),
        hours: pad(Math.floor((totalSeconds % 86400) / 3600)),
        minutes: pad(Math.floor((totalSeconds % 3600) / 60)),
        seconds: pad(totalSeconds % 60)
      });
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="contact-obj">

      {/* Hero description and countdown */}
{/* 
      <div className="contact-intro">
        <h1>Get in touch</h1>

        <p className="contact-lead">
          Questions about registration, sponsorship, speakers or the
          ambassador program? Reach our lead ambassadors and the IEEE
          chair directly.
        </p>

        <div className="contact-countdown">
          <div>
            <b>{countdown.days}</b>
            <span>Days</span>
          </div>

          <div>
            <b>{countdown.hours}</b>
            <span>Hours</span>
          </div>

          <div>
            <b>{countdown.minutes}</b>
            <span>Mins</span>
          </div>

          <div>
            <b>{countdown.seconds}</b>
            <span>Secs</span>
          </div>
        </div>

        <div className="contact-countdown-label">
          Until SPARC 2026 · December 29, 2026
        </div>
      </div> */}

      {/* Team section and venue */}

      <section className="contact-content">
        <div className="contact-container">

          <div className="contact-heading">
            <h2>Reach the team</h2>
            <p>
              Talk directly to our lead ambassadors and the IEEE chair.
            </p>
          </div>

          <div className="contact-team">
            {TEAM.map((person, index) => (
              <TeamCard
                key={`${person.role}-${index}`}
                person={person}
              />
            ))}
          </div>

          <section className="contact-venue">
            <svg
              className="contact-venue-pin"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 119.5 9 2.5 2.5 0 0112 11.5z" />
            </svg>

            <div>
              <span className="contact-venue-tag">Venue</span>

              <h3>North South University</h3>

              <p>
                Plot 15, Block B, Bashundhara R/A,
                Dhaka-1229, Bangladesh
              </p>
            </div>

            <div className="contact-venue-date">
              <span>Date</span>
              <b>December 29, 2026</b>
            </div>

            <a
              className="contact-directions solid"
              href="https://www.google.com/maps/search/?api=1&query=North+South+University+Dhaka"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions →
            </a>
          </section>

        </div>
      </section>
    </div>
  );
}
