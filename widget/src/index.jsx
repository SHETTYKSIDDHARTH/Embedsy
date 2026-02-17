import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

function injectStyles() {
  // CSS is injected inline via the build — this handles dev mode fallback
  if (document.getElementById('embedsy-styles')) return;
  const link = document.createElement('link');
  link.id = 'embedsy-styles';
  link.rel = 'stylesheet';
  // In production, style is inlined by Vite build plugin below
  document.head.appendChild(link);
}

function initEmbedsy(config) {
  const { projectId, apiKey, title, position, containerId } = config;

  if (!projectId) {
    console.error('Embedsy Error: projectId is required');
    return;
  }

  if (!apiKey) {
    console.error('Embedsy Error: apiKey is required');
    return;
  }

  let container = document.getElementById(containerId || 'embedsy-widget-root');

  if (!container) {
    container = document.createElement('div');
    container.id = containerId || 'embedsy-widget-root';
    document.body.appendChild(container);
  }

  const root = createRoot(container);

  root.render(
    <App
      projectId={projectId}
      apiKey={apiKey}
      title={title}
      position={position}
    />
  );

  console.log('✅ Embedsy widget initialized successfully');
  console.log('Project ID:', projectId);
}

window.Embedsy = {
  init: initEmbedsy,
  version: '1.0.0',
};