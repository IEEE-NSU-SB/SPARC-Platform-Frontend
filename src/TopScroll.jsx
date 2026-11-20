import { useEffect, useState } from 'react';
import { Icon } from './Icons';
import { prefersReducedMotion } from './lib/utils';

/* Floating "back to top" button, shown after scrolling down. */
export default function TopScroll() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`totop${show ? ' show' : ''}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
    >
      <Icon name="i-up" />
    </button>
  );
}
