import { Link } from 'react-router-dom';
import CONFIG from './config';
import SmartLink, { LinkItem } from './SmartLink';
import { CtaLink } from './CtaLink';
import { phaseHas } from './lib/phase';

const SOCIAL = [
  ['facebook', 'Facebook', 'M14 8h3V4h-3c-2.8 0-4 1.8-4 4.3V10H7v4h3v8h4v-8h3l1-4h-4V8.6c0-.4.3-.6.6-.6Z'],
  ['linkedin', 'LinkedIn', 'M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.5h4V21H3V9.5Zm6.5 0h3.8v1.6h.06c.53-1 1.83-2.06 3.77-2.06 4.03 0 4.77 2.65 4.77 6.1V21h-4v-5.1c0-1.22-.02-2.79-1.7-2.79-1.7 0-1.96 1.33-1.96 2.7V21h-4V9.5Z'],
  ['instagram', 'Instagram', 'M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4Zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6Zm6-7.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0ZM21 7.3c-.06-1.4-.37-2.6-1.4-3.6S17.4 2.4 16 2.3c-1.4-.08-5.6-.08-7.1 0-1.4.07-2.6.38-3.6 1.4S4 6 3.9 7.3c-.08 1.4-.08 5.6 0 7.1.07 1.4.38 2.6 1.4 3.6s2.2 1.3 3.6 1.4c1.4.08 5.6.08 7.1 0 1.4-.07 2.6-.38 3.6-1.4s1.3-2.2 1.4-3.6c.08-1.4.08-5.6 0-7.1Zm-2 8.6a2.9 2.9 0 0 1-1.6 1.6c-1.1.44-3.8.34-5 .34s-3.9.1-5-.34a2.9 2.9 0 0 1-1.6-1.6c-.44-1.1-.34-3.8-.34-5s-.1-3.9.34-5A2.9 2.9 0 0 1 7.1 4.3c1.1-.44 3.8-.34 5-.34s3.9-.1 5 .34a2.9 2.9 0 0 1 1.6 1.6c.44 1.1.34 3.8.34 5s.1 3.9-.34 5Z'],
  ['x', 'X (Twitter)', 'M17.8 3h3.1l-6.8 7.8L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.6l11.1 14.5Z'],
  ['youtube', 'YouTube', 'M23 7.2a3 3 0 0 0-2.1-2.1C19 4.6 12 4.6 12 4.6s-7 0-8.9.5A3 3 0 0 0 1 7.2 31 31 0 0 0 .5 12 31 31 0 0 0 1 16.8a3 3 0 0 0 2.1 2.1c1.9.5 8.9.5 8.9.5s7 0 8.9-.5a3 3 0 0 0 2.1-2.1c.4-1.6.5-3.2.5-4.8s-.1-3.2-.5-4.8ZM9.7 15.1V8.9l5.8 3.1-5.8 3.1Z'],
];

export default function Footer() {
  const register = CONFIG.ctas.register;
  return (
    <footer id="contact">
      <div className="in">
        <div className="foot">
          <div className="brandline">
            <img src="/assets/sparc-logo-2026.png" width="1400" height="448" alt="SPARC" loading="lazy" />
            <p>Student Professional Awareness Regional Conclave, hosted by the IEEE NSU Student Branch at North South University, Dhaka.</p>
            <div className="socials">
              {SOCIAL.filter(([k]) => CONFIG.links[k]).map(([k, label, d]) => (
                <a key={k} href={CONFIG.links[k]} target="_blank" rel="noopener" aria-label={`IEEE NSU SB on ${label}`}>
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d={d} /></svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Explore">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/#about">About SPARC</Link></li>
              <li><Link to="/#why">Why attend</Link></li>
              <li><Link to="/#legacy">Legacy</Link></li>
              <li><Link to="/#moments">Gallery</Link></li>
            </ul>
          </nav>

          {/* Apply: the two CTAs of the current phase; registration shows
              "opens soon" until the phase includes it. */}
          <nav aria-label="Apply">
            <h4>Apply</h4>
            <ul>
              <li><CtaLink role="primary" variant="text" /></li>
              <li><CtaLink role="secondary" variant="text" /></li>
              {!phaseHas('register') && register && (
                <li><span className="soon">{register.label} <em>opens soon</em></span></li>
              )}
            </ul>
          </nav>

          <nav aria-label="Links">
            <h4>Links</h4>
            <ul>
              <LinkItem k="eventWebsite">SPARC official website</LinkItem>
              <LinkItem k="facebookEvent">SPARC on Facebook</LinkItem>
              <LinkItem k="ieee">IEEE</LinkItem>
              <LinkItem k="branchWebsite">IEEE NSU Student Branch</LinkItem>
            </ul>
          </nav>

          <div>
            <h4>Contact</h4>
            <ul>
              <LinkItem k="email" />
              <LinkItem k="contactPage">Contact page</LinkItem>
              <li><address>North South University<br />Bashundhara, Dhaka, Bangladesh</address></li>
            </ul>
          </div>
        </div>
        <div className="copy">
          <p>
            © 2026 IEEE NSU SB – All rights reserved. Developed by{' '}
            <SmartLink k="webTeam">IEEE NSU SB Web Development Team</SmartLink>
          </p>
        </div>
      </div>
    </footer>
  );
}
