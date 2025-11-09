import React from 'react';
import { History, BookOpen, Trash2 } from 'lucide-react';
import Card from './Card';
import Button from './Button';

const HistoryPanel = ({
  history,
  onClearHistory
}) => {
  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear all history?')) {
      onClearHistory?.();
    }
  };

  return (
    <Card glass padding="md" shadow="xl" className="animate-fadeIn">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-joke-blue" />
          <h2 className="text-lg font-bold">History</h2>
        </div>
        <Button
          variant="ghost"
          onClick={handleClearHistory}
          disabled={history.length === 0}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Clear</span>
        </Button>
      </div>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1">
          <p className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-joke-purple to-joke-pink">
            {history.length}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-400">Recent jokes</p>
        </div>
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-joke-purple/10 to-joke-pink/10 flex items-center justify-center">
          <BookOpen className="w-8 h-8 text-joke-purple" />
        </div>
      </div>
    </Card>
  );
};

export default HistoryPanel;