// import React from 'react';
/** @jsxImporrtSource react */
import { formatTime, formatConfidence } from '../utils/formatters';
import SourceCitation from './SourceCitation';

export default function Message({ message }) {
  const { role, content, timestamp, sources, confidence } = message;

  return (
    <div className={`embedsy-message ${role}`}>
      <div className="embedsy-message-bubble">
        {content}
        {confidence && confidence > 0 && (
          <span 
            className="embedsy-confidence-badge"
            style={{ 
              background: `${formatConfidence(confidence).color}25`, 
              color: formatConfidence(confidence).color,
              borderColor: `${formatConfidence(confidence).color}50`
            }}
          >
            {formatConfidence(confidence).text}
          </span>
        )}
      </div>
      {sources && sources.length > 0 && (
        <SourceCitation sources={sources} />
      )}
      <div className="embedsy-message-time">
        {formatTime(timestamp)}
      </div>
    </div>
  );
}