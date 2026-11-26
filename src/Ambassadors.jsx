import { useEffect } from 'react';
import StarSky from './StarSky';
import AmbassadorsObj from './AmbassadorsObj';
import PolkaBackground from './PolkaBackground';

import ambassadors from './data/ambassadors';

export default function Ambassadors() {
  useEffect(() => {
    document.title = `Ambassadors · SPARC · IEEE NSU SB`;
  }, []);

  return (
    <>
      <section style={{minHeight: "50vh"}} className="page-hero" aria-labelledby="page-title">
        <StarSky />
        <div className="in">
          <h1 id="page-title" data-star-avoid>SPARC Ambassadors</h1>
          <p data-star-avoid>Student Leaders Driving Innovation</p>
        </div>
      </section>
      
      <section style={{ backgroundColor: "#FFFAFB", padding: "3rem 0" }}>
        <div className="RyIN">
          <AmbassadorsObj
            ambassadors={ambassadors}
          />
        </div>
      </section>
    </>
  );
}
