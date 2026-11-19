import { pad2, prefersReducedMotion } from './utils';

/* Memorable moments: horizontal reel (arrows, counter, progress, mouse drag)
   and the fullscreen viewer (zoom, pan, pinch, swipe, keyboard, focus trap).
   Both return a cleanup function. */

export function initReel(section) {
  const reduceMotion = prefersReducedMotion();
  const reel = section.querySelector('.reel');
  const shots = Array.from(reel.querySelectorAll('.shot'));
  const prev = section.querySelector('.mo-prev'), next = section.querySelector('.mo-next');
  const bar = section.querySelector('.mo-bar'), count = section.querySelector('.mo-count');
  const total = shots.length;
  const current = () => {
    const pad = parseFloat(getComputedStyle(reel).paddingLeft) || 0;
    let best = 0, bestD = Infinity;
    shots.forEach((s, i) => { const d = Math.abs(s.offsetLeft - pad - reel.scrollLeft); if (d < bestD) { bestD = d; best = i; } });
    return best;
  };
  const update = () => {
    const max = reel.scrollWidth - reel.clientWidth;
    const p = max > 0 ? reel.scrollLeft / max : 0;
    bar.style.width = Math.max(0.04, p) * 100 + '%';
    prev.disabled = reel.scrollLeft <= 2;
    next.disabled = reel.scrollLeft >= max - 2;
    const idx = p > 0.995 ? total - 1 : current();
    count.innerHTML = `<b>${pad2(idx + 1)}</b> / ${pad2(total)}`;
  };
  const go = (dir) => {
    const pad = parseFloat(getComputedStyle(reel).paddingLeft) || 0;
    const i = Math.max(0, Math.min(total - 1, current() + dir));
    reel.scrollTo({ left: shots[i].offsetLeft - pad, behavior: reduceMotion ? 'auto' : 'smooth' });
  };
  const onPrev = () => go(-1), onNext = () => go(1);
  const onScroll = () => requestAnimationFrame(update);
  const onKey = (e) => {
    if (e.target !== reel) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
  };
  // mouse drag to scroll (touch uses native scrolling)
  let down = false, sx = 0, sl = 0, moved = false;
  const onDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    down = true; moved = false; sx = e.clientX; sl = reel.scrollLeft;
  };
  const onMove = (e) => {
    if (!down) return;
    const dx = e.clientX - sx;
    if (!moved && Math.abs(dx) > 6) { moved = true; reel.classList.add('dragging'); }
    if (moved) reel.scrollLeft = sl - dx;
  };
  const onUp = () => {
    if (!down) return;
    down = false;
    if (moved) {
      reel.classList.remove('dragging');
      const block = (ev) => { ev.stopPropagation(); ev.preventDefault(); };
      reel.addEventListener('click', block, { capture: true, once: true });
      setTimeout(() => reel.removeEventListener('click', block, true), 0);
    }
  };
  prev.addEventListener('click', onPrev);
  next.addEventListener('click', onNext);
  reel.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', update);
  reel.addEventListener('keydown', onKey);
  reel.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove);
  window.addEventListener('pointerup', onUp);
  update();
  return () => {
    prev.removeEventListener('click', onPrev);
    next.removeEventListener('click', onNext);
    reel.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', update);
    reel.removeEventListener('keydown', onKey);
    reel.removeEventListener('pointerdown', onDown);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerup', onUp);
  };
}

