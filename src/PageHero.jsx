import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import StarSky from './StarSky';
import { ArrowIcon } from './Icons';

/* Dark page header with the star sky, used by Timeline, Speakers,
   Ambassadors and the 404 page. Content for a page goes in `children`
   (rendered below the header). */
export default function PageHero({ title, line, chip = 'Coming soon', children }) {
  useEffect(() => {
    document.title = `${title} · SPARC · IEEE NSU SB`;
  }, [title]);

  return (
    <main>
      <section className="page-hero" aria-labelledby="page-title">
        <StarSky />
        <div className="in">
          {chip && <span className="soon-chip" data-star-avoid>{chip}</span>}
          <h1 id="page-title" data-star-avoid>{title}</h1>
          {line && <p data-star-avoid>{line}</p>}
          <Link className="btn btn-secondary" to="/" data-star-avoid>
            <span>Back to home</span><ArrowIcon />
          </Link>
        </div>
      </section>
      {children}
    </main>
  );
}
