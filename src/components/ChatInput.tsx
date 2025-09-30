/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Send, Mic, Brain, Zap } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend, disabled }) => {
  const [input, setInput] = useState('');
  const { t } = useTranslation();
  const { isListening, startListening } = useSpeechRecognition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSend(input.trim());
      setInput('');
    }
  };

  const handleVoiceInput = () => {
    const recognition = startListening();
    if (!recognition) return;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognition.start();
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative flex items-center gap-4 p-6 bg-gradient-to-r from-slate-700/60 via-purple-700/60 to-slate-700/60 backdrop-blur-sm rounded-2xl border border-purple-500/30 focus-within:border-purple-400/50 focus-within:bg-purple-600/70 transition-all duration-300 shadow-lg">
        {/* Enhanced Input Field */}
        <div className="flex-1 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Capryos AI anything..."
            className="w-full bg-transparent text-white placeholder-purple-300 focus:outline-none text-lg font-medium"
            disabled={disabled}
          />
          {!input && !disabled && (
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
              <Brain className="w-5 h-5 text-purple-400/60 animate-pulse" />
            </div>
          )}
        </div>

        {/* Enhanced Voice Input Button */}
        <button
          type="button"
          onClick={handleVoiceInput}
          disabled={disabled || isListening}
          className="group relative p-4 bg-gradient-to-r from-slate-600/60 to-purple-600/60 hover:from-slate-500/70 hover:to-purple-500/70 rounded-xl border border-purple-400/30 hover:border-purple-300/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          <Mic className={`w-5 h-5 text-purple-200 group-hover:text-purple-100 transition-colors ${isListening ? 'animate-pulse text-pink-400' : ''}`} />
          {isListening && (
            <div className="absolute inset-0 bg-pink-400/20 rounded-xl animate-pulse" />
          )}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 -z-10" />
        </button>

        {/* Enhanced Send Button */}
        <button
          type="submit"
          disabled={disabled || !input.trim()}
          className="group relative p-4 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95"
        >
          <Send className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          {!disabled && input.trim() && (
            <>
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-xl opacity-30 group-hover:opacity-50 transition-opacity -z-10 blur-sm" />
            </>
          )}
        </button>
      </div>

      {/* Enhanced Character Counter and Status */}
      <div className="flex items-center justify-between mt-4">
        {input.length > 0 && (
          <div className="text-sm text-gray-400 flex items-center gap-2">
            <Zap className="w-4 h-4" />
            <span>{input.length}/1000 characters</span>
          </div>
        )}
        {disabled && (
          <div className="text-sm text-purple-400 flex items-center gap-2 ml-auto">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span>Capryos AI is thinking...</span>
          </div>
        )}
      </div>
    </form>
  );
};