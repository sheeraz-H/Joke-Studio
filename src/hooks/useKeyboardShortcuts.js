import { useEffect } from 'react';

export function useKeyboardShortcuts(shortcuts, dependencies = []) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      // Don't trigger shortcuts when typing in inputs, textareas, or contentEditable elements
      const target = event.target;
      if (
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.isContentEditable ||
        target.contentEditable === 'true'
      ) {
        return;
      }

      const key = event.key.toLowerCase();
      const modifiers = {
        ctrl: event.ctrlKey,
        alt: event.altKey,
        shift: event.shiftKey,
        meta: event.metaKey
      };

      // Find matching shortcut
      for (const shortcut of shortcuts) {
        if (typeof shortcut.key !== 'string') continue;
        
        const shortcutKeys = shortcut.key.toLowerCase().split('+');
        const mainKey = shortcutKeys.pop();
        const requiredModifiers = {
          ctrl: shortcutKeys.includes('ctrl'),
          alt: shortcutKeys.includes('alt'),
          shift: shortcutKeys.includes('shift'),
          meta: shortcutKeys.includes('meta')
        };

        // Check if main key matches
        if (mainKey !== key) continue;

        // Check if all required modifiers are present
        const modifiersMatch = Object.keys(requiredModifiers).every(mod => {
          return requiredModifiers[mod] === modifiers[mod];
        });

        if (modifiersMatch) {
          event.preventDefault();
          event.stopPropagation();
          shortcut.callback();
          break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts, ...dependencies]);
}

// Predefined shortcuts for the joke studio
export function useJokeStudioShortcuts(actions) {
  const shortcuts = [
    {
      key: 'n',
      callback: actions.onNextJoke
    },
    {
      key: 'f',
      callback: actions.onToggleFavorite
    },
    {
      key: 's',
      callback: actions.onSpeakJoke
    },
    {
      key: '/',
      callback: actions.onFocusSearch
    },
    {
      key: 'ctrl+k',
      callback: actions.onFocusSearch
    },
    {
      key: 'escape',
      callback: actions.onCloseModal
    }
  ];

  useKeyboardShortcuts(shortcuts, [
    actions.onNextJoke,
    actions.onToggleFavorite,
    actions.onSpeakJoke,
    actions.onFocusSearch,
    actions.onCloseModal
  ]);
}