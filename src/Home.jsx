import { useEffect } from 'react';
import Hero from './Hero';
import WhatIs from './WhatIs';
import Metrics from './Metrics';
import Goal from './Goal';
import WhatAwaits from './WhatAwaits';
import WhyAttend from './WhyAttend';
import Collaborators from './Collaborators';
import Sponsors from './Sponsors';
import Legacy from './Legacy';
import Moments from './Moments';
import Faq from './Faq';
import CtaBand from './CtaBand';
import { initReveal } from './lib/effects';

/* Home page: all sections in order. */
export default function Home() {
  useEffect(() => {
    document.title = 'SPARC · IEEE NSU SB';
    return initReveal(document); // scroll reveal for [data-reveal] / [data-stagger]
  }, []);

  return (
    <main id="home">
      <Hero />
      <WhatIs />
      <Metrics />
      <Collaborators />
      <WhatAwaits />
      <Goal />
      <WhyAttend />
      <Sponsors />
      <CtaBand />
      <Legacy />
      <Moments />
      <Faq />
    </main>
  );
}
