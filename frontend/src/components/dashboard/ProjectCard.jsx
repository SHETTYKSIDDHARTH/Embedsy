// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { formatRelativeTime } from '../../utils/formatters';
// import Button from '../common/Button';
// import Modal from '../common/Modal';

// export default function ProjectCard({ project, onDelete }) {
//   const navigate = useNavigate();
//   const [showDelete, setShowDelete] = useState(false);
//   const [deleting, setDeleting] = useState(false);

//   const handleDelete = async () => {
//     setDeleting(true);
//     try {
//       await onDelete(project.id);
//     } finally {
//       setDeleting(false);
//       setShowDelete(false);
//     }
//   };

//   return (
//     <>
//       <div className="bg-dark-200 border border-dark-400 rounded-xl p-5 hover:border-dark-500 transition-colors group">
//         {/* Header */}
//         <div className="flex items-start justify-between gap-3 mb-4">
//           <div
//             className="w-10 h-10 rounded-lg flex items-center justify-center text-black font-bold text-lg shrink-0"
//             style={{ background: project.theme_color || '#00FF87' }}
//           >
//             {project.name?.[0]?.toUpperCase()}
//           </div>
//           <button
//             onClick={() => setShowDelete(true)}
//             className="opacity-0 group-hover:opacity-100 text-gray-600 hover:text-red-400 transition-all"
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                 d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//             </svg>
//           </button>
//         </div>

//         {/* Info */}
//         <h3 className="font-semibold text-white mb-1 truncate">{project.name}</h3>
//         <p className="text-xs text-gray-500 mb-4">
//           {project.chunkCount || 0} chunks · {formatRelativeTime(project.created_at)}
//         </p>

//         {/* Actions */}
//         <div className="flex gap-2">
//           <Button
//             size="sm"
//             variant="secondary"
//             className="flex-1"
//             onClick={() => navigate(`/projects/${project.id}`)}
//           >
//             Manage
//           </Button>
//           <Button
//             size="sm"
//             variant="ghost"
//             onClick={() => navigate(`/projects/${project.id}/embed`)}
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                 d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
//             </svg>
//           </Button>
//         </div>
//       </div>

//       {/* Delete confirm modal */}
//       <Modal
//         isOpen={showDelete}
//         onClose={() => setShowDelete(false)}
//         title="Delete Project"
//         footer={
//           <>
//             <Button variant="ghost" onClick={() => setShowDelete(false)}>Cancel</Button>
//             <Button variant="danger" loading={deleting} onClick={handleDelete}>Delete</Button>
//           </>
//         }
//       >
//         <p className="text-gray-400">
//           Are you sure you want to delete <span className="text-white font-medium">{project.name}</span>?
//           This will permanently remove all uploaded documents and embeddings.
//         </p>
//       </Modal>
//     </>
//   );
// }


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { formatRelativeTime } from '../../utils/formatters';

const cardStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .pc-card, .pc-card * { box-sizing: border-box; }
  .pc-card { font-family: 'Syne', sans-serif; }

  .pc-card {
    background: #111111;
    border: 1px solid rgba(255,255,255,.07);
    border-radius: 8px;
    padding: 1.4rem;
    position: relative;
    overflow: hidden;
    transition: border-color .25s, transform .2s;
    display: flex;
    flex-direction: column;
    gap: 1.1rem;
  }
  .pc-card::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0,255,135,.03);
    opacity: 0;
    transition: opacity .25s;
    pointer-events: none;
  }
  .pc-card:hover::before { opacity: 1; }
  .pc-card:hover { border-color: rgba(0,255,135,.18) !important; transform: translateY(-2px); }

  .pc-manage-btn {
    flex: 1;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: .4rem;
    background: rgba(0,255,135,.08);
    border: 1px solid rgba(0,255,135,.18);
    color: #00FF87;
    font-family: 'Syne', sans-serif;
    font-size: .78rem;
    font-weight: 700;
    padding: .5rem .9rem;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: .02em;
    transition: background .2s, border-color .2s, transform .15s;
    white-space: nowrap;
  }
  .pc-manage-btn:hover {
    background: rgba(0,255,135,.15);
    border-color: rgba(0,255,135,.35);
    transform: translateY(-1px);
  }

  .pc-embed-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255,255,255,.04);
    border: 1px solid rgba(255,255,255,.07);
    color: rgba(245,245,245,.5);
    font-family: 'DM Mono', monospace;
    font-size: .7rem;
    padding: .5rem .75rem;
    border-radius: 4px;
    cursor: pointer;
    letter-spacing: .06em;
    transition: background .2s, border-color .2s, color .2s;
    white-space: nowrap;
    gap: .35rem;
  }
  .pc-embed-btn:hover {
    background: rgba(255,255,255,.08);
    border-color: rgba(255,255,255,.15);
    color: #f5f5f5;
  }

  .pc-delete-btn {
    background: none;
    border: none;
    color: rgba(245,245,245,.2);
    cursor: pointer;
    padding: .25rem;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color .2s, background .2s;
    flex-shrink: 0;
  }
  .pc-delete-btn:hover {
    color: #f87171;
    background: rgba(248,113,113,.1);
  }

  /* confirm overlay */
  .pc-confirm {
    position: absolute;
    inset: 0;
    background: rgba(10,10,10,.95);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    padding: 1.5rem;
    z-index: 10;
  }
  .pc-confirm-del {
    background: rgba(248,113,113,.1);
    border: 1px solid rgba(248,113,113,.25);
    color: #f87171;
    font-family: 'Syne', sans-serif;
    font-size: .8rem;
    font-weight: 700;
    padding: .5rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background .2s;
  }
  .pc-confirm-del:hover { background: rgba(248,113,113,.2); }
  .pc-confirm-cancel {
    background: none;
    border: 1px solid rgba(255,255,255,.1);
    color: rgba(245,245,245,.5);
    font-family: 'Syne', sans-serif;
    font-size: .8rem;
    padding: .5rem 1.2rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background .2s, color .2s;
  }
  .pc-confirm-cancel:hover { background: rgba(255,255,255,.05); color: #f5f5f5; }
`;

export default function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleting, setDeleting]       = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await onDelete(project.id);
    } finally {
      setDeleting(false);
      setShowConfirm(false);
    }
  };

  const G      = '#00FF87';
  const color  = project.theme_color || G;
  const initials = project.name?.[0]?.toUpperCase() || '?';

  return (
    <>
      <style>{cardStyles}</style>

      <div className="pc-card">

        {/* ── DELETE CONFIRM OVERLAY ── */}
        {showConfirm && (
          <div className="pc-confirm">
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: '.9rem', color: '#f5f5f5', marginBottom: '.3rem' }}>
                Delete project?
              </p>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '.68rem', color: 'rgba(245,245,245,.35)', letterSpacing: '.03em', lineHeight: 1.6 }}>
                This removes all documents<br />and embeddings permanently.
              </p>
            </div>
            <div style={{ display: 'flex', gap: '.6rem' }}>
              <button className="pc-confirm-cancel" onClick={() => setShowConfirm(false)}>Cancel</button>
              <button className="pc-confirm-del" onClick={handleDelete} disabled={deleting}>
                {deleting ? 'Deleting…' : 'Delete'}
              </button>
            </div>
          </div>
        )}

        {/* ── HEADER ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '.75rem', minWidth: 0 }}>
            {/* avatar */}
            <div style={{
              width: 36, height: 36, borderRadius: 6, flexShrink: 0,
              background: `${color}18`,
              border: `1px solid ${color}40`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1rem', color,
            }}>
              {initials}
            </div>
            <div style={{ minWidth: 0 }}>
              <h3 style={{ fontWeight: 700, fontSize: '.92rem', letterSpacing: '-.02em', color: '#f5f5f5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {project.name}
              </h3>
              <p style={{ fontFamily: "'DM Mono',monospace", fontSize: '.64rem', color: 'rgba(245,245,245,.3)', letterSpacing: '.04em', marginTop: '.15rem' }}>
                {formatRelativeTime(project.created_at)}
              </p>
            </div>
          </div>

          <button className="pc-delete-btn" onClick={() => setShowConfirm(true)} title="Delete project">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>

        {/* ── META PILLS ── */}
        <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.62rem', letterSpacing: '.08em', padding: '.2rem .6rem', borderRadius: 99, background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.07)', color: 'rgba(245,245,245,.4)' }}>
            {project.chunkCount || 0} chunks
          </span>
          <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '.62rem', letterSpacing: '.08em', padding: '.2rem .6rem', borderRadius: 99, background: 'rgba(0,255,135,.06)', border: '1px solid rgba(0,255,135,.15)', color: G }}>
            ● live
          </span>
        </div>

        {/* ── ACTIONS ── */}
        <div style={{ display: 'flex', gap: '.5rem', marginTop: 'auto' }}>
          <button className="pc-manage-btn" onClick={() => navigate(`/app/projects/${project.id}`)}>
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Manage
          </button>
          <button className="pc-embed-btn" onClick={() => navigate(`/app/projects/${project.id}/embed`)} title="Get embed code">
            <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Embed
          </button>
        </div>

      </div>
    </>
  );
}