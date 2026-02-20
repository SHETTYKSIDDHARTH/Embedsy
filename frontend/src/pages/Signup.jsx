// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Input from '../components/common/Input';
// import Button from '../components/common/Button';

// export default function Signup() {
//   const { signUp } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirm, setConfirm] = useState('');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     if (password !== confirm) {
//       setError('Passwords do not match');
//       return;
//     }
//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return;
//     }
//     setLoading(true);
//     try {
//       await signUp(email, password);
//       setSuccess('Account created! Check your email to confirm, then sign in.');
//     } catch (err) {
//       setError(err.message || 'Signup failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-dark flex items-center justify-center p-4">
//       <div className="w-full max-w-sm">
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-black text-brand tracking-tight">Embedsy</h1>
//           <p className="text-gray-500 text-sm mt-2">Create your account</p>
//         </div>

//         <div className="bg-dark-200 border border-dark-400 rounded-2xl p-6">
//           {success ? (
//             <div className="text-center py-4">
//               <div className="w-12 h-12 rounded-full bg-brand/10 border border-brand/30 flex items-center justify-center mx-auto mb-3">
//                 <svg className="w-6 h-6 text-brand" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
//                 </svg>
//               </div>
//               <p className="text-white font-medium mb-1">Check your email</p>
//               <p className="text-gray-500 text-sm">{success}</p>
//               <Button className="mt-4 w-full" onClick={() => navigate('/login')}>
//                 Go to Login
//               </Button>
//             </div>
//           ) : (
//             <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//               <Input
//                 label="Email"
//                 type="email"
//                 placeholder="you@example.com"
//                 value={email}
//                 onChange={e => setEmail(e.target.value)}
//                 required
//               />
//               <Input
//                 label="Password"
//                 type="password"
//                 placeholder="Min. 6 characters"
//                 value={password}
//                 onChange={e => setPassword(e.target.value)}
//                 required
//               />
//               <Input
//                 label="Confirm Password"
//                 type="password"
//                 placeholder="Repeat password"
//                 value={confirm}
//                 onChange={e => setConfirm(e.target.value)}
//                 required
//               />

//               {error && (
//                 <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
//                   {error}
//                 </p>
//               )}

//               <Button type="submit" loading={loading} className="w-full mt-1">
//                 Create Account
//               </Button>
//             </form>
//           )}
//         </div>

