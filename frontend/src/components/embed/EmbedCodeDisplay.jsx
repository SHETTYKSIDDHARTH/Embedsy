import React, { useState } from 'react';
import CodeSnippet from './CodeSnippet';

const TABS = ['React', 'Next.js'];

export default function EmbedCodeDisplay({ project }) {
  const [activeTab, setActiveTab] = useState('React');

  // ── React snippet ─────────────────────────────────────
  const reactInstall = `npm install @embedsy/react`;

  const reactSnippet = `import { EmbedsyWidget } from '@embedsy/react';

export default function App() {
  return (
    <>
      {/* Your app content */}

      <EmbedsyWidget
        projectId="${project.id}"
        apiKey="${project.api_key}"
        title="${project.widget_title || project.name}"
        position="bottom-right"
        themeColor="${project.theme_color || '#00FF87'}"
      />
    </>
  );
}`;

  // ── Next.js snippet ───────────────────────────────────
  const nextInstall = `npm install @embedsy/react`;

  const nextSnippet = `'use client'; // if using App Router

import dynamic from 'next/dynamic';

// Load widget client-side only (no SSR)
const EmbedsyWidget = dynamic(
  () => import('@embedsy/react').then(m => m.EmbedsyWidget),
  { ssr: false }
);

export default function Page() {
  return (
    <>
      {/* Your page content */}

      <EmbedsyWidget
        projectId="${project.id}"
        apiKey="${project.api_key}"
        title="${project.widget_title || project.name}"
        position="bottom-right"
        themeColor="${project.theme_color || '#00FF87'}"
      />
    </>
  );
}`;

  return (
    <div className="flex flex-col gap-5">
      {/* Tab switcher */}
      <div className="flex gap-1 p-1 bg-dark-300 rounded-xl border border-dark-500 w-fit">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab
                ? 'bg-brand text-black'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* React Tab */}
      {activeTab === 'React' && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-2">1. Install the package</p>
            <CodeSnippet code={reactInstall} label="Terminal" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">2. Add to your app</p>
            <CodeSnippet code={reactSnippet} label="JSX" />
          </div>
        </div>
      )}

      {/* Next.js Tab */}
      {activeTab === 'Next.js' && (
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-2">1. Install the package</p>
            <CodeSnippet code={nextInstall} label="Terminal" />
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-2">2. Add to your page (client-side only)</p>
            <CodeSnippet code={nextSnippet} label="JSX" />
          </div>
        </div>
      )}

      {/* Project details */}
      <div className="p-4 bg-brand/5 border border-brand/20 rounded-xl">
        <p className="text-xs font-semibold text-brand mb-2">Project Details</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <span className="text-gray-500">Project ID</span>
          <span className="text-white font-mono truncate">{project.id}</span>
          <span className="text-gray-500">API Key</span>
          <span className="text-white font-mono truncate">{project.api_key}</span>
          <span className="text-gray-500">Theme</span>
          <span className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full" style={{ background: project.theme_color || '#00FF87' }} />
            <span className="text-white font-mono">{project.theme_color || '#00FF87'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}