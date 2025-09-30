import React from 'react';
import { LanguageSelector } from './LanguageSelector';
import { useTranslation } from 'react-i18next';
import { Brain, Sparkles, Zap } from 'lucide-react';

export function Header() {
  const { t } = useTranslation();

  return (
    <header className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 backdrop-blur-md shadow-2xl border-b border-purple-500/20 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Enhanced Logo Section */}
            <div className="group relative">
              {/* Animated glow effect */}
              <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-xl animate-pulse" />
              
              {/* Logo container */}
              <div className="relative p-4 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-cyan-600/20 backdrop-blur-sm rounded-3xl border border-purple-400/30 group-hover:border-purple-300/50 transition-all duration-300 shadow-lg">
                <div className="flex items-center gap-3">
                  {/* Main logo icon */}
                  <div className="relative">
                    <Brain className="w-10 h-10 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
                    <div className="absolute -top-1 -right-1">
                      <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
                    </div>
                  </div>
                  
                  {/* Brand name */}
                  <div className="flex flex-col">
                    <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                      Capryos AI
                    </h1>
                    <div className="flex items-center gap-1">
                      <Zap className="w-3 h-3 text-purple-400" />
                      <span className="text-xs text-purple-300 font-medium">Intelligent Assistant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Tagline */}
            <div className="hidden md:flex flex-col">
              <p className="text-lg font-semibold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
                Your Educational Journey Reimagined
              </p>
              <p className="text-sm text-purple-200/80">
                Powered by Advanced AI Technology
              </p>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-4">
            <LanguageSelector />
            
            {/* Status indicator */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-green-500/20 rounded-full border border-green-400/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-green-300 font-medium">Online</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}