export function initLightbox(lb, triggers) {
  const reduceMotion = prefersReducedMotion();
  const q = (s) => lb.querySelector(s);
  const stage = q('.lb-stage'), img = q('.lb-img'), cap = q('.lb-cap'), cnt = q('.lb-count'), zl = q('.lb-zoom');
  const bIn = q('.lb-in'), bOut = q('.lb-out'), bFit = q('.lb-fit'), bClose = q('.lb-close'), bPrev = q('.lb-nav.prev'), bNext = q('.lb-nav.next');
  const items = triggers.map((t) => {
    const im = t.querySelector('img');
    return { src: im.getAttribute('src'), alt: im.alt, caption: t.getAttribute('data-caption') || '' };
  });
  let idx = 0, opener = null, natW = 1, natH = 1, base = 1, s = 1, tx = 0, ty = 0, W = 0, H = 0, closeT = null;
  const MAX_K = 3; // up to 300% of the photo's real pixels

  const maxS = () => Math.max(2, MAX_K / base);
  function apply(anim) {
    img.classList.toggle('anim', !!anim && !reduceMotion);
    img.style.transform = `translate(${tx}px,${ty}px) scale(${base * s})`;
    zl.textContent = Math.round(base * s * 100) + '%';
    bOut.disabled = s <= 1.001;
    bIn.disabled = s >= maxS() - 0.001;
    bFit.disabled = s <= 1.001;
    stage.classList.toggle('can-pan', s > 1.001);
  }
  function clamp() {
    const dw = natW * base * s, dh = natH * base * s;
    tx = dw <= W ? (W - dw) / 2 : Math.min(0, Math.max(W - dw, tx));
    ty = dh <= H ? (H - dh) / 2 : Math.min(0, Math.max(H - dh, ty));
  }
  function measure() { const r = stage.getBoundingClientRect(); W = r.width; H = r.height; }
  function fit(anim) {
    measure();
    base = Math.min((W * 0.94) / natW, (H * 0.94) / natH, 1); // never upscale on open
    s = 1; tx = (W - natW * base) / 2; ty = (H - natH * base) / 2;
    apply(anim);
  }
  function zoomTo(ns, cx, cy, anim) {
    ns = Math.max(1, Math.min(maxS(), ns));
    if (cx == null) { cx = W / 2; cy = H / 2; }
    const k = base * s, k2 = base * ns;
    const ix = (cx - tx) / k, iy = (cy - ty) / k;
    s = ns; tx = cx - ix * k2; ty = cy - iy * k2;
    clamp(); apply(anim);
  }
  function load(i) {
    idx = (i + items.length) % items.length;
    const it = items[idx];
    img.classList.remove('ready');
    img.onload = () => {
      natW = img.naturalWidth; natH = img.naturalHeight;
      img.style.width = natW + 'px'; img.style.height = natH + 'px';
      fit(false);
      img.classList.add('ready');
    };
    img.src = it.src; img.alt = it.alt;
    cnt.innerHTML = `<b>${pad2(idx + 1)}</b> / ${pad2(items.length)}`;
    cap.textContent = it.caption;
    if (it.alt) { const sm = document.createElement('small'); sm.textContent = it.alt; cap.appendChild(sm); }
    [idx - 1, idx + 1].forEach((j) => { const p = new Image(); p.src = items[(j + items.length) % items.length].src; });
  }
  function lock(on) {
    if (on) {
      const sbw = window.innerWidth - document.documentElement.clientWidth;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.paddingRight = sbw + 'px';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.paddingRight = '';
    }
  }
  function open(i, from) {
    clearTimeout(closeT);
    opener = from || null;
    lb.hidden = false; lock(true);
    load(i);
    requestAnimationFrame(() => lb.classList.add('open'));
    bClose.focus({ preventScroll: true });
  }
  function close() {
    lb.classList.remove('open');
    closeT = setTimeout(() => {
      lb.hidden = true; img.removeAttribute('src'); lock(false);
      if (opener) opener.focus({ preventScroll: true });
    }, reduceMotion ? 0 : 280);
  }

  const offs = [];
  const on = (el, ev, fn, opt) => { el.addEventListener(ev, fn, opt); offs.push(() => el.removeEventListener(ev, fn, opt)); };
  triggers.forEach((t, i) => on(t, 'click', () => open(i, t)));
  on(bClose, 'click', close);
  on(bPrev, 'click', () => load(idx - 1));
  on(bNext, 'click', () => load(idx + 1));
  on(bIn, 'click', () => zoomTo(s * 1.5, null, null, true));
  on(bOut, 'click', () => zoomTo(s / 1.5, null, null, true));
  on(bFit, 'click', () => fit(true));
  on(window, 'resize', () => { if (!lb.hidden) fit(false); });
  on(document, 'keydown', (e) => {
    if (lb.hidden) return;
    switch (e.key) {
      case 'Escape': e.preventDefault(); close(); break;
      case 'ArrowLeft': e.preventDefault(); load(idx - 1); break;
      case 'ArrowRight': e.preventDefault(); load(idx + 1); break;
      case '+': case '=': e.preventDefault(); zoomTo(s * 1.5, null, null, true); break;
      case '-': case '_': e.preventDefault(); zoomTo(s / 1.5, null, null, true); break;
      case '0': e.preventDefault(); fit(true); break;
      case 'Tab': { // keep focus inside the viewer
        const f = Array.from(lb.querySelectorAll('button:not([disabled])')).filter((b) => b.offsetParent !== null);
        if (!f.length) break;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        break;
      }
      default: break;
    }
  });
  on(stage, 'wheel', (e) => {
    e.preventDefault();
    const r = stage.getBoundingClientRect();
    zoomTo(s * Math.exp(-e.deltaY * 0.0015), e.clientX - r.left, e.clientY - r.top, false);
  }, { passive: false });
  on(stage, 'dblclick', (e) => {
    if (e.target.closest('button')) return;
    const r = stage.getBoundingClientRect();
    if (s > 1.001) fit(true); else zoomTo(2.5, e.clientX - r.left, e.clientY - r.top, true);
  });

  // pointer gestures: pan, swipe, pinch, double-tap, tap outside to close
  const ptrs = {};
  let start = null, pinch = null, lastTap = 0;
  const count = () => Object.keys(ptrs).length;
  on(stage, 'pointerdown', (e) => {
    if (e.target.closest('button')) return;
    try { stage.setPointerCapture(e.pointerId); } catch { /* pointer already released */ }
    ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
    const r = stage.getBoundingClientRect();
    if (count() === 2) {
      const p = Object.values(ptrs);
      pinch = { d: Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y), s };
      start = null;
    } else if (count() === 1) {
      start = { x: e.clientX, y: e.clientY, tx, ty, t: Date.now(), onImg: e.target === img, moved: false, rx: r.left, ry: r.top };
      if (s > 1.001) stage.classList.add('panning');
    }
  });
  on(stage, 'pointermove', (e) => {
    if (!ptrs[e.pointerId]) return;
    ptrs[e.pointerId] = { x: e.clientX, y: e.clientY };
    const r = stage.getBoundingClientRect();
    if (pinch && count() === 2) {
      const p = Object.values(ptrs);
      const d = Math.hypot(p[0].x - p[1].x, p[0].y - p[1].y);
      zoomTo((pinch.s * d) / pinch.d, (p[0].x + p[1].x) / 2 - r.left, (p[0].y + p[1].y) / 2 - r.top, false);
      return;
    }
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) start.moved = true;
    if (s > 1.001) { tx = start.tx + dx; ty = start.ty + dy; clamp(); apply(false); }
    else { tx = start.tx + dx * 0.5; ty = start.ty + Math.max(0, dy) * 0.4; apply(false); } // swipe feedback
  });
  const end = (e) => {
    if (!ptrs[e.pointerId]) return;
    delete ptrs[e.pointerId];
    stage.classList.remove('panning');
    if (pinch) { if (count() < 2) pinch = null; start = null; return; }
    if (!start) return;
    const dx = e.clientX - start.x, dy = e.clientY - start.y, st = start;
    start = null;
    if (!st.moved) {
      const now = Date.now();
      if (e.pointerType !== 'mouse' && now - lastTap < 300) { // double-tap zoom
        lastTap = 0;
        if (s > 1.001) fit(true); else zoomTo(2.5, e.clientX - st.rx, e.clientY - st.ry, true);
        return;
      }
      lastTap = now;
      if (!st.onImg && s <= 1.001) close();
      return;
    }
    if (s <= 1.001) {
      if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy)) load(idx + (dx < 0 ? 1 : -1));
      else if (dy > 110 && Math.abs(dy) > Math.abs(dx)) close();
      else fit(true);
    }
  };
  on(stage, 'pointerup', end);
  on(stage, 'pointercancel', end);

  return () => {
    offs.forEach((f) => f());
    clearTimeout(closeT);
    if (!lb.hidden) { lb.hidden = true; lb.classList.remove('open'); lock(false); }
  };
}
