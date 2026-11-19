import { prefersReducedMotion } from './utils';

/* Star sky (hero and page headers)
   Twinkling starfield, a few four-pointed gold sparkles drawn like the star
   in the SPARC logo, and a rare shooting star. Sparkles keep clear of any
   element marked data-star-avoid (logo, title, text, buttons) and the navbar.
   Returns a cleanup function. */
export function initStarSky(c) {
  const reduceMotion = prefersReducedMotion();
  const x = c.getContext('2d');
  if (!x) return () => {};
  let W = 0, H = 0, stars = [], sparks = [], shoot = null, nextShoot = 0;
  let running = true, raf = 0, last = 0;
  const avoidEls = Array.from(c.parentNode.querySelectorAll('[data-star-avoid]'));
  const GOLD = '243,199,112';
  const rnd = (a, b) => a + Math.random() * (b - a);

  function avoidRects() {
    const cr = c.getBoundingClientRect();
    return avoidEls
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { l: r.left - cr.left - 40, t: r.top - cr.top - 28, r: r.right - cr.left + 40, b: r.bottom - cr.top + 28 };
      })
      .filter((r) => r.r - r.l > 80);
  }
  function blocked(px, py, rects) {
    return rects.some((r) => px > r.l && px < r.r && py > r.t && py < r.b);
  }
  function placeSpark(sp) {
    const rects = avoidRects();
    let tries = 0;
    do {
      sp.x = rnd(W * 0.04, W * 0.96);
      sp.y = rnd(Math.max(96, H * 0.06), H * 0.94); // keep clear of the navbar
      tries++;
    } while (tries < 40 && blocked(sp.x, sp.y, rects));
    sp.size = rnd(11, 22); sp.dur = rnd(5, 9); sp.age = -rnd(0.5, 3); sp.rot = rnd(-0.12, 0.12);
  }
  function init() {
    const r = c.getBoundingClientRect(), d = Math.min(window.devicePixelRatio || 1, 2);
    W = r.width; H = r.height; c.width = W * d; c.height = H * d; x.setTransform(d, 0, 0, d, 0, 0);
    const n = Math.round(Math.min(160, Math.max(60, (W * H) / 9000)));
    stars = [];
    for (let i = 0; i < n; i++) {
      stars.push({
        x: rnd(0, W), y: rnd(0, H), r: Math.random() < 0.85 ? rnd(0.4, 1.1) : rnd(1.1, 1.7),
        base: rnd(0.35, 0.9), sp: rnd(0.6, 2.2), ph: rnd(0, 6.28), pink: Math.random() < 0.3,
      });
    }
    sparks = [];
    const m = W < 640 ? 4 : 6;
    for (let j = 0; j < m; j++) {
      const sp = {};
      placeSpark(sp);
      sp.age = sp.dur * rnd(0.3, 0.6); // some sparkles already shining when the page opens
      sparks.push(sp);
    }
    nextShoot = rnd(4, 8);
  }
  function sparkle(px, py, size, alpha, rot) {
    // four-pointed star with concave sides; vertical rays longer, like the logo
    const v = size, h = size * 0.72, k = size * 0.09;
    x.save(); x.translate(px, py); x.rotate(rot); x.globalAlpha = alpha;
    const g = x.createRadialGradient(0, 0, 0, 0, 0, v);
    g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(0.25, `rgba(${GOLD},1)`); g.addColorStop(1, `rgba(${GOLD},0)`);
    x.fillStyle = g;
    x.beginPath();
    x.moveTo(0, -v); x.quadraticCurveTo(k, -k, h, 0); x.quadraticCurveTo(k, k, 0, v);
    x.quadraticCurveTo(-k, k, -h, 0); x.quadraticCurveTo(-k, -k, 0, -v);
    x.fill();
    x.fillStyle = 'rgba(255,255,255,.95)'; x.beginPath(); x.arc(0, 0, Math.max(0.8, size * 0.07), 0, 6.283); x.fill();
    x.restore();
  }
  function draw(t, dt) {
    x.clearRect(0, 0, W, H);
    for (const s0 of stars) {
      if (!reduceMotion) { s0.y -= dt * s0.r * 3; if (s0.y < -2) { s0.y = H + 2; s0.x = rnd(0, W); } }
      const a = reduceMotion ? s0.base : s0.base * (0.55 + 0.45 * Math.sin(t * s0.sp + s0.ph));
      x.fillStyle = s0.pink ? `rgba(255,150,170,${a})` : `rgba(255,240,244,${a})`;
      x.beginPath(); x.arc(s0.x, s0.y, s0.r, 0, 6.283); x.fill();
    }
    for (const sp of sparks) {
      if (!reduceMotion) { sp.age += dt; if (sp.age > sp.dur) placeSpark(sp); }
      const p = reduceMotion ? 0.5 : sp.age / sp.dur;
      if (p < 0) continue;
      const al = p < 0.25 ? p / 0.25 : p > 0.75 ? (1 - p) / 0.25 : 1;
      const sc = 0.86 + 0.14 * Math.sin(p * Math.PI * 2);
      sparkle(sp.x, sp.y, sp.size * sc, al * 0.9, sp.rot);
    }
    if (reduceMotion) return;
    nextShoot -= dt;
    if (!shoot && nextShoot <= 0) {
      shoot = { x: rnd(W * 0.05, W * 0.6), y: rnd(H * 0.02, H * 0.35), ang: rnd(0.32, 0.55), sp: rnd(620, 820), len: rnd(110, 170), age: 0, dur: 1.1 };
    }
    if (shoot) {
      shoot.age += dt;
      const q = shoot.age / shoot.dur, dist = shoot.sp * shoot.age;
      const hx = shoot.x + Math.cos(shoot.ang) * dist, hy = shoot.y + Math.sin(shoot.ang) * dist;
      const tx = hx - Math.cos(shoot.ang) * shoot.len, ty = hy - Math.sin(shoot.ang) * shoot.len;
      const fade = q < 0.2 ? q / 0.2 : 1 - (q - 0.2) / 0.8;
      const lg = x.createLinearGradient(tx, ty, hx, hy);
      lg.addColorStop(0, `rgba(${GOLD},0)`); lg.addColorStop(1, `rgba(255,236,200,${0.85 * fade})`);
      x.strokeStyle = lg; x.lineWidth = 1.4; x.lineCap = 'round';
      x.beginPath(); x.moveTo(tx, ty); x.lineTo(hx, hy); x.stroke();
      if (q >= 1) { shoot = null; nextShoot = rnd(10, 14); }
    }
  }
  function frame(now) {
    const t = now / 1000, dt = last ? Math.min(0.05, t - last) : 0;
    last = t;
    draw(t, dt);
    if (running) raf = requestAnimationFrame(frame);
  }
  const onResize = () => { init(); if (reduceMotion) draw(0, 0); };

  init();
  if (reduceMotion) draw(0, 0);
  else raf = requestAnimationFrame(frame);
  window.addEventListener('resize', onResize);

  let io = null;
  if ('IntersectionObserver' in window && !reduceMotion) {
    io = new IntersectionObserver((en) => {
      const vis = en[0].isIntersecting;
      if (vis && !running) { running = true; last = 0; raf = requestAnimationFrame(frame); }
      if (!vis) { running = false; cancelAnimationFrame(raf); }
    });
    io.observe(c);
  }
  return () => {
    running = false;
    cancelAnimationFrame(raf);
    window.removeEventListener('resize', onResize);
    if (io) io.disconnect();
  };
}
