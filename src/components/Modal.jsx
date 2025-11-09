import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Modal = ({
  isOpen = false,
  onClose,
  title,
  description,
  children,
  size = 'md',
  className = '',
  showClose = true,
  closeOnBackdrop = true,
  closeOnEscape = true,
  ...props
}) => {
  const modalRef = useRef(null);
  const previousFocusRef = useRef(null);
  
  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-3xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  };
  
  useEffect(() => {
    if (isOpen) {
      // Store previous focus
      previousFocusRef.current = document.activeElement;
      
      // Focus modal
      modalRef.current?.focus();
      
      // Prevent body scroll
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      document.body.style.overflow = '';
      
      // Restore focus
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && closeOnEscape && isOpen) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeOnEscape, onClose]);
  
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && closeOnBackdrop) {
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      
      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full ${sizes[size]} bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl animate-fadeIn ${className}`}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        {...props}
      >
        {/* Header */}
        {(title || showClose) && (
          <header className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20">
            <div className="flex items-center gap-3">
              {title && (
                <div>
                  <h3 id="modal-title" className="text-xl font-bold">{title}</h3>
                  {description && (
                    <p id="modal-description" className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                      {description}
                    </p>
                  )}
                </div>
              )}
            </div>
            {showClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus-ring"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </header>
        )}
        
        {/* Content */}
        <div className="max-h-[70vh] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;