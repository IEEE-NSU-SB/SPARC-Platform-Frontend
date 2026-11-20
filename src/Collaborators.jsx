import { useEffect, useRef } from 'react';
import { initSpotlight } from './lib/effects';

const LOGOS = [
  { src: '/assets/collab2.png', w: 887, h: 361, alt: 'IEEE NSU Student Branch' },
  { src: '/assets/ieee-bd-logo.png', w: 242, h: 113, alt: 'IEEE Bangladesh Section' },
  { src: '/assets/ieee-yf.png', w: 418, h: 104, alt: 'IEEE Foundation' },
  { src: '/assets/collab1.png', w: 1144, h: 341, alt: 'Collaborator' },
  { src: '/assets/collab4.png', w: 1470, h: 371, alt: 'Collaborator' },
  { src: '/assets/collab6.png', w: 962, h: 401, alt: 'Collaborator' },
];

/* Credits wall: logos rise in on scroll, then a spotlight moves between cells. */
export default function Collaborators() {
  const wall = useRef(null);
  useEffect(() => initSpotlight(wall.current), []);

  return (
    <section className="collab" id="collaborators" aria-labelledby="collab-title">
      <div className="in">
        <div className="collab-head" data-reveal>
          <h2 className="title" id="collab-title">Our <span>Collaborators</span></h2>
          <p>The institutions and IEEE bodies working alongside the IEEE NSU Student Branch.</p>
        </div>
        <ul className="cwall" data-stagger aria-label="Collaborators" ref={wall}>
          <li className="cw host">
            <img src="/assets/nsu-logo.png" width="105" height="126" alt="North South University" loading="lazy" />
            <span>Host university</span>
          </li>
          {LOGOS.map((l) => (
            <li className="cw" key={l.src}>
              <img src={l.src} width={l.w} height={l.h} alt={l.alt} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
