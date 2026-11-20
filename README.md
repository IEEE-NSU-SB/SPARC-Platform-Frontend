# SPARC 2026 · Frontend

Website for **SPARC**, the Student Professional Awareness Regional Conclave, hosted by the
IEEE NSU Student Branch at North South University, Dhaka (December 30, 2026).

Built with **React 19**, **Vite 7**, **React Router 7** and **Tailwind CSS 4**.

## Run it locally

```bash
npm install
npm run dev        # http://localhost:5173
npm run lint       # code checks
npm run build      # production build in dist/
npm run preview    # serve the production build
```

## Change dates, links and buttons

Everything organizers usually change lives in **`src/config.js`**:

| Setting | What it does |
| --- | --- |
| `countdown.deadline` | Hero countdown (keep the `+06:00` Bangladesh offset) |
| `campaignPhase` | `1` = Hackathon + Ambassador buttons, `2` = Hackathon + Register |
| `ctas.*.url` | Button links. `null` shows a "coming soon" notice instead |
| `links.*` | Navbar, footer and social links. `null` hides the link |
| `metrics` | Numbers in "SPARC at a glance". `value: null` shows "TBA" |

## Project structure

```
main.jsx            entry point
index.html          page shell, fonts, title
public/assets/      images, logos, video (served as /assets/...)
public/.htaccess    lets /timeline etc. work on cPanel when refreshed
src/
  App.jsx           routes: /, /timeline, /speakers, /ambassadors, 404
  config.js         dates, links, phases, metrics
  index.css         the SPARC design (Tailwind utilities also available)
  Navbar.jsx, Footer.jsx
  Home.jsx          home page, made of one component per section:
    Hero, WhatIs, Metrics, Goal, WhatAwaits, WhyAttend,
    Collaborators, Sponsors, Legacy, Moments (+ fullscreen viewer),
    Faq, CtaBand
  Timeline.jsx, Speakers.jsx, Ambassadors.jsx
                    placeholder pages built on PageHero.jsx; add their
                    content below the header
  StarSky.jsx       star animation behind the hero and page headers
  CtaLink.jsx       phase-based buttons
  lib/              animation and gallery logic (scroll reveal, count-up,
                    FAQ accordion, collaborators spotlight, star sky,
                    photo reel and fullscreen viewer)
```

## Deploy

Pushing to the **`production`** branch runs `.github/workflows/deploy.yml`, which builds the
site and uploads `dist/` to cPanel over SSH (secrets: `CPANEL_HOST`, `CPANEL_USER`,
`CPANEL_SSH_KEY`, `TARGET_FOLDER`). Make sure `dist/.htaccess` reaches the server so that
pages like `/timeline` load when opened directly.
