import React from 'react';
import { Search, Clock } from 'lucide-react';
import Card from './Card';
import SearchInput from './SearchInput';
import Switch from './Switch';

const SearchPanel = ({
  searchValue,
  onSearchChange,
  onSearch,
  loading,
  autoRefresh,
  onAutoRefreshChange,
  refreshInterval,
  onRefreshIntervalChange,
  intervals = [10, 20, 30, 60]
}) => {
  const handleSearch = (term) => {
    if (term.trim()) {
      onSearch?.(term);
    }
  };

  return (
    <Card glass padding="md" shadow="xl" className="animate-fadeIn">
      <div className="flex items-center gap-2 mb-4">
        <Search className="w-5 h-5 text-joke-purple" />
        <h2 className="text-lg font-bold">Search Jokes</h2>
      </div>
      
      <div className="mb-4">
        <SearchInput
          value={searchValue}
          onChange={onSearchChange}
          onSearch={handleSearch}
          placeholder="e.g., chicken, cat, dad"
          loading={loading}
        />
      </div>

      <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 px-3 py-2 rounded-xl glass cursor-pointer hover:scale-105 transition-transform" title="Auto-refresh">
            <Switch
              checked={autoRefresh}
              onChange={onAutoRefreshChange}
            />
            <Clock className="w-5 h-5 text-slate-700 dark:text-slate-300" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Auto
            </span>
          </label>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600 dark:text-slate-400 flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Refresh interval
          </span>
          <select
            value={refreshInterval}
            onChange={(e) => onRefreshIntervalChange(Number(e.target.value))}
            className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-sm font-medium cursor-pointer focus:outline-none focus:ring-2 focus:ring-joke-purple"
          >
            {intervals.map(interval => (
              <option key={interval} value={interval}>
                {interval < 60 ? `${interval}s` : '1min'}
              </option>
            ))}
          </select>
        </div>
      </div>
    </Card>
  );
};

export default SearchPanel;