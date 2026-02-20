import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import ProjectList from '../components/dashboard/ProjectList';
import CreateProject from '../components/dashboard/CreateProject';
import StatsCard from '../components/dashboard/StatsCard';
import Button from '../components/common/Button';
import { ToastContainer, useToast } from '../components/common/Toast';

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

  return (
    <>
      <div className="flex flex-col gap-6 max-w-6xl">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatsCard
            label="Total Projects"
            value={projects.length}
            color="brand"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            }
          />
          <StatsCard
            label="Total Chunks"
            value={totalChunks}
            color="blue"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            }
          />
          <StatsCard
            label="Widgets Deployed"
            value={projects.length}
            color="purple"
            icon={
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8}
                  d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
            }
          />
        </div>

        {/* Header row */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-white">Your Projects</h2>
          <Button onClick={() => setShowCreate(true)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
            New Project
          </Button>
        </div>

        {/* List */}
        <ProjectList projects={projects} loading={loading} error={error} onDelete={handleDelete} />
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