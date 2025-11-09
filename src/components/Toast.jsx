import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({
  message,
  type = 'success',
  duration = 3000,
  onClose,
  className = '',
  showClose = true,
  position = 'bottom-right',
  ...props
}) => {
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);
  
  const icons = {
    success: CheckCircle,
    error: XCircle,
    warning: AlertCircle,
    info: Info
  };
  
  const colors = {
    success: 'text-green-500',
    error: 'text-red-500',
    warning: 'text-amber-500',
    info: 'text-blue-500'
  };
  
  const positions = {
    'top-left': 'top-6 left-6',
    'top-center': 'top-6 left-1/2 -translate-x-1/2',
    'top-right': 'top-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'bottom-center': 'bottom-6 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-6 right-6'
  };
  
  const Icon = icons[type];
  const iconColor = colors[type];
  const positionClass = positions[position];
  
  useEffect(() => {
    // Trigger enter animation
    setVisible(true);
    
    // Auto-dismiss after duration
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  const handleClose = () => {
    setExiting(true);
    setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 300);
  };
  
  const classes = [
    'fixed glass shadow-2xl rounded-2xl p-4 min-w-[300px] max-w-md transform transition-all duration-300 flex items-center gap-3 z-50',
    positionClass,
    visible && !exiting ? 'show-toast' : 'hide-toast',
    className
  ].filter(Boolean).join(' ');
  
  if (!visible) return null;
  
  return (
    <div className={classes} {...props}>
      <Icon className={`w-5 h-5 flex-shrink-0 ${iconColor}`} />
      <span className="font-medium flex-1">{message}</span>
      {showClose && (
        <button
          onClick={handleClose}
          className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Close toast"
        >
          <X className="w-4 h-4 text-slate-500" />
        </button>
      )}
    </div>
  );
};

export default Toast;