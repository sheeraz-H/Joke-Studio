import React from 'react';
import { Smile, Sun, Moon, Timer, Star } from 'lucide-react';
import Button from './Button';
import Switch from './Switch';

const Header = ({
  theme,
  onToggleTheme,
  autoRefresh,
  onAutoRefreshChange,
  favoritesCount,
  onOpenFavorites
}) => {
  const getThemeIcon = () => {
    if (theme === 'dark') return <Moon className="w-5 h-5" />;
    if (theme === 'light') return <Sun className="w-5 h-5" />;
    return <Sun className="w-5 h-5" />;
  };

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 animate-fadeIn">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-joke-purple to-joke-pink flex items-center justify-center shadow-lg animate-float">
          <Smile className="w-7 h-7 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Joke Studio
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Discover, save, and share hilarious dad jokes
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        <label 
          className="flex items-center gap-2 px-3 py-2 rounded-xl glass cursor-pointer hover:scale-105 transition-transform" 
          title="Auto-refresh"
        >
          <Switch
            checked={autoRefresh}
            onChange={onAutoRefreshChange}
          />
          <Timer className="w-5 h-5 text-slate-700 dark:text-slate-300" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
            Auto
          </span>
        </label>

        <Button
          variant="ghost"
          onClick={onToggleTheme}
          title="Toggle theme"
          className="p-2 rounded-xl glass hover:scale-105 transition-transform"
        >
          {getThemeIcon()}
        </Button>

        <Button
          onClick={onOpenFavorites}
          className="bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-lg hover:shadow-xl hover:scale-105 transition-all"
        >
          <Star className="w-5 h-5" />
          <span className="hidden sm:inline">Favorites</span>
          <span className="px-2 py-0.5 rounded-full bg-white/30 text-xs font-bold">
            {favoritesCount}
          </span>
        </Button>
      </div>
    </header>
  );
};

export default Header;