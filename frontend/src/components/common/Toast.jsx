// import React, { useEffect, useState } from 'react';

// export default function Toast({ message, type = 'success', onClose, duration = 3500 }) {
//   const [visible, setVisible] = useState(true);

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setVisible(false);
//       setTimeout(onClose, 300);
//     }, duration);
//     return () => clearTimeout(timer);
//   }, [duration, onClose]);

//   const styles = {
//     success: 'bg-brand/10 border-brand/30 text-brand',
//     error: 'bg-red-500/10 border-red-500/30 text-red-400',
//     info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
//   };

//   const icons = {
//     success: '✓',
//     error: '✕',
//     info: 'ℹ',
//   };

//   return (
//     <div
//       className={`
//         flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium
//         shadow-lg transition-all duration-300
//         ${styles[type]}
//         ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
//       `}
//     >
//       <span className="font-bold">{icons[type]}</span>
//       <span>{message}</span>
//       <button onClick={() => { setVisible(false); setTimeout(onClose, 300); }} className="ml-2 opacity-60 hover:opacity-100">✕</button>
//     </div>
//   );
// }

// // Toast container — place once in Layout
// export function ToastContainer({ toasts, removeToast }) {
//   return (
//     <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
//       {toasts.map(t => (
//         <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
//       ))}
//     </div>
//   );
// }

// // Hook to manage toasts
// export function useToast() {
//   const [toasts, setToasts] = useState([]);

//   const addToast = (message, type = 'success') => {
//     const id = Date.now();
//     setToasts(prev => [...prev, { id, message, type }]);
//   };

//   const removeToast = (id) => {
//     setToasts(prev => prev.filter(t => t.id !== id));
//   };

//   return { toasts, addToast, removeToast };
// }


import React, { useEffect, useState } from 'react';

const toastStyles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&display=swap');

  @keyframes toast-in  { from{opacity:0;transform:translateY(8px)} to{opacity:1;transform:translateY(0)} }
  @keyframes toast-out { from{opacity:1;transform:translateY(0)} to{opacity:0;transform:translateY(8px)} }

  .toast-item {
    display: flex;
    align-items: center;
    gap: .75rem;
    padding: .7rem 1rem;
    border-radius: 6px;
    font-family: 'DM Mono', monospace;
    font-size: .72rem;
    letter-spacing: .04em;
    min-width: 200px;
    max-width: 320px;
    box-shadow: 0 8px 32px rgba(0,0,0,.4);
    animation: toast-in .2s both;
    transition: opacity .25s, transform .25s;
  }
  .toast-item.hiding { animation: toast-out .25s both; }

  .toast-success { background: rgba(0,255,135,.08); border: 1px solid rgba(0,255,135,.2); color: #00FF87; }
  .toast-error   { background: rgba(248,113,113,.08); border: 1px solid rgba(248,113,113,.2); color: #f87171; }
  .toast-info    { background: rgba(96,165,250,.08); border: 1px solid rgba(96,165,250,.2); color: #60a5fa; }

  .toast-close {
    background: none; border: none; cursor: pointer;
    margin-left: auto;
    opacity: .45;
    color: inherit;
    display: flex; align-items: center;
    transition: opacity .2s;
    padding: 0;
    flex-shrink: 0;
  }
  .toast-close:hover { opacity: 1; }
`;

const ICONS = {
  success: (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  ),
  error: (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  ),
  info: (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  ),
};

function Toast({ message, type = 'success', onClose, duration = 3500 }) {
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => {
      setHiding(true);
      setTimeout(onClose, 250);
    }, duration);
    return () => clearTimeout(t);
  }, [duration, onClose]);

  const close = () => { setHiding(true); setTimeout(onClose, 250); };

  return (
    <>
      <style>{toastStyles}</style>
      <div className={`toast-item toast-${type}${hiding ? ' hiding' : ''}`}>
        <span style={{ flexShrink: 0 }}>{ICONS[type]}</span>
        <span style={{ flex: 1 }}>{message}</span>
        <button className="toast-close" onClick={close} aria-label="Close">
          <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>
    </>
  );
}

export function ToastContainer({ toasts, removeToast }) {
  return (
    <div style={{ position: 'fixed', bottom: '1.5rem', right: '1.5rem', zIndex: 9999, display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
      {toasts.map(t => (
        <Toast key={t.id} message={t.message} type={t.type} onClose={() => removeToast(t.id)} />
      ))}
    </div>
  );
}

export function useToast() {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}

export default Toast;