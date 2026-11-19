import { useEffect, useRef } from 'react';
import CONFIG from './config';
import StarSky from './StarSky';
import Countdown from './Countdown';
import SmartLink from './SmartLink';
import { CtaGroup } from './CtaLink';
import { initHeroCover } from './lib/effects';

export default function Hero() {
  const ref = useRef(null);
  // the hero stays put while "What is SPARC" (#about) slides over it
  useEffect(() => {
    const next = document.getElementById('about');
    return next ? initHeroCover(ref.current, next) : undefined;
  }, []);

  const ev = CONFIG.event;
  return (
    <section className="hero" id="hero" aria-label="SPARC 2026" ref={ref}>
      <StarSky />
      <div className="hero-shade" aria-hidden="true" />
      <div className="in hero-in">
        <h1>
          <img className="hero-logo" data-star-avoid src="/assets/sparc-logo-2026.png" width="1400" height="448"
            alt="SPARC: Student Professional Awareness Regional Conclave" />
        </h1>
        <div className="hero-meta" data-star-avoid>
          <div className="date">{ev.dateLabel}</div>
          <div className="venue">{ev.venue}</div>
          <div className="city">{ev.city}</div>
        </div>
        <Countdown />
        <CtaGroup data-star-avoid="" />
        <div className="event-links">
          <SmartLink k="facebookEvent">Facebook event</SmartLink>
          <SmartLink k="eventWebsite">Event page on ieeensusb.org</SmartLink>
        </div>
      </div>
    </section>
  );
}
