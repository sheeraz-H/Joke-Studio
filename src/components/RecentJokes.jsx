import React from 'react';
import { Clock } from 'lucide-react';
import Card from './Card';

const RecentJokes = ({
  history,
  onSelectJoke
}) => {
  const recentHistory = history.slice().reverse().slice(0, 10);

  if (history.length === 0) {
    return (
      <Card glass padding="md" shadow="xl" className="animate-fadeIn">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-joke-blue" />
          <h2 className="text-lg font-bold">Recent Jokes</h2>
        </div>
        <div className="text-center py-8">
          <Clock className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
          <p className="text-sm text-slate-500">No recent jokes yet.</p>
          <p className="text-xs text-slate-400 mt-2">Start exploring some jokes!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card glass padding="md" shadow="xl" className="animate-fadeIn">
      <div className="flex items-center gap-2 mb-4">
        <Clock className="w-5 h-5 text-joke-blue" />
        <h2 className="text-lg font-bold">Recent Jokes</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-auto pr-2 custom-scrollbar">
        {recentHistory.map((item) => (
          <div
            key={`${item.id}-${item.ts}`}
            className="p-3 rounded-lg bg-white/5 dark:bg-slate-800/20 border border-slate-200 dark:border-slate-700 cursor-pointer hover:bg-white/10 dark:hover:bg-slate-800/30 transition-colors"
            onClick={() => onSelectJoke?.(item)}
          >
            <p className="text-sm leading-relaxed text-slate-800 dark:text-slate-100 line-clamp-3">
              {item.joke}
            </p>
            <p className="text-xs text-slate-400 mt-2">ID: {item.id}</p>
          </div>
        ))}
      </div>
      {history.length > 10 && (
        <p className="text-xs text-slate-400 mt-4 text-center">
          Showing 10 of {history.length} recent jokes
        </p>
      )}
    </Card>
  );
};

export default RecentJokes;