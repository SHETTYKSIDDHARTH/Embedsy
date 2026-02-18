import React from 'react';

export default function SourceCitation({ sources }) {
  if (!sources || sources.length === 0) return null;
  return (
    <div style={{ fontSize: '11px', color: '#555', marginTop: '4px', padding: '0 4px' }}>
      Based on {sources.length} source{sources.length > 1 ? 's' : ''} from documentation
    </div>
  );
}
