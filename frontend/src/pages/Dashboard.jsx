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
          width: 220, height: '100%', background: '#0D0D0D',
          borderRight: `1px solid ${border}`,
          display: 'flex', flexDirection: 'column',
        }}
      >
        {/* ── LOGO ── */}
        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.1rem', borderBottom: `1px solid ${border}`, flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.45rem' }}>
            <span className="sb-pulse" style={{ display: 'inline-block', width: 7, height: 7, background: G, borderRadius: '50%' }} />
            <span style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-.03em', color: '#f5f5f5' }}>Embedsy</span>
          </div>
          {/* mobile close button */}
          {onClose && (
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: 'rgba(245,245,245,.3)', cursor: 'pointer', padding: '.25rem', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              aria-label="Close sidebar"
            >
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* ── NAV ── */}
        <nav style={{ flex: 1, padding: '.75rem .65rem', display: 'flex', flexDirection: 'column', gap: '.2rem', overflowY: 'auto' }}>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '.58rem', letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(245,245,245,.2)', padding: '.4rem .75rem', marginBottom: '.15rem' }}>
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

        {/* ── USER FOOTER ── */}
        <div style={{ padding: '.75rem .65rem', borderTop: `1px solid ${border}`, flexShrink: 0 }}>
          {/* user row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', padding: '.5rem .75rem', marginBottom: '.25rem' }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: 'rgba(0,255,135,.12)', border: '1px solid rgba(0,255,135,.2)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <span style={{ fontFamily: "'Syne',sans-serif", fontSize: '.75rem', fontWeight: 800, color: G }}>
                {user?.email?.[0]?.toUpperCase()}
              </span>
            </div>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.67rem', color: 'rgba(245,245,245,.35)', letterSpacing: '.02em', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1 }}>
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



// import React, { useState } from 'react';
// import { useProjects } from '../hooks/useProjects';
// import ProjectList from '../components/dashboard/ProjectList';
// import CreateProject from '../components/dashboard/CreateProject';
// import StatsCard from '../components/dashboard/StatsCard';
// import Button from '../components/common/Button';
// import { ToastContainer, useToast } from '../components/common/Toast';

// const dashStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

//   .db-page * { box-sizing: border-box; }
//   .db-page { font-family: 'Syne', sans-serif; }

//   @keyframes db-fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
//   @keyframes db-pulse  { 0%,100%{opacity:1} 50%{opacity:.25} }

//   .db-anim-1 { animation:db-fadeUp .5s .05s both; }
//   .db-anim-2 { animation:db-fadeUp .5s .12s both; }
//   .db-anim-3 { animation:db-fadeUp .5s .19s both; }
//   .db-anim-4 { animation:db-fadeUp .5s .26s both; }

//   /* Stats grid responsive */
//   .db-stats-grid {
//     display: grid;
//     grid-template-columns: repeat(3, 1fr);
//     gap: 1rem;
//   }
//   @media (max-width: 768px) {
//     .db-stats-grid { grid-template-columns: 1fr; }
//   }
//   @media (min-width: 480px) and (max-width: 768px) {
//     .db-stats-grid { grid-template-columns: repeat(3, 1fr); }
//   }

//   /* Header row */
//   .db-header-row {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     gap: 1rem;
//     flex-wrap: wrap;
//   }
// `;

// export default function Dashboard() {
//   const { projects, loading, error, create, remove } = useProjects();
//   const [showCreate, setShowCreate] = useState(false);
//   const { toasts, addToast, removeToast } = useToast();

//   const totalChunks = projects.reduce((sum, p) => sum + (p.chunkCount || 0), 0);

//   const handleCreate = async (payload) => {
//     await create(payload);
//     addToast('Project created successfully!', 'success');
//   };

//   const handleDelete = async (id) => {
//     await remove(id);
//     addToast('Project deleted', 'info');
//   };

//   const G      = '#00FF87';
//   const W      = '#f5f5f5';
//   const border = 'rgba(255,255,255,.07)';

//   return (
//     <>
//       <style>{dashStyles}</style>

//       <div className="db-page" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>

//         {/* ── PAGE TITLE ── */}
//         <div className="db-anim-1">
//           <h1 style={{ fontSize: 'clamp(1.3rem,3vw,1.7rem)', fontWeight: 800, letterSpacing: '-.04em', color: W, lineHeight: 1.1 }}>
//             Dashboard
//           </h1>
//           <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '.72rem', color: 'rgba(245,245,245,.35)', marginTop: '.35rem', letterSpacing: '.04em' }}>
//             Manage your projects and embedded widgets
//           </p>
//         </div>

//         {/* ── STATS ── */}
//         <div className="db-stats-grid db-anim-2">
//           <StatsCard
//             label="Total Projects"
//             value={projects.length}
//             color="brand"
//             icon={
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
//                   d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//               </svg>
//             }
//           />
//           <StatsCard
//             label="Total Chunks"
//             value={totalChunks}
//             color="blue"
//             icon={
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
//                   d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
//               </svg>
//             }
//           />
//           <StatsCard
//             label="Widgets Deployed"
//             value={projects.length}
//             color="purple"
//             icon={
//               <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
//                   d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//               </svg>
//             }
//           />
//         </div>

//         {/* ── HEADER ROW ── */}
//         <div className="db-header-row db-anim-3">
//           <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
//             <h2 style={{ fontSize: '1.05rem', fontWeight: 700, letterSpacing: '-.03em', color: W }}>
//               Your Projects
//             </h2>
//             {!loading && (
//               <span style={{
//                 fontFamily: "'DM Mono',monospace", fontSize: '.65rem', letterSpacing: '.08em',
//                 padding: '.18rem .6rem', borderRadius: 99,
//                 background: 'rgba(255,255,255,.05)', border: `1px solid ${border}`,
//                 color: 'rgba(245,245,245,.4)'
//               }}>
//                 {projects.length}
//               </span>
//             )}
//           </div>
//           <Button onClick={() => setShowCreate(true)}>
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
//             </svg>
//             New Project
//           </Button>
//         </div>

//         {/* ── PROJECT LIST ── */}
//         <div className="db-anim-4">
//           <ProjectList
//             projects={projects}
//             loading={loading}
//             error={error}
//             onDelete={handleDelete}
//           />
//         </div>

//       </div>

//       <CreateProject
//         isOpen={showCreate}
//         onClose={() => setShowCreate(false)}
//         onCreate={handleCreate}
//       />
//       <ToastContainer toasts={toasts} removeToast={removeToast} />
//     </>
//   );
// }