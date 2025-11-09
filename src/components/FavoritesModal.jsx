import React from 'react';
import { Star, Trash2 } from 'lucide-react';
import Modal from './Modal';
import Button from './Button';
import Card from './Card';

const FavoritesModal = ({
  isOpen,
  onClose,
  favorites,
  onRemoveFavorite,
  onClearFavorites,
  onSelectJoke
}) => {
  const favoritesArray = Array.from(favorites.values());

  const handleClearFavorites = () => {
    if (window.confirm('Are you sure you want to clear all favorites?')) {
      onClearFavorites?.();
    }
  };

  const handleSelectJoke = (joke) => {
    onSelectJoke?.(joke);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Your Favorites"
      description="Jokes you've saved for later"
      size="md"
      className="border-none"
    >
      <div className="p-6">
        <div className="grid gap-3 max-h-96 overflow-auto pr-2 custom-scrollbar">
          {favoritesArray.length === 0 ? (
            <div className="text-center py-8">
              <Star className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <p className="text-sm text-slate-500">No favorites yet.</p>
              <p className="text-xs text-slate-400 mt-2">Start saving jokes you love!</p>
            </div>
          ) : (
            favoritesArray.reverse().map((joke) => (
              <Card
                key={joke.id}
                className="p-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                onClick={() => handleSelectJoke(joke)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-100">
                      {joke.joke}
                    </p>
                    <p className="text-xs text-slate-400 mt-2">ID: {joke.id}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveFavorite?.(joke.id);
                      }}
                      className="px-3 py-1 rounded bg-red-50 dark:bg-red-900/20 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/30"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline ml-1">Remove</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
        
        {favoritesArray.length > 0 && (
          <div className="flex items-center justify-end gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <Button
              variant="ghost"
              onClick={handleClearFavorites}
              className="text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </Button>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default FavoritesModal;