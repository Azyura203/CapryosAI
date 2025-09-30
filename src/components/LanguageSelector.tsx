import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';

const languages = [
  { code: 'my', name: 'မြန်မာ', flag: '🇲🇲' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
];

export function LanguageSelector() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-800/80 to-gray-700/80 backdrop-blur-sm border border-gray-600/30 hover:border-teal-400/50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400/50"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4 text-teal-400 group-hover:text-teal-300 transition-colors" />
        <span className="text-sm text-gray-300 group-hover:text-white transition-colors font-medium">
          {currentLang.flag} {currentLang.name}
        </span>
        <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-teal-400 transition-all duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 py-2 bg-gray-800/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50 z-50 animate-fade-in">
            {languages.map(({ code, name, flag }) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-all duration-200 ${
                  code === currentLang.code
                    ? 'bg-gradient-to-r from-teal-500/20 to-cyan-500/20 text-teal-400 border-l-2 border-teal-400'
                    : 'text-gray-300 hover:bg-gray-700/50 hover:text-teal-400'
                }`}
              >
                <span className="text-lg">{flag}</span>
                <span className="font-medium">{name}</span>
                {code === currentLang.code && (
                  <span className="ml-auto text-teal-400 text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}