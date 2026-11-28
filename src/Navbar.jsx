import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import SmartLink from './SmartLink';
import { CtaLink } from './CtaLink';

/* Top navigation: Home · Timeline · Speakers · Ambassadors · Registration · Contact.
   The current page gets the crimson underline (aria-current="page"). */
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  // close the phone menu after choosing a link
  const onMenuClick = (e) => { if (e.target.closest('a')) setOpen(false); };

  return (
    <header className={`nav${solid ? ' solid' : ''}`} id="nav">
      <div className="nav-in">
        <Link className="brand" to="/" aria-label="SPARC home">
          <img src="/assets/sparc-logo-2026.png" width="1400" height="448" alt="SPARC" />
        </Link>
        <button
          className="burger"
          type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="links"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
        </button>
        <nav className={`links${open ? ' open' : ''}`} id="links" aria-label="Main" onClick={onMenuClick}>
          <NavLink to="/" end>Home</NavLink>
          <SmartLink k="timeline" nav>Timeline</SmartLink>
          <SmartLink k="speakers" nav>Speakers</SmartLink>
          <SmartLink k="ambassadors" nav>Ambassadors</SmartLink>
          <CtaLink ctaKey="register" variant="text" text="Registration" />
          <NavLink to="/contact">Contact</NavLink>
        </nav>
      </div>
    </header>
  );
}
