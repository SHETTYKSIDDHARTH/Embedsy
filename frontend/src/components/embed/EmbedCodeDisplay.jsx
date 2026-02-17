import React from 'react';
import CodeSnippet from './CodeSnippet';

export default function EmbedCodeDisplay({ project }) {
  const widgetUrl = `${window.location.origin}/widget.js`;

  const scriptTag = `<script
  src="${widgetUrl}"
  data-project="${project.id}"
  data-title="${project.widget_title || project.name}"
  data-position="bottom-right"
  async>
</script>`;

  const manualInit = `<!-- Manual initialization (alternative) -->
<div id="embedsy-widget-root"></div>
<script src="${widgetUrl}"></script>
<script>
  window.Embedsy.init({
    projectId: "${project.id}",
    apiKey: "${project.api_key}",
    title: "${project.widget_title || project.name}",
    position: "bottom-right",
    themeColor: "${project.theme_color || '#00FF87'}"
  });
</script>`;

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">Quick Embed</h3>
        <p className="text-xs text-gray-500 mb-3">
          Add this single script tag to your website's <code className="text-brand">&lt;body&gt;</code>
        </p>
        <CodeSnippet code={scriptTag} label="HTML" />
      </div>

      <div>
        <h3 className="text-sm font-semibold text-white mb-1">Manual Init</h3>
        <p className="text-xs text-gray-500 mb-3">For more control over when the widget loads</p>
        <CodeSnippet code={manualInit} label="HTML" />
      </div>

      <div className="p-4 bg-brand/5 border border-brand/20 rounded-xl">
        <p className="text-xs font-semibold text-brand mb-2">Project Details</p>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <span className="text-gray-500">Project ID</span>
          <span className="text-white font-mono">{project.id}</span>
          <span className="text-gray-500">API Key</span>
          <span className="text-white font-mono truncate">{project.api_key}</span>
          <span className="text-gray-500">Theme</span>
          <span className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ background: project.theme_color || '#00FF87' }}
            />
            <span className="text-white font-mono">{project.theme_color || '#00FF87'}</span>
          </span>
        </div>
      </div>
    </div>
  );
}