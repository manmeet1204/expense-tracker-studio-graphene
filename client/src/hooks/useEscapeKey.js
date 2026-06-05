import { useEffect } from 'react';

export function useEscapeKey(isActive, onClose) {
  useEffect(() => {
    if (!isActive) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isActive, onClose]);
}
