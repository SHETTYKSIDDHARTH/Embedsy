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

  .layout-sidebar-wrap {
    width: 220px;
    flex-shrink: 0;
    position: relative;
  }

  .layout-overlay {
    display: none;
    position: fixed;
    inset: 0;
    background: rgba(0,0,0,.6);
    backdrop-filter: blur(4px);
    z-index: 30;
  }
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
    display: block;
    width: 18px;
    height: 1.5px;
    background: rgba(245,245,245,.6);
    border-radius: 2px;
    transition: all .25s;
  }
  .layout-hamburger.open span:nth-child(1) { transform: translateY(6.5px) rotate(45deg); }
  .layout-hamburger.open span:nth-child(2) { opacity: 0; }
  .layout-hamburger.open span:nth-child(3) { transform: translateY(-6.5px) rotate(-45deg); }

  .layout-mobile-brand { display: none; }

  @media (max-width: 768px) {
    .layout-sidebar-wrap {
      position: fixed !important;
      left: -220px;
      top: 0;
      bottom: 0;
      z-index: 40;
      transition: left .25s ease;
      width: 220px !important;
    }
    .layout-sidebar-wrap.open {
      left: 0;
      box-shadow: 4px 0 40px rgba(0,0,0,.6);
    }
    .layout-hamburger { display: flex !important; }
    .layout-mobile-brand { display: block !important; }
  }
`;

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <style>{layoutStyles}</style>
      <div
        className="layout-wrap"
        style={{
          display: 'flex',
          height: '100vh',
          background: '#0A0A0A',
          color: '#f5f5f5',
          overflow: 'hidden',
        }}
      >
        {/* Mobile backdrop */}
        <div
          className={`layout-overlay${sidebarOpen ? ' open' : ''}`}
          onClick={() => setSidebarOpen(false)}
        />

        {/* Sidebar */}
        <div className={`layout-sidebar-wrap${sidebarOpen ? ' open' : ''}`}>
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </div>

        {/* Right side */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden', minWidth: 0 }}>

          {/* Mobile topbar */}
          <header style={{
            height: 52,
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
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
            <span
              className="layout-mobile-brand"
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: '1rem',
                letterSpacing: '-.03em',
                color: '#f5f5f5',
              }}
            >
              Embedsy
            </span>
          </header>

          {/* Page */}
          <main style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'clamp(1.25rem, 3vw, 2rem)',
          }}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
}