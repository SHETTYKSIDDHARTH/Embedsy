// import React from 'react';
// import ProjectCard from './ProjectCard';
// import Spinner from '../common/Spinner';

// export default function ProjectList({ projects, loading, error, onDelete }) {
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-20">
//         <Spinner size="lg" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="text-center py-20 text-red-400">
//         <p className="text-lg font-medium">Failed to load projects</p>
//         <p className="text-sm mt-1 text-gray-500">{error}</p>
//       </div>
//     );
//   }

//   if (projects.length === 0) {
//     return (
//       <div className="text-center py-20">
//         <div className="w-16 h-16 rounded-2xl bg-dark-300 border border-dark-500 flex items-center justify-center mx-auto mb-4">
//           <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//               d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
//           </svg>
//         </div>
//         <p className="text-gray-400 font-medium">No projects yet</p>
//         <p className="text-gray-600 text-sm mt-1">Create your first project to get started</p>
//       </div>
//     );
//   }

//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//       {projects.map(project => (
//         <ProjectCard key={project.id} project={project} onDelete={onDelete} />
//       ))}
//     </div>
//   );
// }


import React from 'react';
import ProjectCard from './ProjectCard';

const listStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .pl-wrap, .pl-wrap * { box-sizing: border-box; }
  .pl-wrap { font-family: 'Syne', sans-serif; }

  @keyframes pl-spin { to { transform: rotate(360deg); } }
  @keyframes pl-fadeUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }

  .pl-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1px;
    background: rgba(255,255,255,.06);
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 8px;
    overflow: hidden;
  }

  @media (max-width: 900px) {
    .pl-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (max-width: 560px) {
    .pl-grid { grid-template-columns: 1fr; }
  }

  .pl-grid > * {
    border-radius: 0 !important;
    border: none !important;
    animation: pl-fadeUp .4s both;
  }
  .pl-grid > *:hover {
    border-color: transparent !important;
    z-index: 1;
    outline: 1px solid rgba(0,255,135,.2);
    outline-offset: -1px;
  }
`;

function Loader() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '5rem 2rem', gap: '1rem' }}>
      <div style={{
        width: 32, height: 32,
        border: '2px solid rgba(255,255,255,.08)',
        borderTop: '2px solid #00FF87',
        borderRadius: '50%',
        animation: 'pl-spin 0.8s linear infinite',
      }} />
      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.68rem', letterSpacing: '.1em', color: 'rgba(245,245,245,.25)', textTransform: 'uppercase' }}>
        Loading…
      </span>
    </div>
  );
}

function ErrorState({ error }) {
  return (
    <div style={{ padding: '4rem 2rem', textAlign: 'center', border: '1px solid rgba(248,113,113,.15)', borderRadius: 8, background: 'rgba(248,113,113,.04)' }}>
      <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '.9rem', color: '#f87171', marginBottom: '.4rem' }}>
        Failed to load projects
      </p>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '.7rem', color: 'rgba(245,245,245,.3)', letterSpacing: '.03em' }}>
        {error}
      </p>
    </div>
  );
}

function EmptyState() {
  const G = '#00FF87';
  return (
    <div style={{ padding: '5rem 2rem', textAlign: 'center', border: '1px solid rgba(255,255,255,.07)', borderRadius: 8, background: '#111111', position: 'relative', overflow: 'hidden' }}>
      {/* subtle glow */}
      <div style={{ position: 'absolute', width: 300, height: 200, background: 'radial-gradient(ellipse,rgba(0,255,135,.05) 0%,transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ width: 52, height: 52, border: '1px solid rgba(0,255,135,.2)', background: 'rgba(0,255,135,.06)', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem' }}>
          <svg width="22" height="22" fill="none" stroke={G} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '.95rem', color: '#f5f5f5', marginBottom: '.4rem' }}>
          No projects yet
        </p>
        <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '.7rem', color: 'rgba(245,245,245,.3)', letterSpacing: '.04em', lineHeight: 1.7 }}>
          Create your first project to get started.<br />
          Upload docs, configure your widget, go live.
        </p>
      </div>
    </div>
  );
}

export default function ProjectList({ projects, loading, error, onDelete }) {
  return (
    <>
      <style>{listStyles}</style>
      <div className="pl-wrap">
        {loading  && <Loader />}
        {!loading && error    && <ErrorState error={error} />}
        {!loading && !error && projects.length === 0 && <EmptyState />}
        {!loading && !error && projects.length > 0 && (
          <div className="pl-grid">
            {projects.map((project, i) => (
              <div key={project.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <ProjectCard project={project} onDelete={onDelete} />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}