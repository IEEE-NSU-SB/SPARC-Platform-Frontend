// Small shared helpers.

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const pad2 = (n) => String(n).padStart(2, '0');

export const isExternal = (url) => /^https?:\/\//.test(url || '');

// "Coming soon" notice, shown by <Toast /> (src/Toast.jsx).
export const TOAST_EVENT = 'sparc:toast';
export function showToast(message) {
  window.dispatchEvent(new CustomEvent(TOAST_EVENT, { detail: message }));
}
