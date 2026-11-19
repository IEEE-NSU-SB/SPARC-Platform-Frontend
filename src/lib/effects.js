import { prefersReducedMotion } from './utils';

/* Page effects that work directly on the rendered DOM.
   Each init* function returns a cleanup function for React's useEffect. */

/* Hero stays put while the next section ("What is SPARC") slides over it. */
export function initHeroCover(hero, next) {
  const reduceMotion = prefersReducedMotion();
  const inner = hero.querySelector('.hero-in'), shade = hero.querySelector('.hero-shade');
  let ticking = false;
  function paint() {
    ticking = false;
    const top = next.getBoundingClientRect().top, vh = window.innerHeight;
    const p = Math.max(0, Math.min(1, 1 - top / vh)); // 0 = not covered yet, 1 = fully covered
    shade.style.opacity = (p * 0.7).toFixed(3);
    if (!reduceMotion) {
      inner.style.transform = `translateY(${(-p * 40).toFixed(1)}px) scale(${(1 - p * 0.06).toFixed(4)})`;
      inner.style.opacity = (1 - p * 0.85).toFixed(3);
    }
    hero.style.visibility = p >= 1 && top < -vh * 0.2 ? 'hidden' : '';
  }
  function layout() {
    // stick when the hero's bottom reaches the viewport bottom, so tall heroes stay fully readable
    hero.style.setProperty('--hero-top', Math.min(0, window.innerHeight - hero.offsetHeight) + 'px');
    paint();
  }
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', layout);
  window.addEventListener('load', layout);
  layout();
  const settle = setTimeout(layout, 600); // fonts and images may change the hero height
  return () => {
    clearTimeout(settle);
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', layout);
    window.removeEventListener('load', layout);
  };
}

/* Scroll reveal: [data-reveal] fades up; [data-stagger] reveals its children
   one after another. Only elements below the fold are hidden. */
export function initReveal(root = document) {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return () => {};
  const vh = window.innerHeight, timers = [];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      el.classList.add('in-view');
      io.unobserve(el);
      // once the entrance has played, hand the element back to its own hover transitions
      const n = el.hasAttribute('data-stagger') ? el.children.length : 0;
      const wait = 1100 + (parseFloat(getComputedStyle(el).getPropertyValue('--d')) || 0) * 1000 + n * 70 + (n ? 300 : 0);
      timers.push(setTimeout(() => el.classList.remove('rv', 'stg', 'in-view'), wait));
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  root.querySelectorAll('[data-reveal]').forEach((el) => {
    if (el.getBoundingClientRect().top < vh * 0.95) return; // already on screen: leave visible
    el.classList.add('rv');
    io.observe(el);
  });
  root.querySelectorAll('[data-stagger]').forEach((el) => {
    Array.from(el.children).forEach((c, i) => c.style.setProperty('--i', i));
    if (el.getBoundingClientRect().top < vh * 0.95) return;
    el.classList.add('stg');
    io.observe(el);
  });
  return () => { io.disconnect(); timers.forEach(clearTimeout); };
}

/* Metric numbers count up when they come into view. */
export function initCountUp(root) {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return () => {};
  const rafs = [];
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      io.unobserve(en.target);
      const el = en.target, target = +el.getAttribute('data-target'), dur = 1400;
      let t0 = null;
      const step = (t) => {
        if (!t0) t0 = t;
        const p = Math.min(1, (t - t0) / dur);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) rafs.push(requestAnimationFrame(step));
      };
      rafs.push(requestAnimationFrame(step));
    });
  }, { threshold: 0.6 });
  root.querySelectorAll('[data-target]').forEach((n) => io.observe(n));
  return () => { io.disconnect(); rafs.forEach(cancelAnimationFrame); };
}

/* Collaborators: a spotlight moves from cell to cell. */
export function initSpotlight(wall) {
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) return () => {};
  const cells = Array.from(wall.querySelectorAll('.cw'));
  let i = -1, timer = null, startT = null, started = false, hovering = false, visible = false;
  const light = (n) => cells.forEach((c, k) => c.classList.toggle('is-lit', k === n));
  const step = () => { if (hovering) return; i = (i + 1) % cells.length; light(i); };
  const start = () => { if (!timer) timer = setInterval(step, 2500); };
  const stop = () => { clearInterval(timer); timer = null; };
  const enter = () => { hovering = true; light(-1); };
  const leave = () => { hovering = false; };
  wall.addEventListener('pointerenter', enter);
  wall.addEventListener('pointerleave', leave);
  const io = new IntersectionObserver((en) => {
    visible = en[0].isIntersecting;
    if (visible) {
      if (!started) { started = true; startT = setTimeout(() => { if (visible) { step(); start(); } }, 2400); } // after the entrance
      else start();
    } else { stop(); light(-1); }
  }, { threshold: 0.3 });
  io.observe(wall);
  return () => {
    stop(); clearTimeout(startT); io.disconnect();
    wall.removeEventListener('pointerenter', enter);
    wall.removeEventListener('pointerleave', leave);
  };
}

/* FAQ: animated accordion on native <details>. */
export function initFaq(list) {
  const reduceMotion = prefersReducedMotion();
  const navH = () => (document.getElementById('nav')?.offsetHeight || 0) + 16;
  const offs = [];
  list.querySelectorAll('details').forEach((d) => {
    const sum = d.querySelector('summary'), ans = d.querySelector('.ans');
    if (!sum || !ans) return;
    let anim = null;
    const done = (open) => {
      anim = null;
      d.open = open;
      d.classList.remove('closing');
      ans.style.height = ans.style.opacity = ans.style.paddingBottom = '';
    };
    const reveal = () => {
      const r = d.getBoundingClientRect(), over = r.bottom - (window.innerHeight - 16);
      if (over <= 0) return;
      const room = r.top - navH(); // never push the question under the navbar
      const by = Math.min(over, Math.max(0, room));
      if (by > 0) window.scrollBy({ top: by, behavior: reduceMotion ? 'auto' : 'smooth' });
    };
    const onClick = (e) => {
      e.preventDefault();
      const opening = !d.open || d.classList.contains('closing');
      if (anim) anim.cancel();
      if (reduceMotion || !ans.animate) { done(opening); if (opening) reveal(); return; }
      const pb = getComputedStyle(ans).paddingBottom;
      if (opening) {
        d.open = true; d.classList.remove('closing');
        const h = ans.scrollHeight;
        anim = ans.animate(
          [{ height: '0px', opacity: 0, paddingBottom: '0px' }, { height: h + 'px', opacity: 1, paddingBottom: pb }],
          { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' }
        );
        anim.onfinish = () => { done(true); reveal(); };
      } else {
        d.classList.add('closing');
        anim = ans.animate(
          [{ height: ans.offsetHeight + 'px', opacity: 1, paddingBottom: pb }, { height: '0px', opacity: 0, paddingBottom: '0px' }],
          { duration: 260, easing: 'cubic-bezier(.4,0,.2,1)' }
        );
        anim.onfinish = () => done(false);
      }
    };
    sum.addEventListener('click', onClick);
    offs.push(() => { sum.removeEventListener('click', onClick); if (anim) anim.cancel(); });
  });
  return () => offs.forEach((f) => f());
}
