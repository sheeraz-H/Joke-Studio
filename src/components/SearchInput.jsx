import React, { useState, useRef, useEffect } from 'react';
import { Search, Zap } from 'lucide-react';
import { useDebounce } from '../hooks/useDebounce';

const SearchInput = ({
  value = '',
  onChange,
  onSearch,
  placeholder = 'Search...',
  debounceMs = 300,
  className = '',
  disabled = false,
  loading = false,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const inputRef = useRef(null);
  const debouncedValue = useDebounce(internalValue, debounceMs);
  
  // Sync external value with internal state
  useEffect(() => {
    setInternalValue(value);
  }, [value]);
  
  // Handle debounced search
  useEffect(() => {
    if (debouncedValue !== value) {
      onChange?.(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);
  
  const handleInputChange = (e) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
  };
  
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch?.(internalValue);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch?.(internalValue);
    inputRef.current?.blur();
  };
  
  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <div className="flex-1 relative">
        <input
          ref={inputRef}
          type="search"
          value={internalValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || loading}
          className={`w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-700 focus:border-joke-purple dark:focus:border-joke-pink focus:outline-none transition-all duration-200 ${className}`}
          {...props}
        />
        <div className="absolute right-3 top-3.5 flex items-center gap-1">
          {loading && (
            <div className="w-4 h-4 border-2 border-joke-purple/30 border-t-joke-purple rounded-full animate-spin" />
          )}
          {!loading && <Zap className="w-5 h-5 text-slate-400" />}
        </div>
      </div>
      <button
        type="submit"
        disabled={disabled || loading || !internalValue.trim()}
        className="btn-primary"
        title="Search jokes"
      >
        <Search className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
      </button>
    </form>
  );
};

export default SearchInput;