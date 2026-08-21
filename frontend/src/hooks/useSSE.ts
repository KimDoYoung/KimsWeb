import { useState, useEffect, useRef } from 'react';

interface SSEOptions {
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  onComplete?: () => void;
}

export const useSSE = (url: string | null, options: SSEOptions = {}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<Event | null>(null);
  const eventSourceRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (!url) return;

    const eventSource = new EventSource(url);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      setIsConnected(true);
      setError(null);
    };

    eventSource.onmessage = (event) => {
      if (event.data === '[DONE]') {
        options.onComplete?.();
        eventSource.close();
        return;
      }
      
      try {
        const data = JSON.parse(event.data);
        options.onMessage?.(data);
      } catch {
        // 일반 텍스트인 경우
        options.onMessage?.(event.data);
      }
    };

    eventSource.onerror = (event) => {
      setError(event);
      setIsConnected(false);
      options.onError?.(event);
      eventSource.close();
    };

    return () => {
      eventSource.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    };
  }, [url]);

  const close = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setIsConnected(false);
    }
  };

  return { isConnected, error, close };
};
