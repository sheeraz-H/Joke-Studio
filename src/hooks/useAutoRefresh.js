import { useEffect, useRef, useCallback } from 'react';

export function useAutoRefresh(enabled, interval, onRefresh) {
  const intervalRef = useRef(null);
  const visibilityRef = useRef(true);
  const lastRefreshRef = useRef(Date.now());

  const startRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    if (!enabled) return;

    intervalRef.current = setInterval(() => {
      // Only refresh if tab is visible
      if (!visibilityRef.current) {
        return;
      }

      // Prevent too frequent refreshes (minimum 5 seconds apart)
      const now = Date.now();
      if (now - lastRefreshRef.current < 5000) {
        return;
      }

      lastRefreshRef.current = now;
      onRefresh();
    }, interval * 1000);
  }, [enabled, interval, onRefresh]);

  const stopRefresh = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleVisibilityChange = useCallback(() => {
    visibilityRef.current = !document.hidden;
    
    // If tab becomes visible and auto-refresh is enabled, 
    // and it's been more than the interval since last refresh
    if (visibilityRef.current && enabled) {
      const now = Date.now();
      if (now - lastRefreshRef.current > interval * 1000) {
        lastRefreshRef.current = now;
        onRefresh();
      }
    }
  }, [enabled, interval, onRefresh]);

  useEffect(() => {
    // Listen for visibility changes
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      stopRefresh();
    };
  }, [handleVisibilityChange, stopRefresh]);

  useEffect(() => {
    if (enabled) {
      startRefresh();
    } else {
      stopRefresh();
    }

    return () => stopRefresh();
  }, [enabled, startRefresh, stopRefresh]);

  // Manual refresh function
  const manualRefresh = useCallback(() => {
    stopRefresh();
    lastRefreshRef.current = Date.now();
    onRefresh();
    if (enabled) {
      startRefresh();
    }
  }, [enabled, onRefresh, startRefresh, stopRefresh]);

  return {
    manualRefresh,
    stopRefresh,
    startRefresh
  };
}