/* =====================================================================
   SPARC site configuration
   ---------------------------------------------------------------------
   Organizers: this is the only file you need to edit (src/config.js) to change dates,
   links and which buttons are shown. Leave a value as `null` when the
   official link is not ready yet; the site handles it gracefully.
   ===================================================================== */
const CONFIG = {

  event: {
    name: 'SPARC',
    dateLabel: 'December 30, 2026',
    venue: 'North South University',
    city: 'Dhaka, Bangladesh'
  },

  /* ---------- Countdown (hero) ----------
     `deadline` is an ISO 8601 date-time. Keep the +06:00 offset so it is
     read as Bangladesh Standard Time (UTC+6).
     TODO(organizers): confirm the month and the exact closing time.     */
  countdown: {
    enabled: true,
    label: 'Applications close in',
    deadline: '2026-12-30T23:59:59+06:00',
    timeZone: 'Asia/Dhaka',
    expiredMessage: 'Applications have closed. Thank you to everyone who applied.'
  },

  /* ---------- Campaign phase ----------
     1 = Apply for Hackathon + Apply as an Ambassador   (current)
     2 = Apply for Hackathon + Register for Event       (after the ambassador announcement)
     Change to 2 only once the ambassador announcement is confirmed.
     Exactly two buttons are shown: `primary` and `secondary`.           */
  campaignPhase: 1,
  phases: {
    1: { primary: 'hackathon', secondary: 'ambassador' },
    2: { primary: 'hackathon', secondary: 'register' }
  },

  /* ---------- Call-to-action buttons ----------
     `url: null` keeps the button visible and shows a short
     "link coming soon" notice instead of navigating.                    */
  ctas: {
    hackathon:  { label: 'Apply for Hackathon',    pill: 'Join the Hackathon', url: null },
    ambassador: { label: 'Apply as an Ambassador', pill: 'Become an Ambassador', url: null },
    register:   { label: 'Register for Event',     pill: 'Register',          url: null }
  },
  pendingMessage: 'This link opens soon. Follow IEEE NSU SB for the announcement.',

  /* ---------- Links ----------
     Verified from ieeensusb.org on 19 Nov 2026 unless marked TODO.
     Items left as null are hidden until provided.                       */
  links: {
    facebookEvent: null,   // TODO(organizers): official SPARC Facebook event
    eventWebsite:  null,   // TODO(organizers): SPARC page on ieeensusb.org (mega-event)
    timeline:      '/timeline',      // page in this app (src/Timeline.jsx)
    speakers:      '/speakers',      // page in this app (src/Speakers.jsx)
    ambassadors:   '/ambassadors',   // page in this app (src/Ambassadors.jsx)

    ieee:          'https://www.ieee.org/',
    branchWebsite: 'https://ieeensusb.org/',
    contactPage:   'https://ieeensusb.org/contact/',
    email:         'contact@ieeensusb.org',
    webTeam:       'https://ieeensusb.org/team/website-development/',

    facebook:  'https://www.facebook.com/ieeensusb/',
    linkedin:  'https://www.linkedin.com/company/ieeensusb',
    instagram: 'https://instagram.com/ieeensusb',
    x:         'https://www.twitter.com/ieeensusb',
    youtube:   'https://youtube.com/channel/UCR--MNc_lCe9lvgdnSWm6kA'
  },

  /* ---------- Metrics ----------
     Only verified figures. `value: null` shows "TBA" (no count-up) until
     the organizers confirm the number. `suffix` is added after the number
     (e.g. 'th' or '+').                                                  */
  metrics: [
    { value: 4,    suffix: 'th', label: 'Edition',            note: 'SPAC 2023 – 2025, then SPARC', icon: 'editions' },
    { value: null, suffix: '+',  label: 'Universities',       note: 'Across the region',            icon: 'network' },   // TODO(organizers)
    { value: null, suffix: '+',  label: 'Participants',       note: 'Students and graduates',       icon: 'people' },    // TODO(organizers)
    { value: null, suffix: '+',  label: 'Industrial Experts', note: 'Professionals and guests',     icon: 'expert' }     // TODO(organizers)
  ]
};

export default CONFIG;
