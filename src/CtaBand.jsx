import { CtaGroup } from './CtaLink';

export default function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="band-title">
      <div className="in">
        <div data-reveal>
          <h2 id="band-title">Take your seat at SPARC.</h2>
          <p>December 30, 2026 at North South University. Applications are open now.</p>
        </div>
        <CtaGroup data-reveal="" style={{ '--d': '.1s' }} />
      </div>
    </section>
  );
}
