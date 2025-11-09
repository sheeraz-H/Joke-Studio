import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import JokeCard from './components/JokeCard';
import SearchPanel from './components/SearchPanel';
import HistoryPanel from './components/HistoryPanel';
import RecentJokes from './components/RecentJokes';
import FavoritesModal from './components/FavoritesModal';
import Toast from './components/Toast';
import Confetti from './components/Confetti';
import { useJokeApi } from './hooks/useJokeApi';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { useAutoRefresh } from './hooks/useAutoRefresh';
import { useJokeStudioShortcuts } from './hooks/useKeyboardShortcuts';

function App() {
  // API Hook
  const { fetchRandomJoke, getRandomSearchResult, loading, error } = useJokeApi();
  
  // Theme Hook
  const { theme, toggleTheme } = useTheme();
  
  // Local State
  const [currentJoke, setCurrentJoke] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  
  // Local Storage
  const [favorites, setFavorites] = useLocalStorage('jokestudio_favs_v1', new Map());
  const [history, setHistory] = useLocalStorage('jokestudio_history_v1', []);
  const [settings, setSettings] = useLocalStorage('jokestudio_settings_v1', {
    autoRefresh: false,
    refreshInterval: 20
  });
  
  // Refs
  const searchInputRef = useRef(null);
  
  // Toast helper
  const showToast = useCallback((message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  }, []);
  
  // Status message helper
  const showStatus = useCallback((message, timeout = 2500) => {
    setStatusMessage(message);
    if (timeout > 0) {
      setTimeout(() => setStatusMessage(''), timeout);
    }
  }, []);
  
  // Add to history
  const addToHistory = useCallback((joke) => {
    setHistory(prev => {
      const newHistory = [
        { id: joke.id, joke: joke.joke, ts: Date.now() },
        ...prev
      ].slice(0, 100); // Keep last 100
      
      return newHistory;
    });
  }, [setHistory]);
  
  // Load random joke
  const loadRandomJoke = useCallback(async () => {
    try {
      const joke = await fetchRandomJoke();
      if (joke) {
        setCurrentJoke(joke);
        addToHistory(joke);
        showStatus('Random joke loaded');
      }
    } catch {
      showToast('Could not fetch joke', 'error');
      showStatus('Failed to load joke');
    }
  }, [fetchRandomJoke, addToHistory, showToast, showStatus]);
  
  // Search jokes
  const handleSearch = useCallback(async (term) => {
    if (!term.trim()) {
      showToast('Enter a search term', 'warning');
      return;
    }
    
    try {
      const joke = await getRandomSearchResult(term);
      if (joke) {
        setCurrentJoke(joke);
        addToHistory(joke);
        showStatus(`Found joke for "${term}"`);
      }
    } catch {
      showToast('No jokes matched your search', 'warning');
      showStatus('No jokes found');
    }
  }, [getRandomSearchResult, addToHistory, showToast, showStatus]);
  
  // Toggle favorite
  const toggleFavorite = useCallback(() => {
    if (!currentJoke) return;
    
    setFavorites(prev => {
      const newFavorites = new Map(prev);
      if (newFavorites.has(currentJoke.id)) {
        newFavorites.delete(currentJoke.id);
        showToast('Removed from favorites');
      } else {
        newFavorites.set(currentJoke.id, currentJoke);
        showToast('Saved to favorites');
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 100);
      }
      return newFavorites;
    });
  }, [currentJoke, setFavorites, showToast]);
  
  // Check if current joke is favorite
  const isCurrentFavorite = currentJoke ? favorites.has(currentJoke.id) : false;
  
  // Copy joke
  const copyJoke = useCallback(async () => {
    if (!currentJoke) return;
    
    try {
      await navigator.clipboard.writeText(currentJoke.joke);
      showToast('Copied to clipboard');
    } catch {
      showToast('Copy failed', 'error');
    }
  }, [currentJoke, showToast]);
  
  // Speak joke
  const speakJoke = useCallback(() => {
    if (!currentJoke) return;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(currentJoke.joke);
      utterance.lang = 'en-US';
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
      showToast('Speaking joke');
    } else {
      showToast('Speech not supported', 'warning');
    }
  }, [currentJoke, showToast]);
  
  // Download joke
  const downloadJoke = useCallback(() => {
    if (!currentJoke) return;
    
    const blob = new Blob([currentJoke.joke], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `joke-${currentJoke.id}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast('Download started');
  }, [currentJoke, showToast]);
  
  // Share on Twitter
  const shareTwitter = useCallback(() => {
    if (!currentJoke) return;
    
    const text = `${currentJoke.joke} — via Joke Studio`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }, [currentJoke]);
  
  // Share on WhatsApp
  const shareWhatsApp = useCallback(() => {
    if (!currentJoke) return;
    
    const text = `${currentJoke.joke} — via Joke Studio`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }, [currentJoke]);
  
  // Clear history
  const clearHistory = useCallback(() => {
    setHistory([]);
    showToast('History cleared');
  }, [setHistory, showToast]);
  
  // Clear favorites
  const clearFavorites = useCallback(() => {
    setFavorites(new Map());
    showToast('Favorites cleared');
  }, [setFavorites, showToast]);
  
  // Remove from favorites
  const removeFavorite = useCallback((jokeId) => {
    setFavorites(prev => {
      const newFavorites = new Map(prev);
      newFavorites.delete(jokeId);
      return newFavorites;
    });
    showToast('Removed from favorites');
  }, [setFavorites, showToast]);
  
  // Select joke from history/favorites
  const selectJoke = useCallback((joke) => {
    setCurrentJoke(joke);
    showStatus('Joke selected');
  }, [showStatus]);
  
  // Auto refresh
  useAutoRefresh(
    settings.autoRefresh,
    settings.refreshInterval,
    loadRandomJoke
  );
  
  // Toggle auto refresh
  const toggleAutoRefresh = useCallback((enabled) => {
    setSettings(prev => ({ ...prev, autoRefresh: enabled }));
  }, [setSettings]);
  
  // Update refresh interval
  const updateRefreshInterval = useCallback((interval) => {
    setSettings(prev => ({ ...prev, refreshInterval: interval }));
  }, [setSettings]);
  
  // Keyboard shortcuts
  const searchInput = searchInputRef.current;
  useJokeStudioShortcuts({
    onNextJoke: loadRandomJoke,
    onToggleFavorite: toggleFavorite,
    onSpeakJoke: speakJoke,
    onFocusSearch: () => searchInput?.focus(),
    onCloseModal: () => setShowFavoritesModal(false)
  });
  
  // Initialize
  useEffect(() => {
    loadRandomJoke();
  }, []);
  
  // Handle errors
  useEffect(() => {
    if (error) {
      showToast(error, 'error');
    }
  }, [error, showToast]);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-300">
      {/* Confetti */}
      <Confetti trigger={showConfetti} />
      
      {/* Toast */}
      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(prev => ({ ...prev, show: false }))}
        />
      )}
      
      <main className="relative max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <Header
          theme={theme}
          onToggleTheme={toggleTheme}
          autoRefresh={settings.autoRefresh}
          onAutoRefreshChange={toggleAutoRefresh}
          favoritesCount={favorites.size}
          onOpenFavorites={() => setShowFavoritesModal(true)}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-4">
            <SearchPanel
              searchValue={searchTerm}
              onSearchChange={setSearchTerm}
              onSearch={handleSearch}
              loading={loading}
              autoRefresh={settings.autoRefresh}
              onAutoRefreshChange={toggleAutoRefresh}
              refreshInterval={settings.refreshInterval}
              onRefreshIntervalChange={updateRefreshInterval}
            />
            
            <HistoryPanel
              history={history}
              onClearHistory={clearHistory}
            />
          </aside>
          
          {/* Main Content */}
          <section className="lg:col-span-8 space-y-6">
            <JokeCard
              joke={currentJoke}
              loading={loading}
              isFavorite={isCurrentFavorite}
              onGetNextJoke={loadRandomJoke}
              onToggleFavorite={toggleFavorite}
              onCopy={copyJoke}
              onSpeak={speakJoke}
              onDownload={downloadJoke}
              onShareTwitter={shareTwitter}
              onShareWhatsApp={shareWhatsApp}
              statusMessage={statusMessage}
            />
            
            <RecentJokes
              history={history}
              onSelectJoke={selectJoke}
            />
          </section>
        </div>
      </main>
      
      {/* Favorites Modal */}
      <FavoritesModal
        isOpen={showFavoritesModal}
        onClose={() => setShowFavoritesModal(false)}
        favorites={favorites}
        onRemoveFavorite={removeFavorite}
        onClearFavorites={clearFavorites}
        onSelectJoke={selectJoke}
      />
    </div>
  );
}

export default App;