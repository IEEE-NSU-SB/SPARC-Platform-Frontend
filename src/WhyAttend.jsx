import { CtaLink } from './CtaLink';

const CARDS = [
  { img: '/assets/why-25.jpg', alt: 'Professionals seated together at SPAC 2024', title: 'Industry Exposure', status: 'Beyond academia', text: 'Understand the professional world beyond academia.' },
  { img: '/assets/why-31.jpg', alt: 'A speaker presenting at SPAC 2024', title: 'Knowledge Exchange', status: 'Learning', text: 'Learn from experienced professionals.', tint: true },
  { img: '/assets/why-22.jpg', alt: 'Attendees mingling at SPAC 2024', title: 'Networking', status: 'Connecting', text: 'Connect with people from different institutions and industries.' },
  { img: '/assets/why-37.jpg', alt: 'A guest speaking with a microphone at SPAC 2024', title: 'Career Perspectives', status: 'Exploring', text: 'Discover emerging opportunities and career pathways.', tint: true },
  { img: '/assets/why-70.jpg', alt: 'Participants celebrating together at SPAC 2024', title: 'Regional Collaboration', status: 'Across the region', text: 'Meet ambitious students and professionals from across the region.' },
  { img: '/assets/why-28.jpg', alt: 'Smiling attendees at SPAC 2024', title: 'Inspiration', status: 'Growing', text: 'Gain perspectives that help shape your professional journey.', tint: true },
];

export default function WhyAttend() {
  return (
    <section className="why on-dark" id="why">
      <div className="in center">
        <h2 className="title" data-reveal>Why attend <span>SPARC?</span></h2>
        <p className="lead" data-reveal>What&apos;s in it for you.</p>
        <div className="pcards">
          {CARDS.map((c, i) => (
            <article key={c.title} className={`pc${c.tint ? ' tint' : ''}`} data-reveal style={{ '--d': `${0.08 * (i % 3)}s` }}>
              <img src={c.img} alt={c.alt} loading="lazy" />
              <div className="pc-top">
                <h3>{c.title}</h3>
                <span className="status"><svg aria-hidden="true"><use href="#spin" /></svg>{c.status}</span>
              </div>
              <div className="pc-bottom">
                <p>{c.text}</p>
                <div className="pc-row">
                  <span className="who"><b>SPAC 2024</b><small>North South University</small></span>
                  <CtaLink role="primary" variant="pill" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
