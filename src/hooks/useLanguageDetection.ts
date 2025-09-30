import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export function useLanguageDetection() {
  const { i18n } = useTranslation();

  useEffect(() => {
    // Detect Myanmar language based on system settings
    const detectMyanmar = () => {
      const languages = navigator.languages || [navigator.language];
      return languages.some(lang => 
        lang.toLowerCase().includes('my') || 
        lang.toLowerCase().includes('mya') ||
        lang.toLowerCase().includes('myanmar')
      );
    };

    if (detectMyanmar()) {
      i18n.changeLanguage('my');
    }
  }, [i18n]);

  return { currentLanguage: i18n.language };
}