import { useEffect, useRef } from 'react';

export function useAutoScroll<T extends HTMLElement>(deps: any[]) {
  const scrollRef = useRef<T>(null);

  useEffect(() => {
    const element = scrollRef.current;
    if (element) {
      const scrollToBottom = () => {
        element.scrollTop = element.scrollHeight;
      };
      
      // Scroll immediately
      scrollToBottom();
      
      // Also scroll after a brief delay to handle dynamic content
      const timeoutId = setTimeout(scrollToBottom, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, deps);

  return scrollRef;
}