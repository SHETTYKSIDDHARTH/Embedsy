// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import Input from '../components/common/Input';
// import Button from '../components/common/Button';

// export default function Login() {
//   const { signIn } = useAuth();
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);
//     try {
//       await signIn(email, password);
//       navigate('/dashboard');
//     } catch (err) {
//       setError(err.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-dark flex items-center justify-center p-4">
//       <div className="w-full max-w-sm">
//         {/* Logo */}
//         <div className="text-center mb-8">
//           <h1 className="text-3xl font-black text-brand tracking-tight">Embedsy</h1>
//           <p className="text-gray-500 text-sm mt-2">Sign in to your account</p>
//         </div>

//         {/* Card */}
//         <div className="bg-dark-200 border border-dark-400 rounded-2xl p-6">
//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <Input
//               label="Email"
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={e => setEmail(e.target.value)}
//               required
//             />
//             <Input
//               label="Password"
//               type="password"
//               placeholder="••••••••"
//               value={password}
//               onChange={e => setPassword(e.target.value)}
//               required
//             />

//             {error && (
//               <p className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-lg px-3 py-2">
//                 {error}
//               </p>
//             )}

//             <Button type="submit" loading={loading} className="w-full mt-1">
//               Sign In
//             </Button>
//           </form>
//         </div>

//         <p className="text-center text-gray-500 text-sm mt-4">
//           Don't have an account?{' '}
//           <Link to="/signup" className="text-brand hover:underline">
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const loginStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .login-page { font-family: 'Syne', sans-serif; cursor: none; }
  .login-page * { box-sizing: border-box; }

  #lg-cursor      { position:fixed;width:10px;height:10px;background:#00FF87;border-radius:50%;pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:transform .1s; }
  #lg-cursor-ring { position:fixed;width:36px;height:36px;border:1px solid rgba(0,255,135,.4);border-radius:50%;pointer-events:none;z-index:9998;transform:translate(-50%,-50%);transition:left .12s ease,top .12s ease,width .2s,height .2s; }

  .login-page .lp-grid-bg {
    position:fixed;inset:0;
    background-image:linear-gradient(rgba(255,255,255,.03) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.03) 1px,transparent 1px);
    background-size:60px 60px;
    mask-image:radial-gradient(ellipse 70% 70% at 50% 50%,black 20%,transparent 100%);
    -webkit-mask-image:radial-gradient(ellipse 70% 70% at 50% 50%,black 20%,transparent 100%);
    pointer-events:none;
  }

  @keyframes lg-pulse  { 0%,100%{opacity:1} 50%{opacity:.25} }
  @keyframes lg-fadeUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }

  .lg-pulse { animation:lg-pulse 2s ease-in-out infinite; }

  .lg-card { animation:lg-fadeUp .55s .1s both; }
  .lg-field { animation:lg-fadeUp .55s .2s both; }
  .lg-field-2 { animation:lg-fadeUp .55s .28s both; }
  .lg-btn   { animation:lg-fadeUp .55s .36s both; }
  .lg-foot  { animation:lg-fadeUp .55s .44s both; }

  .lg-input-wrap label {
    font-family:'DM Mono',monospace;
    font-size:.7rem;
    letter-spacing:.1em;
    text-transform:uppercase;
    color:rgba(245,245,245,.4);
    display:block;
    margin-bottom:.45rem;
  }

  .lg-input-wrap input {
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
  .lg-input-wrap input::placeholder { color:rgba(245,245,245,.2); }
  .lg-input-wrap input:focus {
    border-color:rgba(0,255,135,.35);
    background:rgba(0,255,135,.03);
  }

  .lg-submit {
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
  .lg-submit:hover:not(:disabled) {
    background:#00CC6E;
    transform:translateY(-1px);
    box-shadow:0 10px 32px rgba(0,255,135,.22);
  }
  .lg-submit:disabled { opacity:.5; }
`;

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const cursorRef     = React.useRef(null);
  const cursorRingRef = React.useRef(null);

  React.useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top  = e.clientY + 'px';
      }
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = e.clientX + 'px';
        cursorRingRef.current.style.top  = e.clientY + 'px';
      }
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
    setLoading(true);
    try {
      await signIn(email, password);
      navigate('/app/dashboard');
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const G      = '#00FF87';
  const border = 'rgba(255,255,255,.07)';

  return (
    <div
      className="login-page"
      style={{ minHeight: '100vh', background: '#0A0A0A', color: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}
    >
      <style>{loginStyles}</style>

      <div id="lg-cursor" ref={cursorRef} />
      <div id="lg-cursor-ring" ref={cursorRingRef} />
      <div className="lp-grid-bg" />

      <div style={{ position: 'fixed', width: 480, height: 480, background: 'radial-gradient(circle,rgba(0,255,135,.07) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      <Link
        to="/"
        style={{ position: 'fixed', top: '1.8rem', left: '2rem', display: 'flex', alignItems: 'center', gap: '.45rem', textDecoration: 'none', color: 'rgba(245,245,245,.35)', fontFamily: "'DM Mono',monospace", fontSize: '.72rem', letterSpacing: '.06em', transition: 'color .2s', zIndex: 10 }}
        onMouseEnter={e => e.currentTarget.style.color = '#f5f5f5'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(245,245,245,.35)'}
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5M12 5l-7 7 7 7"/></svg>
        back
      </Link>

      <div style={{ width: '100%', maxWidth: 400, position: 'relative', zIndex: 1 }}>

        <div className="lg-card" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '.45rem', color: '#f5f5f5', fontWeight: 800, fontSize: '1.3rem', letterSpacing: '-.03em' }}>
            <span className="lg-pulse" style={{ display: 'inline-block', width: 8, height: 8, background: G, borderRadius: '50%' }} />
            Embedsy
          </a>
          <p style={{ marginTop: '.6rem', fontFamily: "'DM Mono',monospace", fontSize: '.72rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(245,245,245,.3)' }}>
            Sign in to your account
          </p>
        </div>

        <div
          className="lg-card"
          style={{ background: '#111111', border: `1px solid ${border}`, borderRadius: 10, padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

            <div className="lg-input-wrap lg-field">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>

            <div className="lg-input-wrap lg-field-2">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>

            {error && (
              <div style={{ background: 'rgba(255,80,80,.07)', border: '1px solid rgba(255,80,80,.2)', borderRadius: 6, padding: '.65rem .9rem', display: 'flex', alignItems: 'center', gap: '.5rem' }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.73rem', color: '#f87171', letterSpacing: '.02em' }}>{error}</span>
              </div>
            )}

            <div className="lg-btn">
              <button type="submit" className="lg-submit" disabled={loading}>
                {loading ? (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '.5rem', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
                    Signing in…
                  </span>
                ) : 'Sign In →'}
              </button>
            </div>

          </form>
        </div>

        <p className="lg-foot" style={{ textAlign: 'center', marginTop: '1.5rem', fontFamily: "'DM Mono',monospace", fontSize: '.72rem', letterSpacing: '.04em', color: 'rgba(245,245,245,.3)' }}>
          No account?{' '}
          <Link
            to="/signup"
            style={{ color: G, textDecoration: 'none', fontWeight: 500 }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}
          >
            Sign up free
          </Link>
        </p>

      </div>

      <style>{`@keyframes spin { to { transform:rotate(360deg) } }`}</style>
    </div>
  );
}