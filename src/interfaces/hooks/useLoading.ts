import { useState, useEffect } from 'react';

interface UseLoadingOptions {
  delay?: number;
  minDuration?: number;
}

export function useLoading(isLoading: boolean, options: UseLoadingOptions = {}) {
  const { delay = 0, minDuration = 500 } = options;
  const [showLoading, setShowLoading] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    let delayTimer: NodeJS.Timeout;
    let minDurationTimer: NodeJS.Timeout;

    if (isLoading) {
      // Start loading with optional delay
      if (delay > 0) {
        delayTimer = setTimeout(() => {
          setShowLoading(true);
          setStartTime(Date.now());
        }, delay);
      } else {
        setShowLoading(true);
        setStartTime(Date.now());
      }
    } else {
      // Stop loading with minimum duration
      if (startTime && showLoading) {
        const elapsed = Date.now() - startTime;
        const remaining = Math.max(0, minDuration - elapsed);
        
        if (remaining > 0) {
          minDurationTimer = setTimeout(() => {
            setShowLoading(false);
            setStartTime(null);
          }, remaining);
        } else {
          setShowLoading(false);
          setStartTime(null);
        }
      } else {
        setShowLoading(false);
        setStartTime(null);
      }
    }

    return () => {
      if (delayTimer) clearTimeout(delayTimer);
      if (minDurationTimer) clearTimeout(minDurationTimer);
    };
  }, [isLoading, delay, minDuration, startTime, showLoading]);

  return showLoading;
}

export function useImageLoad(src: string) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!src) return;

    setLoaded(false);
    setError(false);

    const img = new Image();
    
    img.onload = () => {
      setLoaded(true);
      setError(false);
    };
    
    img.onerror = () => {
      setLoaded(false);
      setError(true);
    };
    
    img.src = src;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src]);

  return { loaded, error, isLoading: !loaded && !error };
}