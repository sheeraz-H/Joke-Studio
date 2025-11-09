import React from 'react';

const Switch = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'md',
  className = '',
  label,
  ...props
}) => {
  const baseClasses = 'relative inline-flex items-center cursor-pointer transition-colors duration-200 focus-ring rounded-full';
  
  const sizes = {
    sm: 'h-5 w-9',
    md: 'h-6 w-11',
    lg: 'h-7 w-13'
  };
  
  const thumbSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  const thumbPositions = {
    sm: checked ? 'translate-x-4' : 'translate-x-1',
    md: checked ? 'translate-x-5' : 'translate-x-1',
    lg: checked ? 'translate-x-6' : 'translate-x-1'
  };
  
  const classes = [
    baseClasses,
    sizes[size],
    checked ? 'bg-joke-purple' : 'bg-slate-200 dark:bg-slate-700',
    disabled && 'opacity-50 cursor-not-allowed',
    className
  ].filter(Boolean).join(' ');
  
  const thumbClasses = [
    'inline-block bg-white rounded-full transition-transform duration-200 shadow-md',
    thumbSizes[size],
    thumbPositions[size]
  ].join(' ');
  
  const handleToggle = () => {
    if (!disabled) {
      onChange?.(!checked);
    }
  };
  
  return (
    <label className="flex items-center gap-2 cursor-pointer">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={handleToggle}
        className={classes}
        {...props}
      >
        <span className={thumbClasses} />
      </button>
      {label && (
        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
          {label}
        </span>
      )}
    </label>
  );
};

export default Switch;