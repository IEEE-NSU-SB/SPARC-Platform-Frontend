import { useEffect, useState } from 'react';
import { TOAST_EVENT } from './lib/utils';

/* Small "Coming soon" notice used by CTAs that have no link yet. */
export default function Toast() {
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);

  useEffect(() => {
    let timer;
    const onToast = (e) => {
      setMsg(e.detail);
      setShow(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShow(false), 3800);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => { window.removeEventListener(TOAST_EVENT, onToast); clearTimeout(timer); };
  }, []);

  return (
    <div className={`toast${show ? ' show' : ''}`} id="toast" role="status" aria-live="polite">
      {msg && <><b>Coming soon.</b> {msg}</>}
    </div>
  );
}
