import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

async function fetchProjectConfig(projectId) {
  const res = await fetch(`${API_URL}/projects/${projectId}/widget-config`);
  if (!res.ok) throw new Error('Invalid project');
  return res.json();
}

async function bootstrap() {
  const script =
    document.currentScript ||
    document.querySelector('script[data-project]');

  if (!script) {
    console.error('Embedsy: Could not find script tag with data-project attribute');
    return;
  }

  const projectId = script.getAttribute('data-project');
  const overrideTitle = script.getAttribute('data-title');
  const overridePosition = script.getAttribute('data-position') || 'bottom-right';

  if (!projectId) {
    console.error('Embedsy: data-project attribute is required');
    return;
  }

  let config;
  try {
    config = await fetchProjectConfig(projectId);
  } catch (e) {
    console.error('Embedsy: Failed to load project config', e.message);
    return;
  }

  const containerId = `embedsy-root-${projectId}`;
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    document.body.appendChild(container);
  }

  createRoot(container).render(
    <App
      projectId={projectId}
      apiKey={config.apiKey}
      title={overrideTitle || config.title || 'Ask us anything!'}
      position={overridePosition}
      themeColor={config.themeColor || '#00FF87'}
    />
  );

  console.log('✅ Embedsy initialized for project:', projectId);
}

window.Embedsy = {
  init: ({ projectId, apiKey, title, position = 'bottom-right', themeColor = '#00FF87' }) => {
    let container = document.getElementById('embedsy-widget-root');
    if (!container) {
      container = document.createElement('div');
      container.id = 'embedsy-widget-root';
      document.body.appendChild(container);
    }
    createRoot(container).render(
      <App
        projectId={projectId}
        apiKey={apiKey}
        title={title}
        position={position}
        themeColor={themeColor}
      />
    );
  },
  version: '2.0.0',
};

bootstrap();