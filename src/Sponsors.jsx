/* Sponsor wall in three tiers. `bg` is each logo's own background colour,
   so the tile extends the logo without a visible edge. */

const PLATINUM = [
  { n: 17, bg: '#000', alt: 'Eshaal Properties Ltd., Platinum sponsor' },
  { n: 18, bg: '#000', alt: 'Platinum sponsor' },
  { n: 19, bg: '#000', alt: 'Platinum sponsor' },
];
const GOLD = [
  { n: 20, bg: '#000', alt: 'Gold sponsor' },
  { n: 21, bg: '#000', alt: 'Gold sponsor' },
];
const PARTNERS = [
  { n: 22, bg: '#000', alt: 'Shawarma Damasco, Silver sponsor', label: 'Silver Sponsor', silver: true },
  { n: 23, bg: '#000', alt: 'SBAC Bank, T-shirt partner', label: 'T-shirt Partner' },
  { n: 24, bg: '#fff', alt: 'News24, Electronic partner', label: 'Electronic Partner' },
  { n: 25, bg: '#000', alt: 'Kaler Kantho, Media partner', label: 'Media Partner' },
  { n: 26, bg: '#000', alt: 'Glimpse, Photography and cinematography partner', label: 'Photography & Cinematography' },
  { n: 27, bg: '#fff', alt: 'Maroon, PR and promotion partner', label: 'PR & Promotion' },
  { n: 28, bg: '#fff', alt: 'Billboard partner', label: 'Billboard Partner' },
  { n: 29, bg: '#000', alt: 'Infogram, Digital media partner', label: 'Digital Media' },
  { n: 30, bg: '#ffda48', alt: 'Digital media partner', label: 'Digital Media' },
  { n: 31, bg: '#fff', alt: 'Think Bright, Digital media partner', label: 'Digital Media' },
  { n: 32, bg: '#f4740b', alt: 'Tezz Feed, Digital media partner', label: 'Digital Media' },
];

function Plate({ n, bg, alt }) {
  return (
    <div className="sp" style={{ '--bg': bg }}>
      <img src={`/assets/${n}.png`} width="320" height="320" alt={alt} loading="lazy" />
    </div>
  );
}

function TierLabel({ name, count }) {
  return (
    <div className="tier-label" data-reveal>
      <h3>{name}</h3><span className="tier-rule" /><span className="tier-n">{String(count).padStart(2, '0')}</span>
    </div>
  );
}

export default function Sponsors() {
  return (
    <section className="sponsors on-dark" id="sponsors" aria-labelledby="sp-title">
      <div className="in">
        <div className="sp-head" data-reveal>
          <h2 className="title" id="sp-title">Our <span>Sponsors</span></h2>
          <p>The organizations that make the conclave possible.</p>
        </div>

        <div className="tier">
          <TierLabel name="Platinum" count={PLATINUM.length} />
          <ul className="t-plat" data-stagger>
            {PLATINUM.map((s) => <li className="sp-cell" key={s.n}><Plate {...s} /></li>)}
          </ul>
        </div>

        <div className="tier">
          <TierLabel name="Gold" count={GOLD.length} />
          <ul className="t-gold" data-stagger>
            {GOLD.map((s) => <li className="sp-cell" key={s.n}><Plate {...s} /></li>)}
          </ul>
        </div>

        <div className="tier">
          <TierLabel name="Silver & Partners" count={PARTNERS.length} />
          <ul className="t-part" data-stagger>
            {PARTNERS.map((s) => (
              <li className={`sp-cell${s.silver ? ' silver' : ''}`} key={s.n}>
                <Plate {...s} /><span>{s.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
