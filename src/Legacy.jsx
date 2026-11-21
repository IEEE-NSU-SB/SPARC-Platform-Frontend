import { useRef, useState } from 'react';

export default function Legacy() {
  const vid = useRef(null);
  const [muted, setMuted] = useState(true);

  const toggleSound = () => {
    const v = vid.current;
    v.muted = !muted;
    if (muted) v.play().catch(() => {});
    setMuted(!muted);
  };

  return (
    <section className="legacy paper" id="legacy">
      <div className="in center">
        <h2 className="title" data-reveal>A legacy of <span>excellence</span></h2>
        <p className="motto" data-reveal>SPAC built the foundation. <span>SPARC takes the vision further.</span></p>
        <p className="lead" data-reveal>
          For three years the IEEE NSU Student Branch has brought students and professionals together through SPAC. SPARC
          carries that experience forward, with a wider regional reach.
        </p>
        <ol className="editions" data-reveal>
          <li className="ed"><b>SPAC 2023</b><span>Hosted by IEEE NSU SB</span></li>
          <li className="ed"><b>SPAC 2024</b><span>Networking, talks and formal dinner</span></li>
          <li className="ed"><b>SPAC 2025</b><span>December 29, 2025 · North South University</span></li>
          <li className="ed now"><b>SPARC</b><span>December 30, 2026 · North South University</span></li>
        </ol>
        <div className="ly-head" data-reveal>
          <span className="ly-orn" aria-hidden="true"><i /><b /><i /></span>
          <h3 className="ly-title">Last Year&apos;s <span>SPAC</span></h3>
          <p className="ly-sub">Relive the highlights from SPAC 2024</p>
        </div>
        <div className="video" data-reveal>
          <video ref={vid} src="/assets/spac24.mp4" poster="/assets/spac24-poster.jpg" autoPlay muted loop playsInline preload="metadata" />
          <button className="sound" type="button" onClick={toggleSound}>{muted ? 'Sound on' : 'Sound off'}</button>
        </div>
      </div>
    </section>
  );
}
