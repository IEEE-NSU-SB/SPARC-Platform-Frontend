import { useEffect, useRef } from 'react';
import { initStarSky } from './lib/starSky';

/* Canvas background with twinkling stars and logo-style gold sparkles.
   Put it inside a positioned section; sparkles avoid [data-star-avoid]. */
export default function StarSky() {
  const ref = useRef(null);
  useEffect(() => initStarSky(ref.current), []);
  return <canvas ref={ref} id="net" aria-hidden="true" />;
}
