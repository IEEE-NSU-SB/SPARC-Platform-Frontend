import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from './Icons';
import { initLightbox, initReel } from './lib/gallery';

const SHOTS = [
  ['spac24-88.jpg', 'The SPAC 2024 family', 'Participants gathered for a group photo at SPAC 2024'],
  ['spac24-58.jpg', 'Closing ceremony', 'Recognition on stage at the SPAC 2024 closing ceremony'],
  ['moment-49.jpg', 'A full hall for the evening', 'A full banquet hall of guests at SPAC 2024'],
  ['spac24-10.jpg', 'Arrivals on the red carpet', 'The SPAC 2024 photo wall and red carpet'],
  ['spac24-40.jpg', 'Organizers and guests', 'Organizers and guests in front of the SPAC 2024 banner'],
  ['moment-67.jpg', 'Performances on stage', 'Performers on stage under purple lights at SPAC 2024'],
  ['spac24-16.jpg', 'Conversations at the tables', 'Students talking at their tables during SPAC 2024'],
  ['moment-85.jpg', 'Between sessions', 'Guests standing and talking between sessions at SPAC 2024'],
  ['moment-76.jpg', 'Celebrating the night', 'Participants celebrating on stage at SPAC 2024'],
  ['moment-91.jpg', 'The final group photo', 'The final group photo of SPAC 2024 in front of the stage'],
];

/* Fullscreen photo viewer markup; rendered into <body> so it sits above everything. */
function Lightbox({ boxRef }) {
  return createPortal(
    <div className="lb" ref={boxRef} role="dialog" aria-modal="true" aria-label="Photo viewer" hidden>
      <div className="lb-bar">
        <span className="lb-count" />
        <div className="lb-tools">
          <button className="ibtn lb-out" type="button" aria-label="Zoom out"><Icon name="i-minus" /></button>
          <span className="lb-zoom hide-sm">100%</span>
          <button className="ibtn lb-in" type="button" aria-label="Zoom in"><Icon name="i-plus" /></button>
          <button className="ibtn hide-sm lb-fit" type="button" aria-label="Reset zoom"><Icon name="i-fit" /></button>
          <button className="ibtn lb-close" type="button" aria-label="Close viewer"><Icon name="i-close" /></button>
        </div>
      </div>
      <div className="lb-stage">
        <img className="lb-img" alt="" draggable="false" />
        <button className="ibtn lb-nav prev" type="button" aria-label="Previous photo"><Icon name="i-left" /></button>
        <button className="ibtn lb-nav next" type="button" aria-label="Next photo"><Icon name="i-right" /></button>
      </div>
      <div className="lb-cap" />
    </div>,
    document.body
  );
}

export default function Moments() {
  const section = useRef(null);
  const box = useRef(null);

  useEffect(() => {
    const s = section.current;
    const offReel = initReel(s);
    const offLb = initLightbox(box.current, Array.from(s.querySelectorAll('[data-lb]')));
    return () => { offReel(); offLb(); };
  }, []);

  return (
    <section className="moments on-dark" id="moments" aria-labelledby="mo-title" ref={section}>
      <div className="in">
        <div className="mo-head" data-reveal>
          <div>
            <h2 className="title" id="mo-title">Memorable <span>moments</span></h2>
            <p className="lead">Scenes from SPAC 2024. Select any photo to view it full screen.</p>
          </div>
          <div className="mo-ctrl">
            <span className="mo-count" aria-live="polite"><b>01</b> / {String(SHOTS.length).padStart(2, '0')}</span>
            <button className="rbtn mo-prev" type="button" aria-label="Previous photos"><Icon name="i-left" /></button>
            <button className="rbtn mo-next" type="button" aria-label="Next photos"><Icon name="i-right" /></button>
          </div>
        </div>
      </div>
      <div className="reel" tabIndex={0} aria-label="SPAC 2024 photo gallery, scroll horizontally">
        {SHOTS.map(([file, caption, alt], i) => (
          <figure className="shot" key={file}>
            <button className="frame" type="button" data-lb data-caption={caption}>
              <img src={`/assets/${file}`} width="1100" height="618" alt={alt} loading="lazy" />
            </button>
            <figcaption><i>{String(i + 1).padStart(2, '0')}</i>{caption}</figcaption>
          </figure>
        ))}
      </div>
      <div className="in">
        <div className="mo-progress" aria-hidden="true"><span className="mo-bar" /></div>
        <p className="mo-hint">Drag, scroll or use the arrows to move through the gallery.</p>
      </div>
      <Lightbox boxRef={box} />
    </section>
  );
}
