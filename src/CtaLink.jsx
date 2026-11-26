import CONFIG from './config';
import { ArrowIcon } from './Icons';
import { isExternal, showToast } from './lib/utils';
import { currentPhase } from './lib/phase';

/* Call-to-action buttons driven by src/config.js.
   The campaign phase decides which CTA is "primary" and "secondary":
     phase 1 = Hackathon + Ambassador, phase 2 = Hackathon + Register.
   A CTA without a url shows the "coming soon" notice instead of navigating. */

export function CtaLink({ role = 'primary', ctaKey, variant = 'btn', size, text, className = '' }) {
  const key = ctaKey || currentPhase()[role];
  const c = CONFIG.ctas[key];
  if (!c) return null;

  let cls = '', content;
  if (variant === 'pill') {
    cls = 'pill';
    content = `+ ${c.pill || c.label}`;
  } else if (variant === 'text') {
    content = text || c.label;
  } else {
    cls = `btn ${role === 'primary' ? 'btn-primary' : 'btn-secondary'}${size === 'sm' ? ' btn-sm' : ''}`;
    content = (<><span>{text || c.label}</span>{size === 'sm' ? null : <ArrowIcon />}</>);
  }
  const linkProps = c.url
    ? { href: c.url, ...(isExternal(c.url) ? { target: '_blank', rel: 'noopener' } : {}) }
    : {
        href: '#',
        'aria-describedby': 'toast',
        onClick: (e) => { e.preventDefault(); showToast(`${c.label}: ${CONFIG.pendingMessage}`); },
      };
  const finalCls = `${cls} ${className}`.trim();
  return <a className={finalCls || undefined} data-cta-key={key} {...linkProps}>{content}</a>;
}

/* Exactly two buttons: the phase's primary and secondary CTA. */
export function CtaGroup({ className = 'cta-group', ...rest }) {
  return (
    <div className={className} {...rest}>
      <CtaLink role="primary" />
      <CtaLink role="secondary" />
    </div>
  );
}
