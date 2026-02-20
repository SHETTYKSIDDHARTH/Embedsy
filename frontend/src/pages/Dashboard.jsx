import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectList from '../components/dashboard/ProjectList';
import CreateProject from '../components/dashboard/CreateProject';
import { ToastContainer, useToast } from '../components/common/Toast';

const dashStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .db-page, .db-page * { box-sizing: border-box; }
  .db-page { font-family: 'Syne', sans-serif; }

  @keyframes db-fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes db-pulse  { 0%,100%{opacity:1} 50%{opacity:.25} }

  .db-anim-1 { animation: db-fadeUp .45s .04s both; }
  .db-anim-2 { animation: db-fadeUp .45s .10s both; }
  .db-anim-3 { animation: db-fadeUp .45s .16s both; }
  .db-anim-4 { animation: db-fadeUp .45s .22s both; }

  .db-pulse { animation: db-pulse 2s ease-in-out infinite; }

  .db-stats-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
  }
  @media (max-width: 640px) {
    .db-stats-grid { grid-template-columns: 1fr; }
  }

  .db-stat-card {
    background: #111111;
    border: 1px solid rgba(255,255,255,.07);
    padding: 1.5rem;
    transition: border-color .25s;
    position: relative;
    overflow: hidden;
  }
  .db-stat-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,255,135,.04);
    opacity: 0;
    transition: opacity .25s;
  }
  .db-stat-card:hover::before { opacity: 1; }
  .db-stat-card:hover { border-color: rgba(0,255,135,.2) !important; }

  .db-new-btn {
    display: inline-flex;
    align-items: center;
    gap: .5rem;
    background: #00FF87;
    color: #0A0A0A;
    font-family: 'Syne', sans-serif;
    font-size: .82rem;
    font-weight: 700;
    padding: .55rem 1.2rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: .02em;
    transition: background .2s, transform .15s, box-shadow .2s;
    white-space: nowrap;
  }
  .db-new-btn:hover {
    background: #00CC6E;
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(0,255,135,.22);
  }

  .db-header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    flex-wrap: wrap;
  }
`;

export default function Dashboard() {
  const { projects, loading, error, create, remove } = useProjects();
  const [showCreate, setShowCreate] = useState(false);
  const { toasts, addToast, removeToast } = useToast();

  const totalChunks = projects.reduce((sum, p) => sum + (p.chunkCount || 0), 0);

  const handleCreate = async (payload) => {
    await create(payload);
    addToast('Project created successfully!', 'success');
  };

  const handleDelete = async (id) => {
    await remove(id);
    addToast('Project deleted', 'info');
  };

  const G      = '#00FF87';
  const border = 'rgba(255,255,255,.07)';

  const stats = [
    {
      label: 'Total Projects',
      value: loading ? '—' : projects.length,
      icon: (
        <svg width="18" height="18" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      label: 'Total Chunks',
      value: loading ? '—' : totalChunks,
      icon: (
        <svg width="18" height="18" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
        </svg>
      ),
    },
    {
      label: 'Widgets Deployed',
      value: loading ? '—' : projects.length,
      icon: (
        <svg width="18" height="18" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
          <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <style>{dashStyles}</style>

      <div className="db-page" style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: 1100 }}>

        {/* PAGE TITLE */}
        <div className="db-anim-1">
          <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', marginBottom: '.5rem' }}>
            <span className="db-pulse" style={{ display: 'inline-block', width: 7, height: 7, background: G, borderRadius: '50%' }} />
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.68rem', letterSpacing: '.12em', textTransform: 'uppercase', color: G }}>Dashboard</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 800, letterSpacing: '-.04em', color: '#f5f5f5', lineHeight: 1.1 }}>
            Your Projects
          </h1>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '.72rem', color: 'rgba(245,245,245,.3)', marginTop: '.4rem', letterSpacing: '.03em' }}>
            Manage widgets, upload documents and embed on any site
          </p>
        </div>

        {/* STATS */}
        <div className="db-anim-2">
          <div className="db-stats-grid" style={{ border: `1px solid ${border}`, borderRadius: 8, overflow: 'hidden' }}>
            {stats.map((s) => (
              <div key={s.label} className="db-stat-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '.6rem', marginBottom: '1rem' }}>
                  <div style={{
                    width: 32, height: 32,
                    background: 'rgba(0,255,135,.07)',
                    border: '1px solid rgba(0,255,135,.15)',
                    borderRadius: 6,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    {s.icon}
                  </div>
                  <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.65rem', letterSpacing: '.1em', textTransform: 'uppercase', color: 'rgba(245,245,245,.35)' }}>
                    {s.label}
                  </span>
                </div>
                <p style={{ fontSize: 'clamp(1.6rem,3vw,2.2rem)', fontWeight: 800, letterSpacing: '-.04em', color: '#f5f5f5', lineHeight: 1 }}>
                  {s.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* HEADER ROW */}
        <div className="db-header-row db-anim-3">
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem' }}>
            <h2 style={{ fontSize: '1rem', fontWeight: 700, letterSpacing: '-.03em', color: '#f5f5f5' }}>
              All Projects
            </h2>
            {!loading && (
              <span style={{
                fontFamily: "'DM Mono',monospace", fontSize: '.62rem', letterSpacing: '.08em',
                padding: '.15rem .55rem', borderRadius: 99,
                background: 'rgba(255,255,255,.05)', border: `1px solid ${border}`,
                color: 'rgba(245,245,245,.35)',
              }}>
                {projects.length}
              </span>
            )}
          </div>
          <button className="db-new-btn" onClick={() => setShowCreate(true)}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </button>
        </div>

        {/* PROJECT LIST */}
        <div className="db-anim-4">
          <ProjectList projects={projects} loading={loading} error={error} onDelete={handleDelete} />
        </div>

      </div>

      <CreateProject isOpen={showCreate} onClose={() => setShowCreate(false)} onCreate={handleCreate} />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
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