import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

export function useSpeechRecognition() {
  const [isListening, setIsListening] = useState(false);
  const { i18n } = useTranslation();

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window)) {
      console.warn('Speech recognition not supported');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.lang = i18n.language === 'my' ? 'my-MM' : 'en-US';

    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);

    return recognition;
  }, [i18n.language]);

  return { isListening, startListening };
}