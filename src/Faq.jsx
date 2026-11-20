import { useEffect, useRef } from 'react';
import SmartLink from './SmartLink';
import { initFaq } from './lib/effects';

const Tba = () => <span className="tba-chip">To be announced</span>;

const ITEMS = [
  {
    q: 'What is SPARC?', open: true,
    a: <>SPARC, the Student Professional Awareness Regional Conclave, is a formal networking event and dinner organized by the IEEE NSU Student Branch. It brings engineering and computer science students together with professionals from their fields, and builds on the branch&apos;s SPAC conferences.</>,
  },
  { q: 'Who can participate?', a: <>SPARC is designed for engineering and computer science students and graduates. <Tba />Full eligibility details will be published with registration.</> },
  { q: 'Is registration free or paid?', a: <><Tba />Registration details will be shared when registration opens.</> },
  { q: 'Will participants receive certificates?', a: <><Tba />Certificate details will be shared with registration.</> },
  { q: 'Where will the event take place?', a: <>At North South University, Bashundhara, Dhaka, Bangladesh, on December 30, 2026.</> },
  { q: 'What is included in registration?', a: <><Tba />What registration covers will be listed when registration opens.</> },
  {
    q: 'How can I contact the organizing team?',
    a: <>Email <SmartLink k="email" /> or use the <SmartLink k="contactPage">IEEE NSU SB contact page</SmartLink>.</>,
  },
];

/* Native <details> with a smooth open/close animation (src/lib/effects.js). */
export default function Faq() {
  const list = useRef(null);
  useEffect(() => initFaq(list.current), []);

  return (
    <section className="faq paper" id="faq">
      <div className="in center">
        <h2 className="title" data-reveal>Frequently asked <span>questions</span></h2>
        <div className="faq-list" data-reveal ref={list}>
          {ITEMS.map((it) => (
            <details key={it.q} open={it.open}>
              <summary><span className="fq-q">{it.q}</span><span className="fq-ic" aria-hidden="true" /></summary>
              <div className="ans">{it.a}</div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