//         <p className="text-center text-gray-500 text-sm mt-4">
//           Already have an account?{' '}
//           <Link to="/login" className="text-brand hover:underline">
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const signupStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .signup-page { font-family: 'Syne', sans-serif; cursor: none; }
  .signup-page * { box-sizing: border-box; }

  #su-cursor      { position:fixed;width:10px;height:10px;background:#00FF87;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform .1s; }
  #su-cursor-ring { position:fixed;width:36px;height:36px;border:1px solid rgba(0,255,135,.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:left .12s ease,top .12s ease,width .2s,height .2s; }

  .signup-page .su-grid-bg {
    position:fixed;inset:0;
    background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
    background-size:60px 60px;
    mask-image:radial-gradient(ellipse 70% 70% at 50% 50%,black 20%,transparent 100%);
    -webkit-mask-image:radial-gradient(ellipse 70% 70% at 50% 50%,black 20%,transparent 100%);
    pointer-events:none;
  }

  @keyframes su-pulse  { 0%,100%{opacity:1} 50%{opacity:.25} }
  @keyframes su-fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
  @keyframes su-checkPop { 0%{transform:scale(0) rotate(-10deg);opacity:0} 70%{transform:scale(1.15)} 100%{transform:scale(1);opacity:1} }
  @keyframes spin { to { transform:rotate(360deg) } }

  .su-pulse { animation:su-pulse 2s ease-in-out infinite; }

  .su-logo  { animation:su-fadeUp .5s .05s both; }
  .su-card  { animation:su-fadeUp .55s .12s both; }
  .su-f1    { animation:su-fadeUp .5s .18s both; }
  .su-f2    { animation:su-fadeUp .5s .25s both; }
  .su-f3    { animation:su-fadeUp .5s .32s both; }
  .su-btn   { animation:su-fadeUp .5s .39s both; }
  .su-foot  { animation:su-fadeUp .5s .46s both; }
  .su-check { animation:su-checkPop .4s .05s both; }

  .su-input-wrap label {
    font-family:'DM Mono',monospace;
    font-size:.7rem;
    letter-spacing:.1em;
    text-transform:uppercase;
    color:rgba(245,245,245,.4);
    display:block;
    margin-bottom:.45rem;
  }

  .su-input-wrap input {
    width:100%;
    background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);
    border-radius:6px;
    padding:.75rem 1rem;
    font-family:'Syne',sans-serif;
    font-size:.9rem;
    color:#f5f5f5;
    outline:none;
    transition:border-color .2s, background .2s;
  }
  .su-input-wrap input::placeholder { color:rgba(245,245,245,.2); }
  .su-input-wrap input:focus {
    border-color:rgba(0,255,135,.35);
    background:rgba(0,255,135,.03);
  }

  .su-submit {
    width:100%;
    padding:.8rem;
    background:#00FF87;
    color:#0A0A0A;
    font-family:'Syne',sans-serif;
    font-size:.92rem;
    font-weight:700;
    letter-spacing:.02em;
    border:none;
    border-radius:6px;
    cursor:none;
    transition:background .2s, transform .15s, box-shadow .2s;
  }
  .su-submit:hover:not(:disabled) {
    background:#00CC6E;
    transform:translateY(-1px);
    box-shadow:0 10px 32px rgba(0,255,135,.22);
  }
  .su-submit:disabled { opacity:.5; }

  .su-back:hover { color:#f5f5f5 !important; }

  .su-signin-link:hover { text-decoration:underline !important; }

  .su-goto-btn {
    width:100%;
    padding:.75rem;
    background:transparent;
    color:#f5f5f5;
    font-family:'Syne',sans-serif;
    font-size:.88rem;
    font-weight:600;
    border:1px solid rgba(255,255,255,.1);
    border-radius:6px;
    cursor:none;
    transition:border-color .2s, background .2s, transform .15s;
    margin-top:1.25rem;
  }
  .su-goto-btn:hover {
    border-color:rgba(0,255,135,.3);
    background:rgba(0,255,135,.04);
    transform:translateY(-1px);
  }

  /* strength bar */
  .su-strength-bar { height:2px;border-radius:2px;transition:width .3s,background .3s; }
`;

function strengthOf(pw) {
  if (!pw) return { width: '0%', color: 'transparent', label: '' };
  if (pw.length < 4) return { width: '25%', color: '#f87171', label: 'Weak' };
  if (pw.length < 6) return { width: '50%', color: '#fb923c', label: 'Fair' };
  if (pw.length < 10) return { width: '75%', color: '#facc15', label: 'Good' };
  return { width: '100%', color: '#00FF87', label: 'Strong' };
}

export default function Signup() {
  const { signUp } = useAuth();
  const navigate   = useNavigate();

  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [error,    setError]    = useState('');
  const [success,  setSuccess]  = useState('');
  const [loading,  setLoading]  = useState(false);

  const cursorRef     = React.useRef(null);
  const cursorRingRef = React.useRef(null);

  React.useEffect(() => {
    const move = (e) => {
      if (cursorRef.current)     { cursorRef.current.style.left = e.clientX + 'px'; cursorRef.current.style.top = e.clientY + 'px'; }
      if (cursorRingRef.current) { cursorRingRef.current.style.left = e.clientX + 'px'; cursorRingRef.current.style.top = e.clientY + 'px'; }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  React.useEffect(() => {
    const enter = () => {
      if (cursorRingRef.current) { cursorRingRef.current.style.width = '52px'; cursorRingRef.current.style.height = '52px'; }
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(0)';
    };
    const leave = () => {
      if (cursorRingRef.current) { cursorRingRef.current.style.width = '36px'; cursorRingRef.current.style.height = '36px'; }
      if (cursorRef.current) cursorRef.current.style.transform = 'translate(-50%,-50%) scale(1)';
    };
    const targets = document.querySelectorAll('a,button,input');
    targets.forEach(t => { t.addEventListener('mouseenter', enter); t.addEventListener('mouseleave', leave); });
    return () => targets.forEach(t => { t.removeEventListener('mouseenter', enter); t.removeEventListener('mouseleave', leave); });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) { setError('Passwords do not match'); return; }
    if (password.length < 6)  { setError('Password must be at least 6 characters'); return; }
    setLoading(true);
    try {
      await signUp(email, password);
      setSuccess('Account created! Check your email to confirm, then sign in.');
    } catch (err) {
      setError(err.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const G      = '#00FF87';
  const border = 'rgba(255,255,255,.07)';
  const strength = strengthOf(password);

  return (
    <div
      className="signup-page"
      style={{ minHeight: '100vh', background: '#0A0A0A', color: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}
    >
      <style>{signupStyles}</style>

      <div id="su-cursor" ref={cursorRef} />
      <div id="su-cursor-ring" ref={cursorRingRef} />
      <div className="su-grid-bg" />

      {/* glow */}
      <div style={{ position: 'fixed', width: 500, height: 500, background: 'radial-gradient(circle,rgba(0,255,135,.07) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      {/* back */}
      <Link
        to="/"
        className="su-back"
        style={{ position: 'fixed', top: '1.8rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '.45rem', textDecoration: 'none', color: 'rgba(245,245,245,.35)', fontFamily: "'DM Mono',monospace", fontSize: '.72rem', letterSpacing: '.06em', transition: 'color .2s', zIndex: 10 }}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        back
      </Link>

      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>

        {/* logo */}
        <div className="su-logo" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '.45rem', color: '#f5f5f5', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-.03em' }}>
            <span className="su-pulse" style={{ display: 'inline-block', width: 8, height: 8, background: G, borderRadius: '50%' }} />
            Embedsy
          </a>
          <p style={{ marginTop: '.6rem', fontFamily: "'DM Mono',monospace", fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(245,245,245,.3)' }}>
            Create your account
          </p>
        </div>

        {/* card */}
        <div className="su-card" style={{ background: '#111111', border: `1px solid ${border}`, borderRadius: 10, padding: '2rem' }}>

          {success ? (
            /* ── success state ── */
            <div style={{ textAlign: 'center', padding: '.5rem 0' }}>
              <div
                className="su-check"
                style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(0,255,135,.08)', border: '1px solid rgba(0,255,135,.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>

              <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '.4rem' }}>Check your inbox</p>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '.73rem', color: 'rgba(245,245,245,.4)', lineHeight: 1.7, letterSpacing: '.02em' }}>
                {success}
              </p>

              <button className="su-goto-btn" onClick={() => navigate('/login')}>
                Go to Sign In →
              </button>
            </div>
          ) : (
            /* ── form ── */
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              <div className="su-input-wrap su-f1">
                <label>Email</label>
                <input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} required autoComplete="email" />
              </div>

              <div className="su-f2">
                <div className="su-input-wrap">
                  <label>Password</label>
                  <input type="password" placeholder="Min. 6 characters" value={password} onChange={e => setPassword(e.target.value)} required autoComplete="new-password" />
                </div>
                {/* strength bar */}
                {password && (
                  <div style={{ marginTop: '.55rem', display: 'flex', alignItems: 'center', gap: '.75rem' }}>
                    <div style={{ flex: 1, height: 2, background: 'rgba(255,255,255,.06)', borderRadius: 2, overflow: 'hidden' }}>
                      <div className="su-strength-bar" style={{ width: strength.width, background: strength.color }} />
                    </div>
                    <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.65rem', letterSpacing: '.06em', color: strength.color, minWidth: 36 }}>
                      {strength.label}
                    </span>
                  </div>
                )}
              </div>

              <div className="su-input-wrap su-f3">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Repeat password"
                  value={confirm}
                  onChange={e => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                  style={{ borderColor: confirm && confirm !== password ? 'rgba(248,113,113,.4)' : undefined }}
                />
                {confirm && confirm !== password && (
                  <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '.68rem', color: '#f87171', marginTop: '.4rem', letterSpacing: '.02em' }}>
                    Passwords don't match
                  </p>
                )}
              </div>

              {error && (
                <div style={{ background: 'rgba(255,80,80,.07)', border: '1px solid rgba(255,80,80,.2)', borderRadius: 6, padding: '.65rem .9rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.73rem', color: '#f87171', letterSpacing: '.02em' }}>{error}</span>
                </div>
              )}

              <div className="su-btn">
                <button type="submit" className="su-submit" disabled={loading}>
                  {loading ? (
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                      Creating account…
                    </span>
                  ) : 'Create Account →'}
                </button>
              </div>

            </form>
          )}
        </div>

        {/* footer */}
        {!success && (
          <p className="su-foot" style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: "'DM Mono',monospace", fontSize: '.72rem', letterSpacing: '.04em', color: 'rgba(245,245,245,.3)' }}>
            Already have an account?{' '}
            <Link to="/login" className="su-signin-link" style={{ color: G, textDecoration: 'none', fontWeight: 500 }}>
              Sign in
            </Link>
          </p>
        )}

      </div>
    </div>
  );
}