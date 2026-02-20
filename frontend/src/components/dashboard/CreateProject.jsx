// import React, { useState } from 'react';
// import Modal from '../common/Modal';
// import Input from '../common/Input';
// import Button from '../common/Button';
// import { DEFAULT_THEME_COLOR } from '../../utils/constants';

// export default function CreateProject({ isOpen, onClose, onCreate }) {
//   const [name, setName] = useState('');
//   const [widgetTitle, setWidgetTitle] = useState('');
//   const [themeColor, setThemeColor] = useState(DEFAULT_THEME_COLOR);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleSubmit = async () => {
//     if (!name.trim()) {
//       setError('Project name is required');
//       return;
//     }
//     setLoading(true);
//     setError('');
//     try {
//       await onCreate({ name: name.trim(), widgetTitle: widgetTitle.trim() || name.trim(), themeColor });
//       setName('');
//       setWidgetTitle('');
//       setThemeColor(DEFAULT_THEME_COLOR);
//       onClose();
//     } catch (err) {
//       setError(err.message || 'Failed to create project');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Modal
//       isOpen={isOpen}
//       onClose={onClose}
//       title="Create New Project"
//       footer={
//         <>
//           <Button variant="ghost" onClick={onClose} disabled={loading}>Cancel</Button>
//           <Button loading={loading} onClick={handleSubmit}>Create Project</Button>
//         </>
//       }
//     >
//       <div className="flex flex-col gap-4">
//         <Input
//           label="Project Name *"
//           placeholder="My Documentation Bot"
//           value={name}
//           onChange={e => setName(e.target.value)}
//           onKeyDown={e => e.key === 'Enter' && handleSubmit()}
//           error={error}
//         />
//         <Input
//           label="Widget Title"
//           placeholder="Ask us anything!"
//           value={widgetTitle}
//           onChange={e => setWidgetTitle(e.target.value)}
//           hint="Displayed at the top of the chat widget"
//         />
//         <div className="flex flex-col gap-1.5">
//           <label className="text-sm font-medium text-gray-300">Theme Color</label>
//           <div className="flex items-center gap-3">
//             <input
//               type="color"
//               value={themeColor}
//               onChange={e => setThemeColor(e.target.value)}
//               className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border border-dark-500"
//             />
//             <span className="text-sm text-gray-400 font-mono">{themeColor}</span>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   );
// }


import React, { useState, useEffect } from 'react';
import { DEFAULT_THEME_COLOR } from '../../utils/constants';

const modalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .cp-modal, .cp-modal * { box-sizing: border-box; }
  .cp-modal { font-family: 'Syne', sans-serif; }

  @keyframes cp-fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes cp-slideUp { from{opacity:0;transform:translateY(20px) scale(.98)} to{opacity:1;transform:translateY(0) scale(1)} }
  @keyframes cp-spin    { to{transform:rotate(360deg)} }

  .cp-backdrop {
    position: fixed; inset: 0; z-index: 50;
    background: rgba(0,0,0,.75);
    backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    padding: 1rem;
    animation: cp-fadeIn .2s both;
  }

  .cp-panel {
    width: 100%;
    max-width: 440px;
    background: #111111;
    border: 1px solid rgba(255,255,255,.09);
    border-radius: 10px;
    overflow: hidden;
    animation: cp-slideUp .25s both;
  }

  .cp-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255,255,255,.07);
  }

  .cp-close {
    background: none;
    border: none;
    color: rgba(245,245,245,.3);
    cursor: pointer;
    padding: .3rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color .2s, background .2s;
  }
  .cp-close:hover { color: #f5f5f5; background: rgba(255,255,255,.06); }

  .cp-input-wrap label {
    font-family: 'DM Mono', monospace;
    font-size: .68rem;
    letter-spacing: .1em;
    text-transform: uppercase;
    color: rgba(245,245,245,.4);
    display: block;
    margin-bottom: .45rem;
  }

  .cp-input {
    width: 100%;
    background: rgba(255,255,255,.03);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 6px;
    padding: .7rem 1rem;
    font-family: 'Syne', sans-serif;
    font-size: .88rem;
    color: #f5f5f5;
    outline: none;
    transition: border-color .2s, background .2s;
  }
  .cp-input::placeholder { color: rgba(245,245,245,.2); }
  .cp-input:focus {
    border-color: rgba(0,255,135,.35);
    background: rgba(0,255,135,.03);
  }
  .cp-input.error { border-color: rgba(248,113,113,.4); }

  .cp-hint {
    font-family: 'DM Mono', monospace;
    font-size: .65rem;
    color: rgba(245,245,245,.25);
    letter-spacing: .04em;
    margin-top: .35rem;
  }

  .cp-submit {
    width: 100%;
    padding: .8rem;
    background: #00FF87;
    color: #0A0A0A;
    font-family: 'Syne', sans-serif;
    font-size: .88rem;
    font-weight: 700;
    letter-spacing: .02em;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background .2s, transform .15s, box-shadow .2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .5rem;
  }
  .cp-submit:hover:not(:disabled) {
    background: #00CC6E;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0,255,135,.22);
  }
  .cp-submit:disabled { opacity: .5; cursor: not-allowed; }

  .cp-cancel {
    width: 100%;
    padding: .75rem;
    background: transparent;
    color: rgba(245,245,245,.4);
    font-family: 'Syne', sans-serif;
    font-size: .85rem;
    font-weight: 500;
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 6px;
    cursor: pointer;
    transition: background .2s, color .2s, border-color .2s;
    text-align: center;
  }
  .cp-cancel:hover {
    background: rgba(255,255,255,.04);
    color: #f5f5f5;
    border-color: rgba(255,255,255,.14);
  }

  .cp-color-swatch {
    width: 28px; height: 28px;
    border-radius: 4px;
    border: 1px solid rgba(255,255,255,.15);
    cursor: pointer;
    position: relative;
    overflow: hidden;
    flex-shrink: 0;
    transition: border-color .2s;
  }
  .cp-color-swatch:hover { border-color: rgba(255,255,255,.35); }
  .cp-color-swatch input[type=color] {
    position: absolute; inset: -4px;
    width: calc(100% + 8px); height: calc(100% + 8px);
    opacity: 0; cursor: pointer;
  }
`;

export default function CreateProject({ isOpen, onClose, onCreate }) {
  const [name,        setName]        = useState('');
  const [widgetTitle, setWidgetTitle] = useState('');
  const [themeColor,  setThemeColor]  = useState(DEFAULT_THEME_COLOR);
  const [loading,     setLoading]     = useState(false);
  const [error,       setError]       = useState('');

  // lock body scroll
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const reset = () => {
    setName(''); setWidgetTitle(''); setThemeColor(DEFAULT_THEME_COLOR); setError('');
  };

  const handleClose = () => { reset(); onClose(); };

  const handleSubmit = async () => {
    if (!name.trim()) { setError('Project name is required'); return; }
    setLoading(true); setError('');
    try {
      await onCreate({ name: name.trim(), widgetTitle: widgetTitle.trim() || name.trim(), themeColor });
      reset();
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to create project');
    } finally {
      setLoading(false);
    }
  };

  const G = '#00FF87';

  return (
    <>
      <style>{modalStyles}</style>
      <div className="cp-modal">
        <div className="cp-backdrop" onClick={e => { if (e.target === e.currentTarget) handleClose(); }}>
          <div className="cp-panel">

            {/* ── HEADER ── */}
            <div className="cp-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem', marginBottom: '.2rem' }}>
                  <span style={{ display: 'inline-block', width: 6, height: 6, background: G, borderRadius: '50%' }} />
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.65rem', letterSpacing: '.12em', textTransform: 'uppercase', color: G }}>New</span>
                </div>
                <h2 style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-.03em', color: '#f5f5f5' }}>
                  Create Project
                </h2>
              </div>
              <button className="cp-close" onClick={handleClose}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── BODY ── */}
            <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Project Name */}
              <div className="cp-input-wrap">
                <label>Project Name *</label>
                <input
                  className={`cp-input${error && !name.trim() ? ' error' : ''}`}
                  placeholder="My Documentation Bot"
                  value={name}
                  onChange={e => { setName(e.target.value); setError(''); }}
                  onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                  autoFocus
                />
                {error && (
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '.68rem', color: '#f87171', marginTop: '.35rem', letterSpacing: '.02em' }}>
                    {error}
                  </p>
                )}
              </div>

              {/* Widget Title */}
              <div className="cp-input-wrap">
                <label>Widget Title</label>
                <input
                  className="cp-input"
                  placeholder="Ask us anything!"
                  value={widgetTitle}
                  onChange={e => setWidgetTitle(e.target.value)}
                />
                <p className="cp-hint">Shown at the top of the chat widget</p>
              </div>

              {/* Theme Color */}
              <div>
                <label style={{ fontFamily: "'DM Mono',monospace", fontSize: '.68rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(245,245,245,.4)', display: 'block', marginBottom: '.45rem' }}>
                  Theme Color
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                  <div className="cp-color-swatch" style={{ background: themeColor }}>
                    <input type="color" value={themeColor} onChange={e => setThemeColor(e.target.value)} />
                  </div>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.75rem', color: 'rgba(245,245,245,.5)', letterSpacing: '.06em' }}>
                    {themeColor.toUpperCase()}
                  </span>
                  {/* preset swatches */}
                  <div style={{ display: 'flex', gap: '.35rem', marginLeft: 'auto' }}>
                    {['#00FF87', '#7C3AED', '#3B82F6', '#F59E0B', '#EF4444'].map(c => (
                      <button
                        key={c}
                        onClick={() => setThemeColor(c)}
                        style={{
                          width: 18, height: 18, borderRadius: 3, background: c, border: 'none', cursor: 'pointer',
                          outline: themeColor === c ? `2px solid ${c}` : 'none',
                          outlineOffset: 2, transition: 'outline .15s',
                        }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,.06)' }} />

              {/* Actions */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '.6rem' }}>
                <button className="cp-submit" onClick={handleSubmit} disabled={loading}>
                  {loading ? (
                    <>
                      <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" style={{ animation: 'cp-spin 0.8s linear infinite' }}>
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Creating…
                    </>
                  ) : 'Create Project →'}
                </button>
                <button className="cp-cancel" onClick={handleClose} disabled={loading}>
                  Cancel
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}