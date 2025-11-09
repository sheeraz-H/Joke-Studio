import React from 'react';

const Loader = ({
  type = 'spinner',
  size = 'md',
  className = '',
  text,
  ...props
}) => {
  if (type === 'spinner') {
    const sizes = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
      xl: 'w-12 h-12'
    };
    
    return (
      <div className={`flex items-center justify-center ${className}`} {...props}>
        <div
          className={`${sizes[size]} border-2 border-joke-purple/30 border-t-joke-purple rounded-full animate-spin`}
          role="status"
          aria-label={text || 'Loading'}
        />
        {text && <span className="ml-2 text-sm text-slate-600 dark:text-slate-400">{text}</span>}
      </div>
    );
  }
  
  if (type === 'skeleton') {
    return (
      <div className={`space-y-3 ${className}`} {...props}>
        <div className="h-4 w-full rounded-lg bg-slate-200 dark:bg-slate-700 animate-shimmer" />
        <div className="h-4 w-5/6 rounded-lg bg-slate-200 dark:bg-slate-700 animate-shimmer" />
        <div className="h-4 w-4/6 rounded-lg bg-slate-200 dark:bg-slate-700 animate-shimmer" />
      </div>
    );
  }
  
  if (type === 'card') {
    return (
      <div className={`glass rounded-3xl p-6 shadow-2xl space-y-4 ${className}`} {...props}>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-shimmer" />
          <div className="h-6 w-32 rounded-lg bg-slate-200 dark:bg-slate-700 animate-shimmer" />
        </div>
        <div className="space-y-3">
          <div className="h-5 w-full rounded-lg bg-slate-200 dark:bg-slate-700 animate-shimmer" />
          <div className="h-5 w-5/6 rounded-lg bg-slate-200 dark:bg-slate-700 animate-shimmer" />
          <div className="h-5 w-4/6 rounded-lg bg-slate-200 dark:bg-slate-700 animate-shimmer" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-24 rounded-lg bg-slate-200 dark:bg-slate-700 animate-shimmer" />
          <div className="h-10 w-20 rounded-lg bg-slate-200 dark:bg-slate-700 animate-shimmer" />
        </div>
      </div>
    );
  }
  
  if (type === 'dots') {
    const sizes = {
      sm: 'w-2 h-2',
      md: 'w-3 h-3',
      lg: 'w-4 h-4'
    };
    
    return (
      <div className={`flex items-center gap-2 ${className}`} {...props}>
        <div className={`${sizes[size]} bg-joke-purple rounded-full animate-bounce`} style={{ animationDelay: '0ms' }} />
        <div className={`${sizes[size]} bg-joke-purple rounded-full animate-bounce`} style={{ animationDelay: '150ms' }} />
        <div className={`${sizes[size]} bg-joke-purple rounded-full animate-bounce`} style={{ animationDelay: '300ms' }} />
      </div>
    );
  }
  
  return null;
};

export default Loader;