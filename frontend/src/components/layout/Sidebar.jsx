// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';

// const navItems = [
//   {
//     to: '/dashboard',
//     label: 'Dashboard',
//     icon: (
//       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
//           d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//       </svg>
//     ),
//   },
// ];

// export default function Sidebar() {
//   const { user, signOut } = useAuth();
//   const navigate = useNavigate();

//   const handleSignOut = async () => {
//     await signOut();
//     navigate('/login');
//   };

//   return (
//     <aside className="w-56 bg-dark-100 border-r border-dark-300 flex flex-col shrink-0">
//       {/* Logo */}
//       <div className="h-14 flex items-center px-5 border-b border-dark-300">
//         <span className="text-xl font-bold text-brand tracking-tight">Embedsy</span>
//       </div>

//       {/* Nav */}
//       <nav className="flex-1 p-3 flex flex-col gap-1">
//         {navItems.map(item => (
//           <NavLink
//             key={item.to}
//             to={item.to}
//             className={({ isActive }) =>
//               `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors
//               ${isActive
//                 ? 'bg-brand/10 text-brand border border-brand/20'
//                 : 'text-gray-400 hover:text-white hover:bg-dark-300'
//               }`
//             }
//           >
//             {item.icon}
//             {item.label}
//           </NavLink>
//         ))}
//       </nav>

//       {/* User + logout */}
//       <div className="p-3 border-t border-dark-300">
//         <div className="flex items-center gap-2 px-2 py-2 mb-1">
//           <div className="w-7 h-7 rounded-full bg-brand/20 border border-brand/30 flex items-center justify-center shrink-0">
//             <span className="text-xs font-bold text-brand">
//               {user?.email?.[0]?.toUpperCase()}
//             </span>
//           </div>
//           <span className="text-xs text-gray-400 truncate">{user?.email}</span>
//         </div>
//         <button
//           onClick={handleSignOut}
//           className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-500 hover:text-red-400 hover:bg-red-400/10 transition-colors"
//         >
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//               d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//           </svg>
//           Sign out
//         </button>
//       </div>
//     </aside>
//   );
// }
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const sidebarStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .sb-wrap, .sb-wrap * { box-sizing: border-box; }
  .sb-wrap { font-family: 'Syne', sans-serif; }

  @keyframes sb-pulse { 0%,100%{opacity:1} 50%{opacity:.25} }
  .sb-pulse { animation: sb-pulse 2s ease-in-out infinite; }

  .sb-nav-link {
    display: flex;
    align-items: center;
    gap: .65rem;
    padding: .55rem .75rem;
    border-radius: 5px;
    font-size: .82rem;
    font-weight: 600;
    letter-spacing: -.01em;
    color: rgba(245,245,245,.4);
    text-decoration: none;
    transition: color .2s, background .2s;
    border: 1px solid transparent;
  }
  .sb-nav-link:hover {
    color: rgba(245,245,245,.8);
    background: rgba(255,255,255,.04);
  }
  .sb-nav-link.active {
    color: #00FF87;
    background: rgba(0,255,135,.07);
    border-color: rgba(0,255,135,.15);
  }

  .sb-signout {
    display: flex;
    align-items: center;
    gap: .6rem;
    padding: .5rem .75rem;
    border-radius: 5px;
    background: none;
    border: none;
    width: 100%;
    font-family: 'Syne', sans-serif;
    font-size: .8rem;
    font-weight: 500;
    color: rgba(245,245,245,.3);
    cursor: pointer;
    transition: color .2s, background .2s;
    text-align: left;
  }
  .sb-signout:hover {
    color: #f87171;
    background: rgba(248,113,113,.07);
  }
`;

const navItems = [
  {
    to: '/app/dashboard',
    label: 'Dashboard',
    icon: (
      <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
];

export default function Sidebar({ onClose }) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  const G = '#00FF87';
  const border = 'rgba(255,255,255,.06)';

  return (
    <>
      <style>{sidebarStyles}</style>
      <aside
        className="sb-wrap"
        style={{
          width: 220,
          height: '100%',
          background: '#0D0D0D',
          borderRight: `1px solid ${border}`,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* LOGO */}
        <div style={{
          height: 52,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 1.1rem',
          borderBottom: `1px solid ${border}`,
          flexShrink: 0,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem' }}>
            <span className="sb-pulse" style={{ display: 'inline-block', width: 7, height: 7, background: G, borderRadius: '50%' }} />
            <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-.03em', color: '#f5f5f5' }}>
              Embedsy
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                color: 'rgba(245,245,245,.3)',
                cursor: 'pointer',
                padding: '.25rem',
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label="Close sidebar"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* NAV */}
        <nav style={{
          flex: 1,
          padding: '.75rem .65rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '.2rem',
          overflowY: 'auto',
        }}>
          <p style={{
            fontFamily: "'DM Mono',monospace",
            fontSize: '.58rem',
            letterSpacing: '.12em',
            textTransform: 'uppercase',
            color: 'rgba(245,245,245,.2)',
            padding: '.4rem .75rem',
            marginBottom: '.15rem',
          }}>
            Main
          </p>
          {navItems.map(item => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => `sb-nav-link${isActive ? ' active' : ''}`}
              onClick={onClose}
            >
              {item.icon}
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* USER FOOTER */}
        <div style={{ padding: '.75rem .65rem', borderTop: `1px solid ${border}`, flexShrink: 0 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '.6rem',
            padding: '.5rem .75rem',
            marginBottom: '.25rem',
          }}>
            <div style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'rgba(0,255,135,.12)',
              border: '1px solid rgba(0,255,135,.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              <span style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: '.75rem',
                fontWeight: 800,
                color: G,
              }}>
                {user?.email?.[0]?.toUpperCase()}
              </span>
            </div>
            <span style={{
              fontFamily: "'DM Mono',monospace",
              fontSize: '.67rem',
              color: 'rgba(245,245,245,.35)',
              letterSpacing: '.02em',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              flex: 1,
            }}>
              {user?.email}
            </span>
          </div>

          <button className="sb-signout" onClick={handleSignOut}>
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" viewBox="0 0 24 24">
              <path d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}