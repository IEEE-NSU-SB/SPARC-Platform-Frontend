
import { useEffect } from 'react';
import ContactObj from './contactObj';
import StarSky from './StarSky';

export default function Contact() {
  useEffect(() => {
    document.title = 'Contact · SPARC · IEEE NSU SB';
  }, []);

  return (
    <>
    <section style={{minHeight: "50vh"}} className="page-hero" aria-labelledby="page-title">
            <StarSky />
            <div className="in">
              <h1 id="page-title" data-star-avoid>Get in touch</h1>
              <p data-star-avoid>Questions about registration, sponsorship, speakers or the
              ambassador program? Reach our lead ambassadors and the IEEE
              chair directly.
              </p>
            </div>
          </section>
      {/* <section
        className="page-hero"
        aria-labelledby="page-title"
        style={{ minHeight: '50vh' }}
      >
        <div className="in">
          <h1 id="page-title" data-star-avoid>
            Contact Us
          </h1>

          <p data-star-avoid>
            Get in Touch with the SPARC Team
          </p>
        </div>
      </section> */}

      <ContactObj />
    </>
  );
}
