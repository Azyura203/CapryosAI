import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-gray-700/50 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Enhanced Logo Section */}
            <div className="group relative">
              {/* Glow effect */}
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500/20 to-cyan-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
              
              {/* Logo container */}
              <div className="relative p-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl border border-gray-600/30 group-hover:border-teal-400/50 transition-all duration-300">
                <img
                  src="https://www.ljmu.ac.uk/-/media/ljmu/logos/ljmulogotransparent2.gif?la=en&h=550&w=1549&hash=395EA1E00B1C6C7282F5573B4571BE25"
                  alt="Liverpool John Moores University Logo"
                  className="w-16 h-10 sm:w-20 sm:h-12 md:w-24 md:h-16 lg:w-32 lg:h-20 object-contain filter brightness-110 contrast-110 group-hover:scale-105 transition-transform duration-300"
                  title="Liverpool John Moores University Logo"
                />
              </div>
            </div>

            {/* Enhanced App Name Section */}
            <div className="flex flex-col">
              {/* Main Title */}
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold relative group">
                <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_200%]">
                  Uni Buddy
                </span>
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-teal-400 to-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </h1>

              {/* Subtitle */}
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs sm:text-sm text-gray-300 font-medium">
                  Your Personal University Assistant
                </p>
                <span className="hidden sm:inline text-gray-500">•</span>
                <p className="hidden sm:block text-xs sm:text-sm text-gray-400 font-medium">
                  Liverpool John Moores University
                </p>
              </div>
            </div>
          </div>

          {/* Language Selector Only */}
          <div className="flex items-center">
            <LanguageSelector />
          </div>
        </div>
      </div>
    </header>
  );
}