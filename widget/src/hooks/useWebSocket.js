import { useEffect, useRef, useCallback } from 'react';

export const useWebSocket = (url, { onMessage, onError, onOpen, onClose } = {}) => {
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  const connect = useCallback(() => {
    if (!url) return;

    try {
      const ws = new WebSocket(url);
      wsRef.current = ws;

      ws.onopen = () => {
        if (onOpen) onOpen();
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (onMessage) onMessage(data);
        } catch {
          if (onMessage) onMessage(event.data);
        }
      };

      ws.onerror = (err) => {
        if (onError) onError(err);
      };

      ws.onclose = () => {
        if (onClose) onClose();
      };
    } catch (err) {
      if (onError) onError(err);
    }
  }, [url, onMessage, onError, onOpen, onClose]);

  const send = useCallback((data) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(typeof data === 'string' ? data : JSON.stringify(data));
    }
  }, []);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) clearTimeout(reconnectTimeoutRef.current);
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { send, connect, disconnect };
};