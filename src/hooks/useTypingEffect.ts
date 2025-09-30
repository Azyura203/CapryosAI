import { useState, useEffect } from 'react';

export function useTypingEffect(text: string, enabled: boolean = true, speed: number = 30) {
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
    }, speed);

    return () => clearInterval(timer);
  }, [text, enabled, speed]);

  return displayText;
}