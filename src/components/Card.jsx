import React from 'react';

const Card = ({
  children,
  className = '',
  glass = false,
  padding = 'md',
  shadow = 'lg',
  hover = false,
  ...props
}) => {
  const baseClasses = 'rounded-2xl transition-all duration-200';
  
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-5',
    lg: 'p-6',
    xl: 'p-8'
  };
  
  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-xl',
    xl: 'shadow-2xl'
  };
  
  const classes = [
    baseClasses,
    glass ? 'glass border-2 border-white/50 dark:border-slate-700/50' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700',
    paddingClasses[padding],
    shadowClasses[shadow],
    hover ? 'hover:shadow-3xl hover:scale-[1.02] cursor-pointer' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

export default Card;