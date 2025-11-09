import { useState, useCallback, useRef } from 'react';

const API_BASE = 'https://icanhazdadjoke.com';

export function useJokeApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const abortControllerRef = useRef(null);

  const cancelRequest = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const fetchWithRetry = useCallback(async (url, options = {}, retries = 2) => {
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, {
          ...options,
          headers: {
            'Accept': 'application/json',
            ...options.headers
          }
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (err) {
        if (err.name === 'AbortError') {
          throw err; // Don't retry on abort
        }
        
        if (attempt === retries) {
          throw err;
        }
        
        // Exponential backoff
        const delay = Math.pow(2, attempt) * 1000;
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }, []);

  const fetchRandomJoke = useCallback(async () => {
    cancelRequest(); // Cancel any existing request
    
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWithRetry(API_BASE + '/', {
        signal: controller.signal
      });
      return data;
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to fetch joke');
        throw err;
      }
      return null;
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [cancelRequest, fetchWithRetry]);

  const searchJokes = useCallback(async (term, limit = 30) => {
    if (!term.trim()) {
      throw new Error('Search term is required');
    }

    cancelRequest(); // Cancel any existing request
    
    const controller = new AbortController();
    abortControllerRef.current = controller;
    
    setLoading(true);
    setError(null);

    try {
      const data = await fetchWithRetry(
        `${API_BASE}/search?term=${encodeURIComponent(term)}&limit=${limit}`,
        {
          signal: controller.signal
        }
      );
      return data;
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to search jokes');
        throw err;
      }
      return null;
    } finally {
      setLoading(false);
      abortControllerRef.current = null;
    }
  }, [cancelRequest, fetchWithRetry]);

  const getRandomSearchResult = useCallback(async (term) => {
    const searchResults = await searchJokes(term);
    
    if (!searchResults.results || searchResults.results.length === 0) {
      throw new Error('No jokes found for this search term');
    }
    
    // Pick random from results
    const randomIndex = Math.floor(Math.random() * searchResults.results.length);
    return searchResults.results[randomIndex];
  }, [searchJokes]);

  return {
    fetchRandomJoke,
    searchJokes,
    getRandomSearchResult,
    loading,
    error,
    cancelRequest
  };
}