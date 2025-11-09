import React from 'react';
import { 
  RefreshCw, 
  Star, 
  Copy, 
  Volume2, 
  Download, 
  Twitter, 
  MessageCircle,
  Hash
} from 'lucide-react';
import Button from './Button';
import Card from './Card';
import Loader from './Loader';

const JokeCard = ({
  joke,
  loading,
  isFavorite,
  onGetNextJoke,
  onToggleFavorite,
  onCopy,
  onSpeak,
  onDownload,
  onShareTwitter,
  onShareWhatsApp,
  statusMessage
}) => {
  if (loading) {
    return (
      <Card glass padding="lg" shadow="xl" className="animate-fadeIn">
        <Loader type="card" />
      </Card>
    );
  }

  if (!joke) {
    return (
      <Card glass padding="lg" shadow="xl" className="animate-fadeIn">
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">
            No joke loaded. Click "Next Joke" to get started!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      glass 
      padding="lg" 
      shadow="xl" 
      className="transition-all hover:shadow-3xl animate-fadeIn"
    >
      {/* Joke Content */}
      <div className="flex items-start gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-joke-purple/20 to-joke-pink/20 flex items-center justify-center shrink-0">
          <MessageCircle className="w-6 h-6 text-joke-purple" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-lg sm:text-2xl leading-relaxed font-medium text-slate-800 dark:text-slate-100">
            {joke.joke}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Button 
          onClick={onGetNextJoke}
          icon={<RefreshCw className="w-4 h-4" />}
          loading={loading}
        >
          <span className="hidden sm:inline">Next Joke</span>
        </Button>
        
        <Button 
          variant="secondary"
          onClick={onToggleFavorite}
          icon={<Star className="w-4 h-4" />}
          className={isFavorite ? 'bg-amber-500 text-white border-amber-500' : ''}
        >
          <span className="hidden sm:inline">{isFavorite ? 'Saved' : 'Save'}</span>
        </Button>
        
        <Button 
          variant="icon"
          onClick={onCopy}
          icon={<Copy className="w-4 h-4" />}
          title="Copy to clipboard"
        />
        
        <Button 
          variant="icon"
          onClick={onSpeak}
          icon={<Volume2 className="w-4 h-4" />}
          title="Speak joke"
        />
        
        <Button 
          variant="icon"
          onClick={onDownload}
          icon={<Download className="w-4 h-4" />}
          title="Download as text"
        />
        
        <Button 
          variant="icon"
          onClick={onShareTwitter}
          icon={<Twitter className="w-4 h-4" />}
          title="Share on Twitter"
        />
        
        <Button 
          variant="icon"
          onClick={onShareWhatsApp}
          icon={<MessageCircle className="w-4 h-4" />}
          title="Share on WhatsApp"
        />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between text-sm pt-4 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
          <Hash className="w-3.5 h-3.5" />
          <span>{joke.id}</span>
        </div>
        <span 
          className="flex items-center gap-2 text-slate-500 dark:text-slate-400 italic"
          role="status"
          aria-live="polite"
        >
          {statusMessage}
        </span>
      </div>
    </Card>
  );
};

export default JokeCard;