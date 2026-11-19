import { Link, NavLink } from 'react-router-dom';
import CONFIG from './config';
import { isExternal } from './lib/utils';

/* A link whose address comes from CONFIG.links (src/config.js).
   - null in the config  -> renders nothing
   - '/timeline'         -> in-app page (React Router)
   - 'https://…'         -> opens in a new tab
   - key "email"         -> mailto: link                               */
export default function SmartLink({ k, nav = false, children, ...rest }) {
  const url = CONFIG.links[k];
  if (!url) return null;
  if (k === 'email') return <a href={`mailto:${url}`} {...rest}>{children ?? url}</a>;
  if (url.startsWith('/')) {
    return nav ? <NavLink to={url} {...rest}>{children}</NavLink> : <Link to={url} {...rest}>{children}</Link>;
  }
  const ext = isExternal(url) ? { target: '_blank', rel: 'noopener' } : {};
  return <a href={url} {...ext} {...rest}>{children}</a>;
}

/* Same, wrapped in <li>; the whole item disappears when the link is not set. */
export function LinkItem({ k, children, ...rest }) {
  if (!CONFIG.links[k]) return null;
  return <li><SmartLink k={k} {...rest}>{children}</SmartLink></li>;
}
