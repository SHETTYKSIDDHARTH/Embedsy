// import React, { useState } from 'react';
// import { useProjects } from '../hooks/useProjects';
// import ProjectList from '../components/dashboard/ProjectList';
// import CreateProject from '../components/dashboard/CreateProject';
// import StatsCard from '../components/dashboard/StatsCard';
// import Button from '../components/common/Button';
// import { ToastContainer, useToast } from '../components/common/Toast';

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

//   return (
//     <>
//       <div className="flex flex-col gap-6 max-w-6xl">
//         {/* Stats */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

//         {/* Header row */}
//         <div className="flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-white">Your Projects</h2>
//           <Button onClick={() => setShowCreate(true)}>
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
//             </svg>
//             New Project
//           </Button>
//         </div>

//         {/* List */}
//         <ProjectList projects={projects} loading={loading} error={error} onDelete={handleDelete} />
//       </div>

//       <CreateProject isOpen={showCreate} onClose={() => setShowCreate(false)} onCreate={handleCreate} />
//       <ToastContainer toasts={toasts} removeToast={removeToast} />
//     </>
//   );
// }

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProjects } from '../hooks/useProjects';
import { ToastContainer, useToast } from '../components/common/Toast';

const dashStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

  .db-page * { box-sizing: border-box; }
  .db-page { font-family: 'Syne', sans-serif; }

  @keyframes db-fadeUp   { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
  @keyframes db-pulse    { 0%,100%{opacity:1} 50%{opacity:.25} }
  @keyframes db-spin     { to{transform:rotate(360deg)} }
  @keyframes db-slideIn  { from{opacity:0;transform:translateX(24px)} to{opacity:1;transform:translateX(0)} }
  @keyframes db-popIn    { from{opacity:0;transform:scale(.92)} to{opacity:1;transform:scale(1)} }

  .db-anim-1 { animation:db-fadeUp .5s .05s both; }
  .db-anim-2 { animation:db-fadeUp .5s .12s both; }
  .db-anim-3 { animation:db-fadeUp .5s .19s both; }
  .db-anim-4 { animation:db-fadeUp .5s .26s both; }

  .db-pulse { animation:db-pulse 2s ease-in-out infinite; }

  /* ── STAT CARDS ── */
  .db-stat-card {
    background:#111111;
    border:1px solid rgba(255,255,255,.07);
    border-radius:10px;
    padding:1.5rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    transition:border-color .25s, transform .2s;
    position:relative;
    overflow:hidden;
  }
  .db-stat-card::before {
    content:'';position:absolute;inset:0;
    background:rgba(0,255,135,.04);
    opacity:0;transition:opacity .25s;
  }
  .db-stat-card:hover::before { opacity:1; }
  .db-stat-card:hover { border-color:rgba(0,255,135,.2);transform:translateY(-2px); }

  .db-stat-icon {
    width:38px;height:38px;border-radius:8px;
    display:flex;align-items:center;justify-content:center;
    flex-shrink:0;
  }

  /* ── PROJECT CARDS ── */
  .db-project-card {
    background:#111111;
    border:1px solid rgba(255,255,255,.07);
    border-radius:10px;
    padding:1.5rem;
    display:flex;
    flex-direction:column;
    gap:1rem;
    transition:border-color .25s, transform .2s;
    cursor:pointer;
    text-decoration:none;
    color:inherit;
  }
  .db-project-card:hover { border-color:rgba(0,255,135,.22);transform:translateY(-2px); }

  /* ── BUTTONS ── */
  .db-btn-primary {
    display:inline-flex;align-items:center;gap:.45rem;
    background:#00FF87;color:#0A0A0A;
    font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700;
    border:none;border-radius:6px;padding:.65rem 1.25rem;
    cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s;
    white-space:nowrap;letter-spacing:.02em;
  }
  .db-btn-primary:hover { background:#00CC6E;transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,255,135,.2); }

  .db-btn-ghost {
    display:inline-flex;align-items:center;gap:.45rem;
    background:transparent;color:rgba(245,245,245,.5);
    font-family:'Syne',sans-serif;font-size:.82rem;font-weight:500;
    border:1px solid rgba(255,255,255,.08);border-radius:6px;padding:.55rem 1rem;
    cursor:pointer;transition:border-color .2s,color .2s,background .2s;
    white-space:nowrap;
  }
  .db-btn-ghost:hover { border-color:rgba(255,255,255,.18);color:#f5f5f5;background:rgba(255,255,255,.03); }

  .db-btn-danger {
    display:inline-flex;align-items:center;gap:.4rem;
    background:transparent;color:rgba(248,113,113,.6);
    font-family:'Syne',sans-serif;font-size:.8rem;font-weight:500;
    border:1px solid rgba(248,113,113,.15);border-radius:6px;padding:.5rem .85rem;
    cursor:pointer;transition:all .2s;white-space:nowrap;
  }
  .db-btn-danger:hover { background:rgba(248,113,113,.08);border-color:rgba(248,113,113,.35);color:#f87171; }

  /* ── MODAL OVERLAY ── */
  .db-overlay {
    position:fixed;inset:0;background:rgba(0,0,0,.7);
    backdrop-filter:blur(6px);z-index:200;
    display:flex;align-items:center;justify-content:center;
    padding:1.5rem;
    opacity:0;pointer-events:none;transition:opacity .2s;
  }
  .db-overlay.open { opacity:1;pointer-events:all; }
  .db-modal {
    background:#111111;border:1px solid rgba(255,255,255,.08);
    border-radius:12px;padding:2rem;
    width:100%;max-width:480px;
    animation:db-popIn .25s both;
  }

  /* ── FORM INPUTS ── */
  .db-label {
    font-family:'DM Mono',monospace;font-size:.7rem;
    letter-spacing:.1em;text-transform:uppercase;
    color:rgba(245,245,245,.4);display:block;margin-bottom:.45rem;
  }
  .db-input {
    width:100%;background:rgba(255,255,255,.03);
    border:1px solid rgba(255,255,255,.07);border-radius:6px;
    padding:.72rem 1rem;font-family:'Syne',sans-serif;font-size:.9rem;
    color:#f5f5f5;outline:none;transition:border-color .2s,background .2s;
  }
  .db-input::placeholder { color:rgba(245,245,245,.2); }
  .db-input:focus { border-color:rgba(0,255,135,.35);background:rgba(0,255,135,.03); }

  /* ── TOAST ── */
  .db-toast-wrap {
    position:fixed;bottom:1.5rem;right:1.5rem;
    display:flex;flex-direction:column;gap:.6rem;z-index:500;
  }
  .db-toast {
    display:flex;align-items:center;gap:.7rem;
    padding:.75rem 1.1rem;border-radius:8px;
    font-family:'DM Mono',monospace;font-size:.75rem;letter-spacing:.03em;
    animation:db-slideIn .3s both;
    min-width:220px;max-width:320px;
  }
  .db-toast.success { background:#0d1f17;border:1px solid rgba(0,255,135,.25);color:#00FF87; }
  .db-toast.info    { background:#111827;border:1px solid rgba(99,179,237,.2);color:#63b3ed; }
  .db-toast.error   { background:#1f0d0d;border:1px solid rgba(248,113,113,.25);color:#f87171; }

  /* ── EMPTY STATE ── */
  .db-empty {
    border:1px dashed rgba(255,255,255,.08);border-radius:10px;
    padding:4rem 2rem;text-align:center;
  }

  /* ── LOADING SPINNER ── */
  .db-spinner {
    width:20px;height:20px;border:2px solid rgba(0,255,135,.2);
    border-top-color:#00FF87;border-radius:50%;
    animation:db-spin .7s linear infinite;
  }

  /* ── BADGE ── */
  .db-badge {
    font-family:'DM Mono',monospace;font-size:.62rem;letter-spacing:.08em;
    padding:.18rem .55rem;border-radius:99px;display:inline-flex;align-items:center;
  }

  /* ── COLOR DOT ── */
  .db-dot {
    width:7px;height:7px;border-radius:50%;display:inline-block;flex-shrink:0;
  }

  /* ── MOBILE RESPONSIVE ── */
  @media (max-width:640px) {
    .db-stats-grid   { grid-template-columns:1fr !important; }
    .db-header-row   { flex-wrap:wrap;gap:.75rem; }
    .db-header-row h2 { font-size:1rem !important; }
    .db-modal        { padding:1.5rem; }
    .db-stat-card    { padding:1.25rem; flex-direction:row; align-items:center; }
    .db-toast-wrap   { left:1rem;right:1rem;bottom:1rem; }
    .db-toast        { max-width:100%; }
  }
  @media (max-width:480px) {
    .db-project-card { padding:1.25rem; }
    .db-project-footer { flex-wrap:wrap; gap:.5rem; }
  }
`;

/* ── helpers ── */
const G      = "#00FF87";
const border = "rgba(255,255,255,.07)";
const W      = "#f5f5f5";

/* ─────────────────────────────────────────
   STAT CARD
───────────────────────────────────────── */
function StatCard({ label, value, iconPath, accentColor, delay = 0 }) {
  const colorMap = {
    green:  { bg: "rgba(0,255,135,.08)",  border: "rgba(0,255,135,.18)",  color: "#00FF87" },
    blue:   { bg: "rgba(96,165,250,.08)", border: "rgba(96,165,250,.18)", color: "#60a5fa" },
    purple: { bg: "rgba(167,139,250,.08)",border: "rgba(167,139,250,.18)",color: "#a78bfa" },
  };
  const accent = colorMap[accentColor] || colorMap.green;

  return (
    <div className="db-stat-card" style={{ animationDelay: delay + "s" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div className="db-stat-icon" style={{ background: accent.bg, border: `1px solid ${accent.border}` }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent.color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={iconPath} />
          </svg>
        </div>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", color: "rgba(245,245,245,.25)", letterSpacing: ".08em" }}>
          ALL TIME
        </span>
      </div>
      <div>
        <div style={{ fontSize: "2rem", fontWeight: 800, letterSpacing: "-.04em", color: W, lineHeight: 1 }}>{value}</div>
        <div style={{ marginTop: ".35rem", fontFamily: "'DM Mono',monospace", fontSize: ".72rem", color: "rgba(245,245,245,.4)", letterSpacing: ".06em", textTransform: "uppercase" }}>{label}</div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   PROJECT CARD
───────────────────────────────────────── */
function ProjectCard({ project, onDelete, projectRoute }) {
  const navigate = useNavigate();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const themeColor = project.theme_color || G;

  const goToProject = () => navigate(projectRoute || `/dashboard/projects/${project.id}`);

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    if (confirmDelete) {
      onDelete(project.id);
    } else {
      setConfirmDelete(true);
      setTimeout(() => setConfirmDelete(false), 3000);
    }
  };

  return (
    <div className="db-project-card" onClick={goToProject} style={{ position: "relative" }}>
      {/* top row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".7rem", minWidth: 0 }}>
          {/* color swatch */}
          <div style={{ width: 36, height: 36, borderRadius: 8, background: themeColor + "18", border: `1px solid ${themeColor}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span className="db-dot" style={{ background: themeColor }} />
          </div>
          <div style={{ minWidth: 0 }}>
            <h3 style={{ fontSize: ".97rem", fontWeight: 700, letterSpacing: "-.02em", color: W, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {project.name}
            </h3>
            <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", color: "rgba(245,245,245,.3)", letterSpacing: ".04em" }}>
              {project.id?.slice(0, 12)}…
            </span>
          </div>
        </div>

        {/* status badge */}
        <span className="db-badge" style={{ background: "rgba(0,255,135,.08)", border: "1px solid rgba(0,255,135,.18)", color: G, flexShrink: 0 }}>
          <span className="db-dot db-pulse" style={{ background: G, marginRight: ".35rem" }} />
          live
        </span>
      </div>

      {/* meta row */}
      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
        {[
          { label: "Chunks",  value: project.chunkCount ?? 0   },
          { label: "Queries", value: project.queryCount ?? "—" },
          { label: "Docs",    value: project.docCount   ?? 0   },
        ].map(({ label, value }) => (
          <div key={label}>
            <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".65rem", color: "rgba(245,245,245,.3)", letterSpacing: ".08em", textTransform: "uppercase", marginBottom: ".15rem" }}>{label}</div>
            <div style={{ fontSize: ".92rem", fontWeight: 700, color: W }}>{value}</div>
          </div>
        ))}
      </div>

      {/* footer */}
      <div className="db-project-footer" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${border}`, paddingTop: ".85rem", marginTop: ".1rem" }}>
        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", color: "rgba(245,245,245,.25)", letterSpacing: ".04em" }}>
          {project.created_at ? new Date(project.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—"}
        </span>
        <div style={{ display: "flex", gap: ".5rem" }}>
          <button
            className="db-btn-ghost"
            style={{ fontSize: ".75rem", padding: ".4rem .75rem" }}
            onClick={(e) => { e.stopPropagation(); goToProject(); }}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4z"/></svg>
            Manage
          </button>
          <button className="db-btn-danger" onClick={handleDeleteClick}>
            {confirmDelete ? (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 9v4m0 4h.01"/><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/></svg>
                Confirm
              </>
            ) : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>
                Delete
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CREATE PROJECT MODAL
───────────────────────────────────────── */
function CreateProjectModal({ isOpen, onClose, onCreate }) {
  const [name, setName]   = useState("");
  const [color, setColor] = useState("#00FF87");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const COLORS = ["#00FF87", "#60a5fa", "#a78bfa", "#f472b6", "#fb923c", "#34d399"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) { setError("Project name is required"); return; }
    setError(""); setLoading(true);
    try {
      await onCreate({ name: name.trim(), theme_color: color });
      setName(""); setColor("#00FF87");
      onClose();
    } catch (err) {
      setError(err.message || "Failed to create project");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className={`db-overlay${isOpen ? " open" : ""}`} onClick={onClose}>
      <div className="db-modal" onClick={e => e.stopPropagation()}>
        {/* header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.75rem" }}>
          <div>
            <h2 style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-.03em", color: W }}>New Project</h2>
            <p style={{ fontFamily: "'DM Mono',monospace", fontSize: ".7rem", color: "rgba(245,245,245,.3)", marginTop: ".25rem", letterSpacing: ".04em" }}>
              Configure your chat widget
            </p>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "rgba(245,245,245,.35)", cursor: "pointer", padding: ".3rem", borderRadius: 4, transition: "color .2s" }}
            onMouseEnter={e => e.currentTarget.style.color = W}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(245,245,245,.35)"}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* name */}
          <div>
            <label className="db-label">Project Name</label>
            <input className="db-input" placeholder="My Support Widget" value={name} onChange={e => setName(e.target.value)} autoFocus />
          </div>

          {/* color */}
          <div>
            <label className="db-label">Theme Color</label>
            <div style={{ display: "flex", gap: ".6rem", alignItems: "center", flexWrap: "wrap" }}>
              {COLORS.map(c => (
                <button key={c} type="button" onClick={() => setColor(c)}
                  style={{ width: 30, height: 30, borderRadius: "50%", background: c, border: color === c ? `2px solid ${W}` : "2px solid transparent", cursor: "pointer", transition: "transform .15s, border-color .15s", transform: color === c ? "scale(1.15)" : "scale(1)", outline: "none" }} />
              ))}
              <input type="color" value={color} onChange={e => setColor(e.target.value)}
                style={{ width: 30, height: 30, border: "none", borderRadius: "50%", cursor: "pointer", background: "none", padding: 0 }}
                title="Custom color" />
            </div>
          </div>

          {/* preview strip */}
          <div style={{ background: "#1A1A1A", border: `1px solid ${border}`, borderRadius: 8, padding: "1rem", display: "flex", alignItems: "center", gap: ".75rem" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, boxShadow: `0 4px 16px ${color}44` }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <div>
              <div style={{ fontSize: ".82rem", fontWeight: 700, color: W }}>{name || "Project Name"}</div>
              <div style={{ fontFamily: "'DM Mono',monospace", fontSize: ".68rem", color: "rgba(245,245,245,.3)" }}>Widget preview</div>
            </div>
            <div style={{ marginLeft: "auto", width: 10, height: 10, borderRadius: "50%", background: color }} className="db-pulse" />
          </div>

          {error && (
            <div style={{ background: "rgba(248,113,113,.07)", border: "1px solid rgba(248,113,113,.2)", borderRadius: 6, padding: ".6rem .9rem", display: "flex", gap: ".5rem", alignItems: "center" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              <span style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", color: "#f87171" }}>{error}</span>
            </div>
          )}

          <div style={{ display: "flex", gap: ".75rem", justifyContent: "flex-end", paddingTop: ".25rem" }}>
            <button type="button" className="db-btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="db-btn-primary" disabled={loading}>
              {loading ? (
                <><span className="db-spinner" style={{ width: 14, height: 14, borderWidth: 2 }} />Creating…</>
              ) : (
                <><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 4v16m8-8H4"/></svg>Create Project</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   TOAST
───────────────────────────────────────── */
function Toast({ message, type = "success", onRemove }) {
  React.useEffect(() => {
    const t = setTimeout(onRemove, 3500);
    return () => clearTimeout(t);
  }, [onRemove]);

  const icons = {
    success: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>,
    info:    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>,
    error:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
  };

  return (
    <div className={`db-toast ${type}`} style={{ cursor: "pointer" }} onClick={onRemove}>
      {icons[type]}
      <span style={{ flex: 1 }}>{message}</span>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: .5 }}><path d="M18 6L6 18M6 6l12 12"/></svg>
    </div>
  );
}

/* ─────────────────────────────────────────
   PROJECT LIST / EMPTY / LOADING
───────────────────────────────────────── */
function ProjectGrid({ projects, loading, error, onDelete }) {
  if (loading) return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "4rem", gap: ".75rem", color: "rgba(245,245,245,.4)", fontFamily: "'DM Mono',monospace", fontSize: ".78rem" }}>
      <span className="db-spinner" />
      Loading projects…
    </div>
  );

  if (error) return (
    <div className="db-empty" style={{ borderColor: "rgba(248,113,113,.15)" }}>
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="1.5" style={{ margin: "0 auto 1rem" }}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
      <p style={{ color: "#f87171", fontFamily: "'DM Mono',monospace", fontSize: ".78rem" }}>{error}</p>
    </div>
  );

  if (!projects.length) return (
    <div className="db-empty">
      <div style={{ width: 52, height: 52, borderRadius: "50%", background: "rgba(0,255,135,.07)", border: "1px solid rgba(0,255,135,.15)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={G} strokeWidth="1.8"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>
      </div>
      <p style={{ fontWeight: 700, fontSize: ".97rem", color: W, marginBottom: ".5rem" }}>No projects yet</p>
      <p style={{ fontFamily: "'DM Mono',monospace", fontSize: ".73rem", color: "rgba(245,245,245,.35)", lineHeight: 1.7 }}>Create your first project to get started.</p>
    </div>
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 340px), 1fr))", gap: "1.25rem" }}>
      {projects.map((p, i) => (
        <div key={p.id} style={{ animation: `db-fadeUp .4s ${i * 0.06}s both` }}>
          <ProjectCard project={p} onDelete={onDelete} projectRoute={`/dashboard/projects/${p.id}`} />
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────── */
export default function Dashboard() {
  const { projects, loading, error, create, remove } = useProjects();
  const [showCreate, setShowCreate] = useState(false);
  const [toasts,     setToasts]     = useState([]);

  const totalChunks = projects.reduce((sum, p) => sum + (p.chunkCount || 0), 0);
  const totalDocs   = projects.reduce((sum, p) => sum + (p.docCount   || 0), 0);

  const addToast = (message, type = "success") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };
  const removeToast = (id) => setToasts(prev => prev.filter(t => t.id !== id));

  const handleCreate = async (payload) => {
    await create(payload);
    addToast("Project created!", "success");
  };

  const handleDelete = async (id) => {
    await remove(id);
    addToast("Project deleted", "info");
  };

  const stats = [
    { label: "Total Projects",   value: projects.length, accentColor: "green",  delay: .05, iconPath: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
    { label: "Document Chunks",  value: totalChunks,     accentColor: "blue",   delay: .12, iconPath: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" },
    { label: "Docs Uploaded",    value: totalDocs,       accentColor: "purple", delay: .19, iconPath: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6" },
  ];

  return (
    <div className="db-page" style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      <style>{dashStyles}</style>

      {/* ── PAGE HEADER ── */}
      <div className="db-anim-1" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: "clamp(1.3rem,3vw,1.7rem)", fontWeight: 800, letterSpacing: "-.04em", color: W, lineHeight: 1.1 }}>Dashboard</h1>
          <p style={{ fontFamily: "'DM Mono',monospace", fontSize: ".72rem", color: "rgba(245,245,245,.35)", marginTop: ".35rem", letterSpacing: ".04em" }}>
            Manage your projects and embedded widgets
          </p>
        </div>
        <button className="db-btn-primary" onClick={() => setShowCreate(true)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 4v16m8-8H4"/></svg>
          New Project
        </button>
      </div>

      {/* ── STATS ── */}
      <div className="db-stats-grid db-anim-2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1rem" }}>
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* ── PROJECTS HEADER ── */}
      <div className="db-header-row db-anim-3" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: ".75rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <h2 style={{ fontSize: "1.05rem", fontWeight: 700, letterSpacing: "-.03em", color: W }}>Your Projects</h2>
          {!loading && (
            <span className="db-badge" style={{ background: "rgba(255,255,255,.05)", border: `1px solid ${border}`, color: "rgba(245,245,245,.4)", fontFamily: "'DM Mono',monospace" }}>
              {projects.length}
            </span>
          )}
        </div>
        {projects.length > 0 && (
          <button className="db-btn-ghost" style={{ fontSize: ".75rem" }}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h7"/></svg>
            Filter
          </button>
        )}
      </div>

      {/* ── PROJECTS GRID ── */}
      <div className="db-anim-4">
        <ProjectGrid projects={projects} loading={loading} error={error} onDelete={handleDelete} />
      </div>

      {/* ── MODALS ── */}
      <CreateProjectModal isOpen={showCreate} onClose={() => setShowCreate(false)} onCreate={handleCreate} />

      {/* ── TOASTS ── */}
      <div className="db-toast-wrap">
        {toasts.map(t => (
          <Toast key={t.id} message={t.message} type={t.type} onRemove={() => removeToast(t.id)} />
        ))}
      </div>
    </div>
  );
}