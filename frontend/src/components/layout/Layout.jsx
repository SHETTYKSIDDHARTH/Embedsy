// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Navbar from './Navbar';
// import Sidebar from './Sidebar';

// export default function Layout() {
//   return (
//     <div className="flex h-screen bg-dark text-white overflow-hidden">
//       <Sidebar />
//       <div className="flex flex-col flex-1 overflow-hidden">
//         <Navbar />
//         <main className="flex-1 overflow-y-auto p-6">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const layoutStyles = `
  .layout-wrap, .layout-wrap * { box-sizing: border-box; }

  .layout-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.6);
    backdrop-filter: blur(4px);
    z-index: 30;
    animation: overlay-in .2s both;
  }
  @keyframes overlay-in { from{opacity:0} to{opacity:1} }
  .layout-overlay.open { display: block; }

  .layout-hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 6px;
    cursor: pointer;
    padding: .45rem .5rem;
    flex-shrink: 0;
  }
  .layout-hamburger span {
    display: block; width: 18px; height: 1.5px;
    background: rgba(245,245,245,.6);
    border-radius: 2px;
    transition: all .2s;
  }
  .layout-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .layout-hamburger.open span:nth-child(2) { opacity: 0; }
  .layout-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  @media (max-width: 768px) {
    .layout-sidebar {
      position: fixed !important;
      left: -240px !important;
      top: 0 !important;
      bottom: 0 !important;
      z-index: 40 !important;
      transition: left .25s ease !important;
    }
    .layout-sidebar.open {
      left: 0 !important;
      box-shadow: 4px 0 40px rgba(0,0,0,.6) !important;
    }
    .layout-hamburger { display: flex !important; }
    .layout-topbar-title { display: block !important; }
  }
`;

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <style>{layoutStyles}</style>
      <div className="layout-wrap" style={{ display: 'flex', height: '100vh', background: '#0A0A0A', color: '#f5f5f5', overflow: 'hidden' }}>

        {/* Mobile overlay */}
        <div
          className={`layout-overlay${sidebarOpen ? ' open' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div className={`layout-sidebar${sidebarOpen ? ' open' : ''}`} style={{ width: 220, flexShrink: 0 }}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Main content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>

          {/* Top bar (mobile only hamburger) */}
          <header style={{
            height: 52, flexShrink: 0,
            display: 'flex', alignItems: 'center', gap: '1rem',
            padding: '0 1.25rem',
            borderBottom: '1px solid rgba(255,255,255,.06)',
            background: '#0D0D0D',
          }}>
            <button
              className={`layout-hamburger${sidebarOpen ? ' open' : ''}`}
              onClick={() => setSidebarOpen(v => !v)}
              aria-label="Toggle menu"
            >
              <span /><span /><span />
            </button>
            {/* Brand on mobile */}
            <span className="layout-topbar-title" style={{ display: 'none', fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: '1rem', letterSpacing: '-.03em', color: '#f5f5f5' }}>
              Embedsy
            </span>
          </header>

          {/* Page content */}
          <main style={{ flex: 1, overflowY: 'auto', padding: 'clamp(1.25rem,3vw,2rem)' }}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}