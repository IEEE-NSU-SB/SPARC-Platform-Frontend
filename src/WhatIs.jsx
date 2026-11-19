export default function WhatIs() {
  return (
    <section className="what paper" id="about">
      <div className="in what-grid">
        <div className="what-copy">
          <h2 className="title" data-reveal>What is <span>SPARC?</span></h2>
          <p data-reveal style={{ '--d': '.06s' }}>
            <strong>SPARC</strong> stands for <strong>Student Professional Awareness Regional Conclave</strong>. It is a
            formal networking event and dinner where engineering and computer science students meet professionals working
            in their fields.
          </p>
          <p data-reveal style={{ '--d': '.12s' }}>
            SPARC is part of IEEE&apos;s Student Professional Awareness (SPAx) initiatives, which help students understand
            the professional world before they enter it. It builds on <strong>SPAC</strong>, the conference the IEEE NSU
            Student Branch has hosted in previous years, and grows it into a regional conclave.
          </p>
          <p data-reveal style={{ '--d': '.18s' }}>
            Unlike a conventional student conference of back-to-back lectures, SPARC puts students and professionals at the
            same table, in a formal setting, with people from across the region.
          </p>
        </div>
        <figure className="what-pic" data-reveal style={{ '--d': '.1s' }}>
          <img src="/assets/what-is.jpg" width="1200" height="800" alt="Students and professionals at a previous SPAC event" loading="lazy" />
          <figcaption>SPAC 2024</figcaption>
        </figure>
      </div>
    </section>
  );
}
