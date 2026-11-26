import CONFIG from '../config';

/* Which CTAs the current campaign phase shows (see src/config.js). */
export function currentPhase() {
  return CONFIG.phases[CONFIG.campaignPhase] || CONFIG.phases[1];
}

export function phaseHas(key) {
  const p = currentPhase();
  return p.primary === key || p.secondary === key;
}
