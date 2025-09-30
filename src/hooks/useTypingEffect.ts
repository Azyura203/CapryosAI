/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react';

export function useTypingEffect(text: string, enabled: boolean = true, _p0: number) {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text);
      return;
    }

    setDisplayText('');
    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 30); // Adjust speed as needed

    return () => clearInterval(timer);
  }, [text, enabled]);

  return displayText;
}