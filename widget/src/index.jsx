import { createRoot } from 'react-dom/client';
import App from './App';

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

if (typeof window !== 'undefined') {
  window.Embedsy = {
    init: initEmbedsy,
    version: '1.0.0'
  };
}

if (import.meta.hot) {
  import.meta.hot.accept();
}

export default initEmbedsy;