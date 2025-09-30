import { translateToBurmese } from "../services/openaiTranslation";

const sanitizeTTS = (text: string) => {
  return text
    .replace(/Live Caption/gi, '')
    .replace(/Contact information/gi, '')
    .replace(/\*/g, '')
    .replace(/\+?\d{8,}/g, (match) => {
      return match
        .replace(/\+/g, '+ ')
        .split('')
        .map(char => (char === ' ' ? '' : char))
        .join(' ');
    })
    .replace(/\s+/g, ' ')
    .trim();
};

export const textToSpeech = async (text: string, language: string) => {
  let translatedText = sanitizeTTS(text);

  // Translate text to Burmese if needed
  if (language === 'my') {
    translatedText = await translateToBurmese(text);
  }

  return new Promise<void>((resolve) => {
    // Wait for voices to be loaded
    const voicesLoaded = () => {
      const voices = window.speechSynthesis.getVoices();
      const utterance = new SpeechSynthesisUtterance(translatedText);

      // Set language code
      switch (language) {
        case 'my':
          utterance.lang = 'my-MM'; // Burmese
          break;
        case 'zh':
          utterance.lang = 'zh-CN'; // Chinese
          break;
        case 'ja':
          utterance.lang = 'ja-JP'; // Japanese
          break;
        case 'ko':
          utterance.lang = 'ko-KR'; // Korean
          break;
        default:
          utterance.lang = 'en-US'; // English
      }

      // Find the best available voice for the language
      const preferredVoices: Record<string, string[]> = {
        'en-US': ['Microsoft David', 'Google US English'],
        'zh-CN': ['Microsoft Huihui', 'Google 普通话'],
        'ja-JP': ['Microsoft Haruka', 'Google 日本語'],
        'ko-KR': ['Microsoft Heami', 'Google 한국의'],
        'my-MM': [] // Burmese voices may not be available
      };

      const voiceOptions = preferredVoices[utterance.lang] || [];
      const availableVoices = voices.filter(voice => 
        voice.lang === utterance.lang || 
        voice.lang.startsWith(utterance.lang.split('-')[0])
      );

      // Try to find preferred voice, then any voice for the language
      const selectedVoice = voiceOptions.length > 0
        ? availableVoices.find(voice => voiceOptions.some(name => voice.name.includes(name))) ||
          availableVoices[0]
        : availableVoices[0];

      if (selectedVoice) {
        utterance.voice = selectedVoice;
      } else {
        // Try to pick a natural-sounding fallback voice
        const fallback = voices.find(voice =>
          voice.name.toLowerCase().includes('google') ||
          voice.name.toLowerCase().includes('apple') ||
          voice.name.toLowerCase().includes('samantha') ||
          voice.name.toLowerCase().includes('daniel')
        );
        if (fallback) utterance.voice = fallback;
      }

      // Speech parameters
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;

      // Event handlers
      utterance.onend = () => resolve();
      utterance.onerror = (e) => {
        console.error('SpeechSynthesis error:', e);
        resolve();
      };

      window.speechSynthesis.cancel();
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 100);
    };

    // Load voices if not already loaded
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = voicesLoaded;
    } else {
      voicesLoaded();
    }
  });
};